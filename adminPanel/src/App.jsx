import React from 'react';
import { Route, Routes } from 'react-router-dom';
//--react toastify--
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--components--
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
//--pages--
import List from './pages/List/List';
import Add from './pages/Add/Add';
import Orders from './pages/Orders/Orders';

const App = () => {

    const url = "http://localhost:4000"; //--server URL for api call--

  return (
    <>
      <div>
        <ToastContainer/>
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/orders" element={<Orders  url = {url}/>} />
            <Route path="/list" element={<List  url = {url}/>} />
            <Route path="/add" element={<Add  url = {url}/>} />
          </Routes>
        </div>
      </div>
    </>
  )
};

export default App;