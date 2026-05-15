import { BarChart2 } from 'lucide-react';
import React from 'react'

const Footer = () => {
    return (
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px clamp(16px,5vw,80px)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ position: "relative", width: 22, height: 22 }}>
                        <div style={{ width: 22, height: 22, background: "#ea580c", borderRadius: 5, transform: "rotate(12deg)" }}></div>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <BarChart2 size={11} color="#fff" />
                        </div>
                    </div>
                    <span className="display" style={{ fontSize: 16, fontWeight: 700, color: "#f0ece4" }}>PollWave</span>
                </div>
                <div style={{ display: "flex", gap: 24 }}>
                    {["Privacy", "Terms", "Contact"].map(l => (
                        <a key={l} href="#" style={{ color: "#57534e", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => e.target.style.color = "#a8a29e"}
                            onMouseLeave={e => e.target.style.color = "#57534e"}>{l}</a>
                    ))}
                </div>
                <span style={{ color: "#3c3836", fontSize: 12 }}>© 2026 PollWave. All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer