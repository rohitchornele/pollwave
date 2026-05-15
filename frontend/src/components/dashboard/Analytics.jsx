// pages/dashboard/Analytics.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, Vote, BarChart2, Users, Clock,
  Download, ChevronDown, ArrowUpRight, ArrowDownRight,
  Calendar, Globe, Lock, Activity, Zap, Eye,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend,
} from "recharts";

/* ─── fonts injected once ─── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    .font-syne { font-family: 'Syne', sans-serif !important; }
    .font-dm   { font-family: 'DM Sans', sans-serif !important; }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .fade-up   { animation: fadeUp 0.5s ease both; }
    .fade-up-1 { animation: fadeUp 0.5s ease 0.05s both; }
    .fade-up-2 { animation: fadeUp 0.5s ease 0.12s both; }
    .fade-up-3 { animation: fadeUp 0.5s ease 0.20s both; }
    .fade-up-4 { animation: fadeUp 0.5s ease 0.28s both; }
    .fade-up-5 { animation: fadeUp 0.5s ease 0.36s both; }

    /* custom scrollbar */
    .thin-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
    .thin-scroll::-webkit-scrollbar-track { background: transparent; }
    .thin-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

    /* recharts tooltip */
    .recharts-tooltip-wrapper { outline: none !important; }
  `}</style>
);

/* ─── Mock data ─── */
const RANGE_DATA = {
  "7d": [
    { date: "May 9",  votes: 120, polls: 1 },
    { date: "May 10", votes: 245, polls: 2 },
    { date: "May 11", votes: 189, polls: 0 },
    { date: "May 12", votes: 310, polls: 1 },
    { date: "May 13", votes: 275, polls: 2 },
    { date: "May 14", votes: 420, polls: 1 },
    { date: "May 15", votes: 388, polls: 1 },
  ],
  "30d": Array.from({ length: 30 }, (_, i) => ({
    date: `Apr ${i + 15 > 30 ? "May " + (i - 15) : i + 15}`,
    votes: Math.floor(80 + Math.random() * 400),
    polls: Math.floor(Math.random() * 3),
  })),
  "90d": Array.from({ length: 12 }, (_, i) => ({
    date: `W${i + 1}`,
    votes: Math.floor(500 + Math.random() * 1500),
    polls: Math.floor(1 + Math.random() * 5),
  })),
};

const TOP_POLLS = [
  { id: "1", title: "NPS: Rate PollWave",            votes: 1284, rate: 72, status: "active",  delta: +18 },
  { id: "2", title: "Q3 Team Retrospective",          votes: 347,  rate: 68, status: "active",  delta: +5  },
  { id: "3", title: "Best feature for next sprint?",  votes: 212,  rate: 61, status: "active",  delta: +12 },
  { id: "4", title: "Preferred all-hands day",        votes: 89,   rate: 91, status: "closed",  delta: 0   },
  { id: "5", title: "TypeScript migration vote",      votes: 504,  rate: 58, status: "closed",  delta: 0   },
];

const DEVICE_DATA = [
  { name: "Mobile",  value: 54, color: "#f97316" },
  { name: "Desktop", value: 36, color: "#a78bfa" },
  { name: "Tablet",  value: 10, color: "#22c55e" },
];

const HOURLY_DATA = Array.from({ length: 24 }, (_, h) => ({
  hour: h,
  label: h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`,
  votes: Math.floor(
    h >= 9 && h <= 18
      ? 40 + Math.random() * 80
      : 5 + Math.random() * 20
  ),
}));

const OPTION_BREAKDOWN = [
  { option: "9–10 (Promoter)",  votes: 720, pct: 56, color: "#22c55e" },
  { option: "7–8 (Neutral)",    votes: 384, pct: 30, color: "#f59e0b" },
  { option: "0–6 (Detractor)",  votes: 180, pct: 14, color: "#ef4444" },
];

/* ─── Custom tooltip ─── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="font-dm"
      style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", fontSize: 12 }}>
      <p style={{ color: "#78716c", marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/* ─── Stat card ─── */
function StatCard({ icon: Icon, label, value, delta, deltaUp, color, delay }) {
  const [count, setCount] = useState(0);
  const numeric = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;

  useEffect(() => {
    let v = 0;
    const inc = numeric / 40;
    const t = setInterval(() => {
      v += inc;
      if (v >= numeric) { setCount(numeric); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 20);
    return () => clearInterval(t);
  }, [numeric]);

  const display = typeof value === "string" && value.includes("%")
    ? count + "%" : count.toLocaleString();

  return (
    <div
      className={`fade-up-${delay} relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f0f] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] cursor-default`}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full"
        style={{ background: `radial-gradient(circle, ${color}20 0%, transparent 70%)` }} />

      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px]"
          style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
          <Icon size={16} style={{ color }} />
        </div>
        {delta !== undefined && (
          <span className={`font-syne flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${deltaUp ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-red-500/20 bg-red-500/10 text-red-400"}`}>
            {deltaUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {delta}
          </span>
        )}
      </div>

      <div className="font-syne text-[30px] font-extrabold leading-none tracking-tight text-[#f0ece4]">
        {display}
      </div>
      <div className="font-dm mt-1.5 text-[13px] text-[#57534e]">{label}</div>
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader({ title, sub, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h3 className="font-syne text-[15px] font-700 text-[#f0ece4]">{title}</h3>
        {sub && <p className="font-dm mt-0.5 text-[12px] text-[#3c3836]">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* ─── Panel wrapper ─── */
function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-[#0f0f0f] ${className}`}>
      {children}
    </div>
  );
}

/* ─── Range selector ─── */
const RANGES = ["7d", "30d", "90d"];

function RangeSelector({ value, onChange }) {
  return (
    <div className="flex rounded-lg border border-white/[0.07] bg-white/[0.02] p-0.5">
      {RANGES.map(r => (
        <button key={r} onClick={() => onChange(r)}
          className={`font-syne rounded-md px-3 py-1.5 text-[11px] font-700 transition-all duration-200 ${value === r ? "bg-orange-600 text-white shadow" : "text-[#57534e] hover:text-[#a8a29e]"}`}>
          {r}
        </button>
      ))}
    </div>
  );
}

/* ─── Top poll row ─── */
function TopPollRow({ poll, rank, maxVotes }) {
  const navigate = useNavigate();
  const statusCfg = {
    active:  { text: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.2)"  },
    closed:  { text: "#78716c", bg: "rgba(87,83,78,0.15)",  border: "rgba(87,83,78,0.25)"  },
  };
  const s = statusCfg[poll.status];
  const barW = Math.round((poll.votes / maxVotes) * 100);

  return (
    <div
      onClick={() => navigate(`/dashboard/polls/${poll.id}`)}
      className="group grid cursor-pointer items-center gap-4 border-b border-white/[0.04] px-5 py-3.5 transition-colors duration-150 hover:bg-white/[0.025]"
      style={{ gridTemplateColumns: "28px 1fr 70px 70px 60px" }}
    >
      {/* rank */}
      <div className={`font-syne flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-800 ${rank === 1 ? "bg-orange-500/15 text-orange-400" : "bg-white/[0.04] text-[#3c3836]"}`}>
        {rank}
      </div>

      {/* title + bar */}
      <div className="min-w-0">
        <p className="font-syne truncate text-[13px] font-600 text-[#e8e4dc]">{poll.title}</p>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${barW}%`, background: rank === 1 ? "linear-gradient(90deg,#ea580c,#f97316)" : "rgba(255,255,255,0.12)" }} />
        </div>
      </div>

      {/* votes */}
      <div className="font-dm flex items-center gap-1.5 text-[13px] text-[#78716c]">
        <Vote size={11} className="text-orange-500 flex-shrink-0" />
        {poll.votes.toLocaleString()}
      </div>

      {/* response rate */}
      <div className="font-syne text-[13px] font-600 text-[#a8a29e]">{poll.rate}%</div>

      {/* status */}
      <div>
        <span className="font-syne inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-700 uppercase tracking-[0.06em]"
          style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
          <span className="h-1 w-1 rounded-full" style={{ background: s.text }} />
          {poll.status}
        </span>
      </div>
    </div>
  );
}

/* ─── Donut chart custom label ─── */
const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.08) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 11, fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* ─── Export button ─── */
function ExportBtn() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="font-syne flex items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] font-600 text-[#a8a29e] transition-all hover:border-white/[0.16] hover:text-[#f0ece4]">
        <Download size={13} /> Export <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-40 overflow-hidden rounded-xl border border-white/[0.09] bg-[#131313] shadow-2xl"
          style={{ animation: "fadeUp 0.15s ease both" }}>
          <div className="p-1.5">
            {["CSV", "PDF Report", "PNG Charts"].map(f => (
              <button key={f} className="font-dm w-full rounded-lg px-3 py-2 text-left text-[13px] text-[#78716c] transition-colors hover:bg-white/[0.05] hover:text-[#e8e4dc]">
                Export as {f}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN PAGE ─── */
const Analytics = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState("7d");
  const [selectedPoll, setSelectedPoll] = useState("all");

  const chartData = RANGE_DATA[range];
  const totalVotes = chartData.reduce((s, d) => s + d.votes, 0);
  const avgPerDay  = Math.round(totalVotes / chartData.length);
  const peakDay    = [...chartData].sort((a, b) => b.votes - a.votes)[0];
  const maxVotes   = Math.max(...TOP_POLLS.map(p => p.votes));

  return (
    <>
      <FontStyle />

      <div className="font-dm max-w-[1200px]">

        {/* ── Page header ── */}
        <div className="fade-up mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-syne mb-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-orange-500">Analytics</p>
            <h1 className="font-syne text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-[#f0ece4]">
              Performance Insights
            </h1>
            <p className="font-dm mt-1.5 text-[14px] text-[#57534e]">
              Track votes, engagement, and poll performance over time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RangeSelector value={range} onChange={setRange} />
            <ExportBtn />
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard icon={Vote}      label="Total Votes"      value="2,847"  delta="+284 this week"  deltaUp={true}  color="#f97316" delay={1} />
          <StatCard icon={BarChart2} label="Total Polls"      value={12}     delta="+3 this month"   deltaUp={true}  color="#a78bfa" delay={2} />
          <StatCard icon={Activity}  label="Avg. Response"    value="68%"    delta="+5% vs last period" deltaUp={true}  color="#22c55e" delay={3} />
          <StatCard icon={Clock}     label="Avg. Time to Vote" value="24s"   delta="-3s faster"      deltaUp={true}  color="#f59e0b" delay={4} />
        </div>

        {/* ── Votes over time + device split ── */}
        <div className="fade-up-2 mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Area chart — 2/3 width */}
          <Panel className="p-6 lg:col-span-2">
            <SectionHeader
              title="Votes Over Time"
              sub={`${totalVotes.toLocaleString()} total · ${avgPerDay.toLocaleString()} avg/day · Peak: ${peakDay.votes} on ${peakDay.date}`}
              action={
                <div className="flex items-center gap-2 text-[12px] text-[#3c3836]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-orange-500" /> Votes
                  </span>
                </div>
              }
            />
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="voteGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ea580c" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#3c3836", fontSize: 11, fontFamily: "'DM Sans'" }}
                  axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#3c3836", fontSize: 11, fontFamily: "'DM Sans'" }}
                  axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="votes" name="Votes"
                  stroke="#f97316" strokeWidth={2}
                  fill="url(#voteGrad)" dot={false} activeDot={{ r: 4, fill: "#f97316", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          {/* Device split donut — 1/3 */}
          <Panel className="p-6">
            <SectionHeader title="Device Split" sub="Where voters come from" />
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={DEVICE_DATA} cx="50%" cy="50%"
                    innerRadius={48} outerRadius={72}
                    paddingAngle={3} dataKey="value"
                    labelLine={false} label={renderCustomLabel}>
                    {DEVICE_DATA.map((d, i) => (
                      <Cell key={i} fill={d.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 flex flex-col gap-2 w-full">
                {DEVICE_DATA.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                      <span className="font-dm text-[13px] text-[#78716c]">{d.name}</span>
                    </div>
                    <span className="font-syne text-[13px] font-bold text-[#a8a29e]">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        {/* ── Top polls + Hourly heatmap ── */}
        <div className="fade-up-3 mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Top polls table — 2/3 */}
          <Panel className="overflow-hidden lg:col-span-2">
            <div className="border-b border-white/[0.05] px-5 py-4">
              <SectionHeader
                title="Top Performing Polls"
                sub="Ranked by total votes"
                action={
                  <button onClick={() => navigate("/dashboard/polls")}
                    className="font-dm flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[12px] text-[#57534e] transition-all hover:border-orange-500/30 hover:text-orange-400">
                    View all <ArrowUpRight size={11} />
                  </button>
                }
              />
              {/* table head */}
              <div className="grid gap-4 text-[9px] font-bold uppercase tracking-[0.12em] text-[#2c2927]"
                style={{ gridTemplateColumns: "28px 1fr 70px 70px 60px" }}>
                <span>#</span><span>Poll</span><span>Votes</span><span>Resp. Rate</span><span>Status</span>
              </div>
            </div>
            {TOP_POLLS.map((poll, i) => (
              <TopPollRow key={poll.id} poll={poll} rank={i + 1} maxVotes={maxVotes} />
            ))}
          </Panel>

          {/* Option breakdown — 1/3 */}
          <Panel className="p-6">
            <SectionHeader title="NPS Breakdown" sub="Rate PollWave · 1,284 votes" />
            <div className="flex flex-col gap-4">
              {OPTION_BREAKDOWN.map((opt, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-dm text-[12px] text-[#78716c] truncate max-w-[70%]">{opt.option}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-syne text-[13px] font-bold" style={{ color: opt.color }}>{opt.pct}%</span>
                      <span className="font-dm text-[11px] text-[#3c3836]">{opt.votes.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${opt.pct}%`, background: opt.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* NPS score */}
            <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/[0.07] p-4 text-center">
              <p className="font-dm mb-1 text-[11px] text-[#57534e]">Net Promoter Score</p>
              <p className="font-syne text-[38px] font-extrabold leading-none tracking-tight text-green-400">+42</p>
              <p className="font-dm mt-1 text-[11px] text-green-500/60">Excellent ↑ from +36</p>
            </div>
          </Panel>
        </div>

        {/* ── Hourly bar chart + polls created bar ── */}
        <div className="fade-up-4 mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Hourly vote distribution */}
          <Panel className="p-6">
            <SectionHeader title="Hourly Vote Distribution" sub="When your audience votes most" />
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={HOURLY_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="label"
                  tick={{ fill: "#3c3836", fontSize: 10, fontFamily: "'DM Sans'" }}
                  axisLine={false} tickLine={false}
                  interval={2} />
                <YAxis tick={{ fill: "#3c3836", fontSize: 10, fontFamily: "'DM Sans'" }}
                  axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="votes" name="Votes" radius={[4, 4, 0, 0]}>
                  {HOURLY_DATA.map((d, i) => (
                    <Cell key={i}
                      fill={d.votes > 80 ? "#f97316" : "rgba(255,255,255,0.08)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="font-dm mt-3 text-center text-[11px] text-[#3c3836]">
              Peak activity: <span className="text-orange-400">9am – 6pm</span> · Avg off-hours: 12 votes/hr
            </p>
          </Panel>

          {/* Polls created over time */}
          <Panel className="p-6">
            <SectionHeader title="Polls Created" sub={`${range} · ${chartData.reduce((s, d) => s + d.polls, 0)} total`} />
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date"
                  tick={{ fill: "#3c3836", fontSize: 10, fontFamily: "'DM Sans'" }}
                  axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#3c3836", fontSize: 10, fontFamily: "'DM Sans'" }}
                  axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="polls" name="Polls Created" fill="#a78bfa"
                  radius={[5, 5, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        {/* ── Engagement metrics row ── */}
        <div className="fade-up-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { icon: Eye,      label: "Poll Views",       value: "14,320", sub: "Unique visitors",   color: "#f97316" },
            { icon: Users,    label: "Unique Voters",    value: "2,391",  sub: "Across all polls",  color: "#22c55e" },
            { icon: Zap,      label: "Completion Rate",  value: "68%",    sub: "Voted after viewing", color: "#f59e0b" },
            { icon: Globe,    label: "Public Polls",     value: "9",      sub: "3 private",         color: "#a78bfa" },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <Panel key={label} className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] cursor-default">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[8px]"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon size={14} style={{ color }} />
              </div>
              <p className="font-syne text-[22px] font-extrabold leading-none tracking-tight text-[#f0ece4]">{value}</p>
              <p className="font-syne mt-1 text-[12px] font-600 text-[#a8a29e]">{label}</p>
              <p className="font-dm mt-0.5 text-[11px] text-[#3c3836]">{sub}</p>
            </Panel>
          ))}
        </div>

      </div>
    </>
  );
};

export default Analytics;