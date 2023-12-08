import '../Styles/Global.css'
import Nav from '../Components/Nav'
import Header from '../Components/Header'
import LiveRates from '../Components/LiveRates';
import ChooseUs from '../Components/ChooseUs'
import Contact from '../Components/Contact';
import Footer from '../Components/Footer'
function Home() {
  return (
    <>
    <Nav/>
    <Header/>
    <LiveRates/>
    <ChooseUs/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default Home;