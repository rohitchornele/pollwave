// // import React from 'react'

// // const PricingCard = ({
// //     plan,
// //     description,
// //     amount,
// //     billing,
// //     features,
// //     cta,
// //     popular
// // }) => {
// //     return (
// //         <>
// //             <div
// //                 className={`relative flex flex-col justify-between rounded-2xl border p-8 shadow-sm transition hover:shadow-lg
// //       ${popular ? "border-orange-500 scale-105" : "border-gray-700"} bg-[#111111]`}
// //             >
// //                 {/* Popular Badge */}
// //                 {popular && (
// //                     <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
// //                         Most Popular
// //                     </span>
// //                 )}

// //                 {/* Plan Info */}
// //                 <div>
// //                     <h3 className="text-3xl text-gray-200 font-semibold">{plan}</h3>

// //                     <p className="text-gray-400 mt-2 text-sm">
// //                         {description}
// //                     </p>

// //                     {/* Price */}
// //                     <div className="mt-6">
// //                         <span className="text-5xl font-bold text-gray-300">₹{amount}</span>
// //                         <span className="text-gray-300 ml-1 text-sm">
// //                             / {billing}
// //                         </span>
// //                     </div>

// //                     {/* Features */}
// //                     <ul className="mt-6 space-y-3">
// //                         {features.map((feature, index) => (
// //                             <li
// //                                 key={index}
// //                                 className="flex items-center gap-2 text-gray-400"
// //                             >
// //                                 <span className="text-orange-500">✔</span>
// //                                 {feature}
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>

// //                 {/* Button */}
// //                 <button
// //                     className={`mt-8 w-full py-2 rounded-lg font-medium hover:scale-110 transition-all ease-in-out duration-500
// //         ${popular
// //                             ? "bg-orange-500 text-white hover:text-black "
// //                             : "border border-black bg-gray-300 hover:bg-orange-500 hover:scale-110"
// //                         }`}
// //                 >
// //                     {cta}
// //                 </button>
// //             </div>
// //         </>
// //     )
// // }

// // export default PricingCard






// import React from "react";

// const PricingCard = ({
//     plan,
//     description,
//     amount,
//     billing,
//     features,
//     cta,
//     popular
// }) => {
//     return (
//         <div
//             className={`relative rounded-3xl border p-8 transition-all duration-300
//             ${
//                 popular
//                     ? "border-amber-500 bg-[#151618]"
//                     : "border-[#23252B] bg-[#111214]"
//             }`}
//         >

//             {popular && (
//                 <div className="absolute top-5 right-5 bg-amber-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
//                     Popular
//                 </div>
//             )}

//             <h3 className="text-3xl font-semibold text-white">
//                 {plan}
//             </h3>

//             <p className="text-gray-400 mt-3 leading-7">
//                 {description}
//             </p>

//             <div className="mt-8 flex items-end gap-2">

//                 <span className="text-5xl font-bold text-white">
//                     ₹{amount}
//                 </span>

//                 <span className="text-gray-500 mb-1">
//                     / {billing}
//                 </span>

//             </div>

//             <ul className="mt-8 space-y-4">

//                 {features.map((feature, index) => (
//                     <li
//                         key={index}
//                         className="flex items-center gap-3 text-gray-300"
//                     >
//                         <div className="w-2 h-2 rounded-full bg-amber-500"></div>
//                         {feature}
//                     </li>
//                 ))}

//             </ul>

//             <button
//                 className={`mt-10 w-full py-4 rounded-2xl font-medium transition
//                 ${
//                     popular
//                         ? "bg-amber-500 hover:bg-amber-400 text-black"
//                         : "bg-[#1A1B1F] border border-[#2A2C31] hover:bg-[#202228] text-white"
//                 }`}
//             >
//                 {cta}
//             </button>

//         </div>
//     );
// };

// export default PricingCard;


import { Check } from 'lucide-react';
import React from 'react'

const PricingCard = ({ plan, description, amount, billing, features, cta, popular }) => {
    return (
        <div className={`pricing-card ${popular ? "popular" : ""}`}>
            {popular && <span className="popular-badge">Most Popular</span>}
            <div>
                <p className="plan-name">{plan}</p>
                <p className="plan-desc">{description}</p>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <span className="price-amount">₹{amount.toLocaleString()}</span>
                    <span className="price-billing">/ {billing}</span>
                </div>
                <ul className="feature-list">
                    {features.map((f, i) => (
                        <li key={i}><Check size={15} className="check" style={{ color: "#f97316", flexShrink: 0 }} />{f}</li>
                    ))}
                </ul>
            </div>
            <button className={popular ? "plan-cta-primary" : "plan-cta-secondary"}>{cta}</button>
        </div>
    );
}

export default PricingCard