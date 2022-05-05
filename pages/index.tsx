import type { NextPage } from 'next'
import Header from "../src/components/global/header";
import Hero from "../src/components/page-specific/home/hero";
import Features from "../src/components/page-specific/home/features";
import Footer from "../src/components/global/footer";
const Home: NextPage = () => {

  return (
    <>
      <Header/>
      <Hero/>
      <Features/>
      <Footer/>
    </>
  )
}

export default Home;
