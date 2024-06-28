import React, { useContext, useEffect } from 'react';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import AppDownload from '../../components/AppDownload/AppDownload';

function Cart({ setShowLogin }) {

  const { cartItems, book_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  //--checkOut function--
  const checkOut = () => {
    if (!token) {
    setShowLogin(true)
    }
    navigate('/order');
  };

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <b>Items</b>
            <b>Title</b>
            <b>Price</b>
            <b>Quantity</b>
            <b>Total</b>
            <b>Remove</b>
          </div>
          <br />
          <hr />
          {
            book_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <>
                    <div className="cart-items-title cart-items-item" key={index}>
                      <img src={url+"/images/"+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                    </div>
                    <hr />
                  </>
                )
              }
            })
          }
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0 ? 0: 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0 ? 0: getTotalCartAmount()+2}</b>
              </div>
            </div>
            <button onClick={checkOut}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppDownload />
    </>
  )
}

export default Cart;