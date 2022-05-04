import type { NextPage } from 'next'
import Header from "../components/global/header";
import Hero from "../components/page-specific/home/hero";
import Features from "../components/page-specific/home/features";
import Footer from "../components/global/footer";
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
