import React from 'react'

const PollPreview = ({ type }) => {
    const previews = {
        1: (
            <div className="preview-panel">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span className="display" style={{ fontWeight: 700, fontSize: 14, color: "#f0ece4" }}>Q3 Team Retrospective</span>
                    <span style={{ background: "rgba(234,88,12,0.15)", color: "#fb923c", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100 }}>LIVE</span>
                </div>
                <p style={{ fontSize: 13, color: "#78716c", marginBottom: 16 }}>What should we prioritize next sprint?</p>
                <div className="poll-bar-wrap">
                    {[["Performance improvements", "64%", true], ["New dashboard UI", "48%", false], ["API documentation", "31%", false], ["Mobile app", "22%", false]].map(([label, pct, lead]) => (
                        <div key={label} className="poll-option">
                            <div className={`fill ${lead ? "orange" : "muted"}`} style={{ width: pct }}></div>
                            <div className="label">
                                <span>{label}</span>
                                <span className="pct">{pct}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: "#57534e", display: "flex", gap: 16 }}>
                    <span>🗳 347 votes</span><span>⏱ Closes in 2d 4h</span>
                </div>
            </div>
        ),
        2: (
            <div className="preview-panel">
                <span className="display" style={{ fontWeight: 700, fontSize: 14, color: "#f0ece4", marginBottom: 12, display: "block" }}>Group Vote — Trip Planning</span>
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                    {["Alex", "Maria", "Priya", "Jordan", "Sam"].map(n => (
                        <span key={n} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "4px 12px", fontSize: 12, color: "#a8a29e" }}>{n}</span>
                    ))}
                </div>
                <p style={{ fontSize: 13, color: "#78716c", marginBottom: 14 }}>Where should we go in August?</p>
                <div className="poll-bar-wrap">
                    {[["Bali", "80%", true], ["Tokyo", "60%", false], ["Barcelona", "40%", false]].map(([l, p, a]) => (
                        <div key={l} className="poll-option">
                            <div className={`fill ${a ? "orange" : "muted"}`} style={{ width: p }}></div>
                            <div className="label"><span>{l}</span><span className="pct">{p}</span></div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        3: (
            <div className="preview-panel">
                <span className="display" style={{ fontWeight: 700, fontSize: 14, color: "#f0ece4", marginBottom: 16, display: "block" }}>Share Your Poll</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[["🔗 Public link", "anyone with the link can vote"], ["📧 Email invite", "send directly to teammates"], ["📱 QR code", "scan to vote instantly"], ["🔒 Private link", "restricted access only"]].map(([icon, desc]) => (
                        <div key={icon} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 16px", cursor: "pointer", transition: "border-color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(234,88,12,0.3)"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                        >
                            <span style={{ fontSize: 18 }}>{icon.split(" ")[0]}</span>
                            <div>
                                <div style={{ fontSize: 13, color: "#e8e4dc", fontWeight: 500 }}>{icon.slice(2)}</div>
                                <div style={{ fontSize: 12, color: "#57534e" }}>{desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        4: (
            <div className="preview-panel">
                <span className="display" style={{ fontWeight: 700, fontSize: 14, color: "#f0ece4", marginBottom: 16, display: "block" }}>Analytics Dashboard</span>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    {[["1,247", "Total Votes"], ["68%", "Completion Rate"], ["3.2m", "Avg. Time"]].map(([v, l]) => (
                        <div key={l} style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                            <div className="display" style={{ fontSize: 22, fontWeight: 700, color: "#f97316" }}>{v}</div>
                            <div style={{ fontSize: 11, color: "#57534e", marginTop: 2 }}>{l}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80, padding: "0 4px" }}>
                    {[30, 45, 38, 60, 80, 55, 90, 72, 85, 100, 68, 95].map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 10 ? "rgba(234,88,12,0.6)" : "rgba(255,255,255,0.07)", borderRadius: "4px 4px 0 0", transition: "height 0.5s" }}></div>
                    ))}
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginTop: 2 }}></div>
            </div>
        )
    };
    return previews[type] || previews[1];
}

export default PollPreview