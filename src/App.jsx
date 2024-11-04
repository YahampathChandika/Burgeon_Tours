import Contact from './components/views/contact/Contact'
import Trip from './components/views/trip/trip'
import Navbar from './components/views/navbar/Navbar'
import ScrollButton from './components/scrollbutton/scroll'
import Home from './components/views/home/Home'
import { BrowserRouter } from 'react-router-dom';
import About from './components/views/about/about'
import WhatsappButton from './components/whatsapp/whatsapp'
import CustomerReviews from './components/views/review/review'





function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Home/>
      <Trip/>
      <About/>
      <CustomerReviews/>
      <Contact/>
      <WhatsappButton/>
      <ScrollButton />
    </div>
    </BrowserRouter>

  )
}

export default App


