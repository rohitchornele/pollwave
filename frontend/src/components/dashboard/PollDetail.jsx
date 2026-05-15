import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Share2, Edit3, MoreHorizontal, Globe,
  Calendar, Eye, Zap, Users, CheckCircle, Trash2,
  Activity
} from "lucide-react";
import QuickAction from "../../components/dashboard/QuickAction";
import pollService from "../../services/pollService";
import "../../components/dashboard/dashboard.css";

const PollDetail = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Results");

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);
        const res = await pollService.getPollById(pollId);
        setPoll(res?.data || res);
      } catch (err) {
        console.error("Error fetching poll:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [pollId]);

  const calculatePct = (votes) => {
    if (!poll || poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  if (loading) return <div className="overview-page" style={{ color: "#fff", padding: 40 }}>Loading poll data...</div>;
  if (!poll) return <div className="overview-page" style={{ color: "#fff", padding: 40 }}>Poll not found.</div>;

  return (
    <div className="overview-page w-full animate-in fade-in duration-500">

      {/* ─── HEADER AREA (Matches DashboardHome Greeting style) ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <button
            onClick={() => navigate("/dashboard/polls")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all mb-4"
          >
            <ArrowLeft size={14} /> Back to Polls
          </button>
          <h1 style={{ color: "#f0ece4", fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 800, letterSpacing: "0.02em", lineHeight: 2 }}>
            {poll.title}
          </h1>
          <p style={{ color: "#78716c", marginTop: 8, fontSize: 15, maxWidth: "600px", marginLeft: -20, marginBottom: "20px" }}>
            {poll.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button style={{padding: 10, marginLeft: "auto", marginRight:"auto"}} className="flex items-center gap-2 bg-[#ea580c] text-white rounded-xl text-xs font-bold hover:bg-[#c2410c] transition-all cursor-pointer">
            <Share2 size={14} /> Share
          </button>
          <button
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0ece4", padding: 10, marginLeft: "auto", marginRight:"auto" }} className="p-2.5 rounded-xl hover:bg-[#c2410c] transition-all  cursor-pointer"
          >
            <Edit3 size={18} />
          </button>
        </div>
      </div>

      {/* ─── CONTENT GRID ─── */}
      <div className="content-grid">

        {/* LEFT SIDE: Results & Detailed Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Metadata Row */}
          <div className="panel" style={{ padding: "12px 20px", display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <Calendar size={14} /> {new Date(poll.createdAt).toLocaleDateString()}
            </div>
            {/* <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <Eye size={14} /> {poll.views || 0} Views
            </div> */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
              <Activity size={14} /> Active
            </div>
          </div>

          {/* Results Panel */}
          <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 30 }}>
              {["Results"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-[11px] font-black uppercase tracking-widest transition-all pb-1"
                  style={{
                    color: activeTab === tab ? "#ea580c" : "#57534e",
                    borderBottom: activeTab === tab ? "2px solid #ea580c" : "2px solid transparent"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-24 flex flex-col gap-4 w-full"
              style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {poll?.options.map((opt, i) => (
                <div
                  style={{ padding: 10 }}
                  key={opt._id}
                  className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl flex justify-center items-center group hover:border-orange-500/30 transition-all"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div style={{ background: i === 0 ? "#ea580c" : "#262626" }} className="w-7 h-7 flex items-center justify-center rounded-lg text-[10px] font-black text-white">
                      {i + 1}
                    </div>
                    <div>
                      <p style={{ color: "#f0ece4", fontWeight: 700 }}>{opt.text}</p>
                    </div>
                  </div>
                  <div className="">
                    <div style={{ color: "#fff", fontSize: 24, fontWeight: 900 }}>{(calculatePct(opt.votesCount))}%</div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Sidebar Stats & Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Quick Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="panel" style={{ padding: 20, textAlign: "center" }}>
              <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Total Votes</p>
              <p style={{ color: "#fff", fontSize: 28, fontWeight: 900 }}>{poll.totalVotes}</p>
            </div>
            <div className="panel" style={{ padding: 20, textAlign: "center", border: "1px solid rgba(234,88,12,0.2)" }}>
              <p className="text-[9px] font-black text-orange-500/50 uppercase mb-1">Engagement</p>
              <p style={{ color: "#ea580c", fontSize: 28, fontWeight: 900 }}>
                {poll.views > 0 ? Math.round((poll.totalVotes / poll.views) * 100) : 0}%
              </p>
            </div>
          </div>

          <div className="section-title">Actions</div>
          <div style={{ display: "grid", gap: 10 }}>
            <QuickAction
              icon={Edit3}
              label="Modify Poll"
              desc="Change title or options"
              color="#a78bfa"
              onClick={() => { }}
            />
            <QuickAction
              icon={Trash2}
              label="Delete Poll"
              desc="Remove this poll forever"
              color="#ef4444"
              onClick={() => { }}
            />
          </div>

          <div className="section-title">Configuration</div>
          <div className="panel" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#57534e] uppercase">Visibility</span>
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-2"><Globe size={12} /> Public</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#57534e] uppercase">Type</span>
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-2"><CheckCircle size={12} /> Single</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#57534e] uppercase">Anonymous</span>
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-2"><Users size={12} /> No</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PollDetail;