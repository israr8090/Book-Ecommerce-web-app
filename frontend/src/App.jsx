import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
//--components--
import LoginPopup from './components/LoginPopup/LoginPopup';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer/Footer';
//--pages--
import PlaceOrder from './pages/PlaceOrder/Placeorder';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Verify from './pages/Verify/Verify';
import MyOrder from './pages/MyOrder/MyOrder';

function App() {
  const [showLogin, setShowLogin] = useState(false); //--useState hook for manage login state AND passed as prop


  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin}/>} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
};

export default App;