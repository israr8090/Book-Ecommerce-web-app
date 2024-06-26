import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Orders.css';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]); //--useState for manage orders

  //-fetch all orders function--
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    //--if success
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  };

  //--status handler function--
  const statusHandler = async (event, orderId) => {
    // console.log(event, orderId);
    const response = await axios.post(url + "/api/order/status", { orderId, status: event.target.value });
    //--if success
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    }
    else {
      console.log(error)
      toast.error(response.data.message);
    }
  };

  //--fetch all orders function--
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <div className="order add">
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order, index) => (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    }
                    else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ", "}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode + ", "}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=> statusHandler(event, order._id)} value={order.status}>
                <option value="Order Proccessing">Order Proccessing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  )
};

export default Orders;