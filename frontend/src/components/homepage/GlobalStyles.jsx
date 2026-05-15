import React from 'react'

const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
 
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
    body {
      background: #0a0a0a;
      color: #e8e4dc;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }
 
    .display { font-family: 'Syne', sans-serif; }
 
    /* grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
    }
 
    /* radial glow behind hero */
    .hero-glow {
      position: absolute;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 700px;
      background: radial-gradient(ellipse at center, rgba(234,88,12,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
 
    /* subtle grid lines */
    .grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }
 
    .nav-blur {
      background: rgba(10,10,10,0.75);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
 
    .pill-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(234,88,12,0.1);
      border: 1px solid rgba(234,88,12,0.25);
      color: #fb923c;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
 
    .hero-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: #f0ece4;
    }
 
    .hero-title .accent { color: #f97316; }
    .hero-title .italic { font-style: italic; font-weight: 700; color: #a8a29e; }
 
    .orange-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #ea580c;
      color: #fff;
      padding: 14px 28px;
      border-radius: 100px;
      font-weight: 600;
      font-size: 15px;
      border: none;
      cursor: pointer;
      transition: transform 0.3s ease, background 0.3s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .orange-btn:hover { transform: scale(1.05); background: #c2410c; }
 
    .ghost-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: #a8a29e;
      padding: 14px 24px;
      border-radius: 100px;
      font-weight: 500;
      font-size: 15px;
      border: 1px solid rgba(255,255,255,0.12);
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .ghost-btn:hover { color: #f0ece4; border-color: rgba(255,255,255,0.25); }
 
    .divider-glow {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(234,88,12,0.5), transparent);
    }
 
    .stat-number {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      color: #f0ece4;
    }
 
    .stat-label { color: #78716c; font-size: 15px; margin-top: 4px; }
 
    .stat-divider {
      width: 1px;
      height: 60px;
      background: linear-gradient(180deg, transparent, rgba(234,88,12,0.4), transparent);
    }
 
    /* features */
    .feature-tab {
      padding: 18px 22px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    .feature-tab.inactive {
      border-color: rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
    }
    .feature-tab.inactive:hover {
      border-color: rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
    }
    .feature-tab.active {
      border-color: rgba(234,88,12,0.4);
      background: rgba(234,88,12,0.08);
    }
    .feature-tab h3 {
      font-family: 'Syne', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #e8e4dc;
    }
    .feature-tab.inactive h3 { color: #78716c; }
    .feature-tab p { font-size: 13px; color: #a8a29e; margin-top: 6px; line-height: 1.6; }
 
    .preview-panel {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 28px;
      min-height: 340px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
 
    /* poll preview bars */
    .poll-bar-wrap { display: flex; flex-direction: column; gap: 10px; }
    .poll-option {
      position: relative;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      font-size: 14px;
      color: #e8e4dc;
      overflow: hidden;
    }
    .poll-option .fill {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      border-radius: 8px;
      transition: width 1s ease;
    }
    .poll-option .fill.orange { background: rgba(234,88,12,0.18); }
    .poll-option .fill.muted { background: rgba(255,255,255,0.04); }
    .poll-option .label { position: relative; display: flex; justify-content: space-between; }
    .poll-option .pct { color: #f97316; font-weight: 600; font-size: 13px; }
 
    /* pricing */
    .pricing-card {
      background: #111;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 0;
      transition: border-color 0.3s, transform 0.3s;
      position: relative;
    }
    .pricing-card:hover { border-color: rgba(255,255,255,0.15); }
    .pricing-card.popular {
      border-color: rgba(234,88,12,0.5);
      transform: scale(1.04);
    }
    .pricing-card.popular:hover { border-color: rgba(234,88,12,0.8); }
 
    .popular-badge {
      position: absolute;
      top: -13px;
      left: 50%;
      transform: translateX(-50%);
      background: #ea580c;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 14px;
      border-radius: 100px;
      white-space: nowrap;
      font-family: 'Syne', sans-serif;
    }
 
    .plan-name {
      font-family: 'Syne', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #f0ece4;
      margin-bottom: 6px;
    }
    .plan-desc { font-size: 13px; color: #57534e; line-height: 1.5; margin-bottom: 24px; }
 
    .price-amount {
      font-family: 'Syne', sans-serif;
      font-size: 44px;
      font-weight: 800;
      color: #f0ece4;
    }
    .price-billing { font-size: 13px; color: #57534e; margin-left: 6px; }
 
    .feature-list { list-style: none; margin-top: 28px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
    .feature-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #a8a29e; }
    .feature-list li .check { color: #f97316; flex-shrink: 0; }
 
    .plan-cta-primary {
      margin-top: 28px;
      width: 100%;
      padding: 12px;
      border-radius: 100px;
      background: #ea580c;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .plan-cta-primary:hover { background: #c2410c; transform: scale(1.03); }
 
    .plan-cta-secondary {
      margin-top: 28px;
      width: 100%;
      padding: 12px;
      border-radius: 100px;
      background: transparent;
      color: #a8a29e;
      font-weight: 500;
      font-size: 14px;
      border: 1px solid rgba(255,255,255,0.12);
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'DM Sans', sans-serif;
    }
    .plan-cta-secondary:hover { border-color: rgba(234,88,12,0.4); color: #f97316; transform: scale(1.03); }
 
    /* nav link */
    .nav-link {
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-link:hover { color: #fff; }
    .nav-link.active {
      background: #ea580c;
      color: #fff;
      padding: 6px 16px;
      border-radius: 100px;
    }
 
    /* section title */
    .section-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 800;
      color: #f0ece4;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }
 
    /* thin tag */
    .section-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #f97316;
      margin-bottom: 16px;
    }
 
    /* glow dot decoration */
    .glow-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #f97316;
      box-shadow: 0 0 12px 3px rgba(249,115,22,0.5);
      display: inline-block;
      margin-right: 10px;
      flex-shrink: 0;
    }
 
    /* social proof avatars */
    .avatar-stack { display: flex; }
    .avatar {
      width: 32px; height: 32px;
      border-radius: 50%;
      border: 2px solid #0a0a0a;
      margin-left: -10px;
      font-size: 11px;
      font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif;
    }
    .avatar:first-child { margin-left: 0; }
 
    /* scroll fade-in */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.7s ease forwards; }
    .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
    .fade-up-2 { animation-delay: 0.2s; opacity: 0; }
    .fade-up-3 { animation-delay: 0.35s; opacity: 0; }
    .fade-up-4 { animation-delay: 0.5s; opacity: 0; }
 
    /* floating poll card decoration */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .floating { animation: float 4s ease-in-out infinite; }
 
    /* responsive */
    @media (max-width: 768px) {
      .nav-menu { display: none; }
      .stats-row { flex-wrap: wrap; gap: 32px; }
      .stats-row .stat-divider { display: none; }
      .features-grid { grid-template-columns: 1fr; }
      .pricing-grid { grid-template-columns: 1fr; }
      .pricing-card.popular { transform: none; }
    }
  `}</style>
);

export default GlobalStyles