// import React from 'react'
// import PricingCard from './PricingCard'

// const Pricing = () => {

//     const pricingData = [
//         {
//             id: "starter",
//             plan: "Starter Package",
//             description: "Perfect for small groups planning a quick trip.",
//             amount: 0,
//             billing: "Free for limited users",
//             popular: false,
//             cta: "Start Free",
//             limits: {
//                 members: 4,
//                 editors: 1,
//             },
//             features: [
//                 "Up to 4 Members",
//                 "Only 1 Editor",
//                 "Basic Trip Planning Tools",
//                 "Trip data deleted after 30 days",
//                 "Community support"
//             ]
//         },
//         {
//             id: "friends",
//             plan: "Friends Package",
//             description: "Best for friend groups planning multiple trips together.",
//             amount: 499,
//             billing: "per month",
//             popular: true,
//             cta: "Get Started",
//             limits: {
//                 members: 10,
//                 editors: 5,
//             },
//             features: [
//                 "Up to 10 Members",
//                 "Up to 5 Editors",
//                 "Advanced Trip Planning Tools",
//                 "Trip data stored for 1 year",
//                 "Trip expense sharing",
//                 "Priority email support"
//             ]
//         },
//         {
//             id: "agency",
//             plan: "Agency Package",
//             description: "Ideal for travel agencies and large travel communities.",
//             amount: 1999,
//             billing: "per month",
//             popular: false,
//             cta: "Upgrade Now",
//             limits: {
//                 members: 100,
//                 editors: -1, 
//             },
//             features: [
//                 "Up to 100 Members",
//                 "Unlimited Editors",
//                 "Unlimited Trip Validity",
//                 "Advanced collaboration tools",
//                 "Trip analytics & reports",
//                 "Priority support"
//             ]
//         }
//     ]
//     return (
//         <>
//             <section className="max-w-6xl mx-auto px-6 py-20">
//                 <h2 className="text-4xl font-bold text-center mb-20 text-white">
//                     Choose Your Plan
//                 </h2>

//                 <div className="grid md:grid-cols-3 gap-10">
//                     {pricingData.map((plan) => (
//                         <PricingCard key={plan.id} {...plan} />
//                     ))}
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Pricing


import React from 'react'
import PricingCard from './PricingCard'

const pricingData = [
    {
        id: "starter", plan: "Starter", description: "Perfect for individuals running quick polls.", amount: 0, billing: "Free forever", popular: false, cta: "Start Free",
        features: ["Up to 50 responses / poll", "3 active polls", "Basic analytics", "Link sharing", "Community support"]
    },
    {
        id: "team", plan: "Team", description: "Built for teams making decisions together.", amount: 499, billing: "per month", popular: true, cta: "Get Started",
        features: ["Unlimited responses", "Unlimited polls", "Advanced analytics & exports", "Collaborative workspaces", "Priority email support", "Custom branding"]
    },
    {
        id: "enterprise", plan: "Enterprise", description: "For orgs that need scale and control.", amount: 1999, billing: "per month", popular: false, cta: "Contact Sales",
        features: ["Everything in Team", "SSO & SAML auth", "Dedicated success manager", "Custom integrations", "SLA guarantee", "Audit logs & compliance"]
    }
];

const Pricing = () => {


    return (
    <section id="pricing" style={{ padding: "100px clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-tag" style={{ display:"block", textAlign:"center" }}>Pricing</div>
        <h2 className="section-title" style={{ textAlign:"center", marginBottom: 16 }}>Simple, honest pricing.</h2>
        <p style={{ textAlign:"center", color:"#57534e", fontSize:16, marginBottom:64 }}>No hidden fees. Scale as you grow.</p>
        <div className="pricing-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, alignItems:"center" }}>
          {pricingData.map(p=><PricingCard key={p.id} {...p} />)}
        </div>
      </div>
    </section>
  );
}

export default Pricing