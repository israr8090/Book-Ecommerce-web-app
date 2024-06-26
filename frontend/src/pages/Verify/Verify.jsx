import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';

function Verify() {

  const [searchParams, setSearchParams] = useSearchParams();  //--useSearchParams Hook
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();  //--hook

  const { url } = useContext(StoreContext); //--url 

  //--verify for payment
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });

    //--checking response--
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/")
    }
  };

  //--useEffect for verifying payment--
  useEffect(()=> {
    verifyPayment();
  },[]);

  return (
    <>
      <div className="verify">
        <div className="spinner"></div>
      </div>
    </>
  )
}

export default Verify;