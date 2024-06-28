import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin }) {

  const [menu, setMenu] = useState("home"); //--useState for nav menu selection management

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext); //--

  const navigate = useNavigate();  //--hook

  //--logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");

  };

  return (
    <>
      <div className="navbar">
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu == "menu" ? "active" : ""}>Books</a>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu == "mobile-app" ? "active" : ""}>Moblie-App</a>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu == "contact-us" ? "active" : ""}>Contact Us</a>
        </ul>
        <div className="navbar-right"> 
          <div className='navbar-search'>
            <input type="text" />
            <img src={assets.search_icon} alt="" />
          </div>
          <div className="navbar-basket-icon">
            <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? <button onClick={() => setShowLogin(true)} >Sign in</button> :
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Navbar;