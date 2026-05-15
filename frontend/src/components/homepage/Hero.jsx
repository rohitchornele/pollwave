// import { ArrowBigRight, ArrowRight, Star } from 'lucide-react'
// import React from 'react'

// const Hero = () => {
//   return (
//     <>
//     <div className="min-h-screen w-full p-8 flex flex-col justify-center items-center dark:text-white gap-14 pt-10">
//         <div className="flex justify-center items-center gap-3 bg-gray-100 text-orange-600 w-fit px-3 py-1 rounded-4xl text-sm mt-4">
//             <Star width={16} /> Explore the World
//         </div>
//         <h1 className="hero-text text-7xl leading-22">Plan Your <span className='cursive-heading text-orange-500'>Summer Vacation </span> <br /> with your <span className='cursive-heading '>Buddies!</span></h1>
//         <p className="description">Get your dream trip with expert-guided destinantions, booking, transports & more... All in one place</p>
//         <div className="cta text-center">
//             <button className='bg-orange-500 text-white px-8 py-4 rounded-4xl flex justify-self-center items-center justify-center font-semibold hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer text-lg'>Start Planning, It's Free <ArrowRight /> </button>
//         </div>
//         <div className="w-full h-px bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-80 mt-10"></div>
//         <div className="stats-card flex justify-center gap-20">
//           <div className="">
//             <h3 className='text-5xl text-gray-200 font-semibold mb-2'>5+</h3>
//             <p className='text-xl text-gray-400'>Years of Trust</p>
//           </div>
//           <div className="w-px h-28 bg-linear-to-b from-transparent via-orange-500 to-transparent opacity-80"></div>
//           <div className="">
//             <h3 className='text-5xl text-gray-200 font-semibold mb-2'>100K+</h3>
//             <p  className='text-xl text-gray-400'>Trips Planned</p>
//           </div>
//           <div className="w-px h-28 bg-linear-to-b from-transparent via-orange-500 to-transparent opacity-80"></div>

//           <div className="">
//             <h3 className='text-5xl text-gray-200 font-semibold mb-2'>8K+</h3>
//             <p  className='text-xl text-gray-400'>Registered Trip Planners</p>
//           </div>
//           <div className="w-px h-28 bg-linear-to-b from-transparent via-orange-500 to-transparent opacity-80"></div>

//           <div className="">
//             <h3 className='text-5xl text-gray-200 font-semibold mb-2'>30K+</h3>
//             <p  className='text-xl text-gray-400'>Team Members</p>
//           </div>
//         </div>
//         <div className="w-full h-px bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-80"></div>
//     </div>
//     </>
//   )
// }

// export default Hero





import { ArrowRight, CheckCircle2, ChevronRight, Star } from "lucide-react";

const Hero = () => {
    // return (
    //     <section className="min-h-screen bg-[#0A0A0B] text-white px-6">

    //         <div className="max-w-7xl mx-auto pt-28 pb-20 text-center">

    //             {/* Badge */}
    //             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#25272D] bg-[#121317] text-gray-300 text-sm mb-8">
    //                 <CheckCircle2 size={16} className="text-amber-500" />
    //                 Trusted by communities & creators
    //             </div>

    //             {/* Heading */}
    //             <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight max-w-5xl mx-auto">

    //                 Create polls,
    //                 gather opinions,
    //                 and make decisions
    //                 <span className="text-amber-500"> together.</span>

    //             </h1>

    //             {/* Description */}
    //             <p className="max-w-2xl mx-auto mt-8 text-lg text-gray-400 leading-8">
    //                 Launch live polls, collect votes instantly, and collaborate
    //                 with your audience in real time — all from one modern platform.
    //             </p>

    //             {/* CTA */}
    //             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

    //                 <button className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-4 rounded-2xl font-semibold flex items-center gap-2 transition">
    //                     Create Poll
    //                     <ArrowRight size={18} />
    //                 </button>

    //                 <button className="border border-[#2A2C31] bg-[#141518] hover:bg-[#1B1D22] px-7 py-4 rounded-2xl text-gray-300 transition">
    //                     Explore Demo
    //                 </button>

    //             </div>

    //             {/* Stats */}
    //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">

    //                 {[
    //                     ["120K+", "Votes Collected"],
    //                     ["8K+", "Active Communities"],
    //                     ["24K+", "Polls Created"],
    //                     ["99.9%", "Realtime Delivery"]
    //                 ].map(([number, label]) => (
    //                     <div
    //                         key={label}
    //                         className="bg-[#121317] border border-[#1E2025] rounded-3xl p-8"
    //                     >
    //                         <h3 className="text-4xl font-bold text-white">
    //                             {number}
    //                         </h3>

    //                         <p className="text-gray-400 mt-2">
    //                             {label}
    //                         </p>
    //                     </div>
    //                 ))}

    //             </div>

    //         </div>
    //     </section>
    // );

    return (
    <section style={{ position: "relative", overflow: "hidden", padding: "80px clamp(16px,5vw,80px) 60px" }}>
      <div className="hero-glow"></div>
      <div className="grid-bg"></div>
 
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }} className="fade-up fade-up-1">
          <span className="pill-badge">
            <Star size={13} /> Trusted by 100K+ teams worldwide
          </span>
        </div>
 
        {/* Title */}
        <h1 className="hero-title" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto 24px" }}>
          <span className="fade-up fade-up-1" style={{ display: "block" }}>
            Build polls that
          </span>
          <span className="fade-up fade-up-2" style={{ display: "block" }}>
            <span className="accent">drive decisions,</span>
          </span>
          <span className="fade-up fade-up-3 italic" style={{ display: "block" }}>
            not just opinions.
          </span>
        </h1>
 
        {/* Description */}
        <p className="fade-up fade-up-3" style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 40px", color: "#78716c", fontSize: 17, lineHeight: 1.7 }}>
          Create, share, and analyze polls in seconds. Real-time results, beautiful analytics, team collaboration — all in one place.
        </p>
 
        {/* CTAs */}
        <div className="fade-up fade-up-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="orange-btn">
            Create Your First Poll <ArrowRight size={16} />
          </button>
          <button className="ghost-btn">
            View Live Demo <ChevronRight size={16} />
          </button>
        </div>
 
        {/* Social proof */}
        <div className="fade-up fade-up-4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 28 }}>
          <div className="avatar-stack">
            {[["#ea580c","MK"],["#854d0e","AL"],["#78716c","PR"],["#57534e","JS"]].map(([bg,init],i)=>(
              <div key={i} className="avatar" style={{ background: bg, color: "#fff" }}>{init}</div>
            ))}
          </div>
          <span style={{ color: "#78716c", fontSize: 13 }}>
            <span style={{ color: "#f97316", fontWeight: 600 }}>2,400+</span> polls created this week
          </span>
        </div>
 
        {/* Divider */}
        <div className="divider-glow" style={{ marginTop: 64 }}></div>
 
        {/* Stats */}
        <div className="stats-row" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 48, paddingTop: 48 }}>
          {[["50M+","Votes Cast"],["100K+","Polls Created"],["8K+","Teams Using PollWave"],["30K+","Questions Answered"]].map(([num,lbl],i,arr)=>(
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 48 }}>
              <div style={{ textAlign: "center" }}>
                <div className="stat-number">{num}</div>
                <div className="stat-label">{lbl}</div>
              </div>
              {i < arr.length - 1 && <div className="stat-divider"></div>}
            </div>
          ))}
        </div>
 
        <div className="divider-glow" style={{ marginTop: 48 }}></div>
      </div>
    </section>
  );
};

export default Hero;