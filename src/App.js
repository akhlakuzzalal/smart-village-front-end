import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthProvider';
import AllNews from './Pages/AllNews/AllNews';
import Development from './Pages/Development/Development';
import Donation from './Pages/Donation/Donation';
import Education from './Pages/Education/Education';
import EMarket from './Pages/EMarket/EMarket';
import EventDetails from './Pages/Events/EventDetails/EventDetails';
import Events from './Pages/Events/Events';
import Medical from './Pages/Medical/Medical';
import About from './Pages/shared/About/About';
import Login from './Pages/shared/Authentication/Login/Login';
import Register from './Pages/shared/Authentication/Register/Register';
import Contact from './Pages/shared/Contact/Contact';
import Footer from './Pages/shared/Home/Footer/Footer';
import Header from './Pages/shared/Home/Header/Header';
import Home from './Pages/shared/Home/Home';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/education" element={<Education />} />
            <Route path="/medical" element={<Medical />} />
            <Route path="/events" element={<Events />} />
            <Route path="/eventDetails" element={<EventDetails />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/development" element={<Development />} />
            <Route path="/e-market" element={<EMarket />} />
            <Route path="/news" element={<AllNews />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
