// // import React, { useState } from 'react'

// // const Features = () => {
// //   const [active, setActive] = useState(1);

// //   const features = [
// //     {
// //       id: 1,
// //       title: "Keep everything in one place",
// //       description:
// //         "Organize trip plans, destinations, bookings, and notes in a single workspace.",
// //       image: "/images/trip-dashboard.png"
// //     },
// //     {
// //       id: 2,
// //       title: "Supercharge group travel planning",
// //       description:
// //         "Plan the perfect group trip with friends and family. Create collaborative itineraries and make decisions together.",
// //       image: "/images/group-planning.png"
// //     },
// //     {
// //       id: 3,
// //       title: "Share your adventures with friends & family",
// //       description:
// //         "Share your travel experiences, itineraries, and memories with people who matter.",
// //       image: "/images/share-trip.png"
// //     },
// //     {
// //       id: 4,
// //       title: "Discover expert travel tips and itineraries",
// //       description:
// //         "Explore curated travel guides and expert itineraries from experienced travelers.",
// //       image: "/images/travel-guides.png"
// //     }
// //   ];

// //   const activeFeature = features.find(f => f.id === active);

// //   return (
// //     <section className="max-w-6xl mx-auto py-24 px-6">
// //       <h2 className='text-6xl text-white mb-28 font-semibold'>Our Features</h2>
// //       <div className="grid md:grid-cols-2 gap-16 items-center">

// //         {/* LEFT FEATURES */}
// //         <div className="space-y-4">

// //           {features.map(feature => (
// //             <div
// //               key={feature.id}
// //               onClick={() => setActive(feature.id)}
// //               className={`cursor-pointer rounded-xl p-6 transition
// //               ${
// //                 active === feature.id
// //                   ? "bg-orange-500 text-white"
// //                   : "bg-gray-100 hover:bg-gray-200"
// //               }`}
// //             >
// //               <h3 className="text-lg font-semibold">
// //                 {feature.title}
// //               </h3>

// //               {active === feature.id && (
// //                 <p className="mt-2 text-sm opacity-90">
// //                   {feature.description}
// //                 </p>
// //               )}
// //             </div>
// //           ))}

// //         </div>

// //         {/* RIGHT PREVIEW */}
// //         <div className="relative">
// //           <img
// //             src={activeFeature.image}
// //             alt={activeFeature.title}
// //             className="rounded-xl shadow-lg"
// //           />
// //         </div>

// //       </div>
// //     </section>
// //   )
// // }

// // export default Features




// import React, { useState } from "react";

// const Features = () => {

//     const [active, setActive] = useState(1);

//     const features = [
//         {
//             id: 1,
//             title: "Live Voting",
//             description:
//                 "Collect votes in real-time with instant updates and audience engagement.",
//             image: "/images/live-voting.png"
//         },
//         {
//             id: 2,
//             title: "Collaborative Polls",
//             description:
//                 "Allow teams and communities to manage and moderate polls together.",
//             image: "/images/collaboration.png"
//         },
//         {
//             id: 3,
//             title: "Advanced Analytics",
//             description:
//                 "Track responses, engagement, trends, and voter activity with powerful insights.",
//             image: "/images/analytics.png"
//         },
//         {
//             id: 4,
//             title: "Public & Private Sharing",
//             description:
//                 "Share polls publicly or restrict them to selected participants only.",
//             image: "/images/sharing.png"
//         }
//     ];

//     const activeFeature = features.find(f => f.id === active);

//     return (
//         <section className="bg-[#0A0A0B] py-28 px-6">

//             <div className="max-w-7xl mx-auto">

//                 <h2 className="text-5xl font-bold text-white mb-20">
//                     Powerful polling tools
//                 </h2>

//                 <div className="grid lg:grid-cols-2 gap-14 items-center">

//                     {/* Left */}
//                     <div className="space-y-5">

//                         {features.map((feature) => (

//                             <div
//                                 key={feature.id}
//                                 onClick={() => setActive(feature.id)}
//                                 className={`cursor-pointer rounded-3xl border p-7 transition-all duration-300
//                                 ${
//                                     active === feature.id
//                                         ? "bg-[#17181C] border-amber-500"
//                                         : "bg-[#111214] border-[#202228] hover:border-[#32343A]"
//                                 }`}
//                             >

//                                 <h3 className="text-2xl font-semibold text-white">
//                                     {feature.title}
//                                 </h3>

//                                 <p className="text-gray-400 mt-3 leading-7">
//                                     {feature.description}
//                                 </p>

//                             </div>

//                         ))}

//                     </div>

//                     {/* Right */}
//                     <div className="bg-[#111214] border border-[#1F2127] rounded-3xl p-5">

//                         <img
//                             src={activeFeature.image}
//                             alt={activeFeature.title}
//                             className="rounded-2xl w-full"
//                         />

//                     </div>

//                 </div>

//             </div>

//         </section>
//     );
// };

// export default Features;



import React from 'react'
import PollPreview from './PollPreview';
import { useState } from 'react';
import { BarChart2, Share2, TrendingUp, Users } from 'lucide-react';

const Features = () => {
  const [active, setActive] = useState(1);
  const features = [
    { id: 1, icon: <BarChart2 size={18} />, title: "All your polls in one workspace", desc: "Organize polls, results, and insights in a single clean dashboard. No more scattered spreadsheets." },
    { id: 2, icon: <Users size={18} />, title: "Collaborative group polling", desc: "Invite your team, set permissions, and make decisions together with real-time synchronized results." },
    { id: 3, icon: <Share2 size={18} />, title: "Instant sharing, anywhere", desc: "Share via link, QR code, or embed. Your audience can vote from any device with zero friction." },
    { id: 4, icon: <TrendingUp size={18} />, title: "Deep analytics & insights", desc: "Understand how people vote with demographic breakdowns, time-series data, and export-ready reports." },
  ];

  return (
    <section id="features" style={{ padding: "100px clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div className="section-tag">Features</div>
          <h2 className="section-title">Everything you need<br />to <span style={{ color: "#f97316" }}>run great polls.</span></h2>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          {/* Left tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {features.map(f => (
              <div key={f.id} className={`feature-tab ${active === f.id ? "active" : "inactive"}`} onClick={() => setActive(f.id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: active === f.id ? "#f97316" : "#57534e" }}>{f.icon}</span>
                  <h3>{f.title}</h3>
                </div>
                {active === f.id && <p>{f.desc}</p>}
              </div>
            ))}
          </div>
          {/* Right preview */}
          <div className="floating">
            <PollPreview type={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features


