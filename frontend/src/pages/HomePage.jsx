import React from 'react'
import Navbar from '../components/homepage/Navbar'
import Hero from '../components/homepage/Hero'
import Features from '../components/homepage/Features'
import Pricing from '../components/homepage/Pricing'
import GlobalStyles from '../components/homepage/GlobalStyles'
import FooterCTA from '../components/homepage/FooterCTA'
import Footer from '../components/homepage/Footer'

const HomePage = () => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}

export default HomePage