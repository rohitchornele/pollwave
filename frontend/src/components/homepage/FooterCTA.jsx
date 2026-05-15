import { ArrowRight, Lock } from 'lucide-react';
import React from 'react'

const FooterCTA = () => {
  return (
    <section style={{ padding:"80px clamp(16px,5vw,80px)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
          <span className="pill-badge"><Lock size={12} /> No credit card required</span>
        </div>
        <h2 className="section-title" style={{ marginBottom:20 }}>Start polling in<br/><span style={{color:"#f97316"}}>under 60 seconds.</span></h2>
        <p style={{ color:"#57534e", fontSize:16, marginBottom:36, lineHeight:1.7 }}>
          Join thousands of teams who use PollWave to make smarter, faster decisions.
        </p>
        <button className="orange-btn" style={{ fontSize:16, padding:"16px 36px" }}>
          Create a Free Poll <ArrowRight size={17}/>
        </button>
      </div>
    </section>
  );
}

export default FooterCTA