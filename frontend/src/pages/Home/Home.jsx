import React, { useState } from 'react';
import './home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Bookdisplay from '../../components/BookDisplay/Bookdisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

function Home() {
  const [category, setCategory] = useState("All");  //-- useState hook passed as prop for menu selection

  return (
   <>
    <Header/>
    <ExploreMenu category= {category} setCategory={setCategory} />
    <Bookdisplay category= {category} />
    <AppDownload/>
   </>
  )
};

export default Home;