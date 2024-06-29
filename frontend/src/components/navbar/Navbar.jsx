import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

function Navbar({ setShowLogin }) {

  const [menu, setMenu] = useState("menu"); //--useState for nav menu selection management



  const { decodeToken, getTotalCartAmount, token, setToken, filterBySearch, searchkey, setsearchkey } = useContext(StoreContext); //--

  const navigate = useNavigate();  //--hook

  //--decode token to get user details
  const userDetails = decodeToken(token);
  // console.log(userDetails);


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
          <Link to='/' onClick={() => setMenu("menu")} className={menu == "menu" ? "active" : ""}>Home</Link>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu == "mobile-app" ? "active" : ""}>Moblie-App</a>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu == "contact-us" ? "active" : ""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
          <div className='navbar-search'>
            <img src={assets.search_icon} alt="" />
            <input placeholder='search books here' type="text" value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch} />
          </div>
          <div className="navbar-basket-icon">
            <Link to='/cart' onClick={() => setMenu("cart")} className={menu == "cart" ? "active" : ""} ><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? <button onClick={() => setShowLogin(true)} >Sign in</button> :
            <div className="navbar-profile">
              <div className='user-info'>
                <img src={assets.profile_icon} alt="" />
                {/* <h3 >{userDetails.user.name.substring(0, 1)}</h3> */}
                <h5 >{userDetails.user.name}</h5>
              </div>
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