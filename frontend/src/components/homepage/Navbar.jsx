import { Link, NavLink, useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, ChevronDown, Globe } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const navLinkClass = ({ isActive }) =>
        `${isActive
            ? "bg-orange-500 text-white border-orange-500 transition px-4 py-1.5 rounded-full border"
            : "text-white/70"
        }`;

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } finally {
            localStorage.clear();
        }
    };

    return (
    
        <nav className="nav-blur" style={{ position: "sticky", top: 0, zIndex: 50, padding: "0 clamp(16px, 5vw, 80px)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
                {/* Logo */}
                <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <div style={{ position: "relative", width: 28, height: 28 }}>
                        <div style={{ width: 28, height: 28, background: "#ea580c", borderRadius: 6, transform: "rotate(12deg)" }}></div>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <BarChart2 size={14} color="#fff" />
                        </div>
                    </div>
                    <span className="display" style={{ fontSize: 20, fontWeight: 700, color: "#f0ece4", letterSpacing: "-0.02em" }}>PollWave</span>
                </a>

                {/* Nav links */}
                <ul className="nav-menu" style={{ display: "flex", alignItems: "center", gap: 32, listStyle: "none" }}>
                    <li><a href="#" className="nav-link active">Home</a></li>
                    <li><a href="#features" className="nav-link">Features</a></li>
                    <li><a href="#pricing" className="nav-link">Pricing</a></li>
                </ul>

                {/* Auth */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <a href="/login" style={{ color: "#f97316", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "opacity 0.2s" }}
                        onMouseEnter={e => e.target.style.opacity = 0.75}
                        onMouseLeave={e => e.target.style.opacity = 1}>
                        Sign in
                    </a>
                    <button className="orange-btn" style={{ padding: "9px 20px", fontSize: 14 }}>
                        Get Started Free <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </nav>
    );

}