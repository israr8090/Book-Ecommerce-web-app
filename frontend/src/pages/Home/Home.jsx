import React, { useState } from 'react';
import './home.css';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Bookdisplay from '../../components/BookDisplay/Bookdisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import Carousal from '../../components/carousal/Carousal';

function Home() {
  const [category, setCategory] = useState("All");  //-- useState hook passed as prop for menu selection

  return (
    <>
      <div className="main">
        <Carousal />
        <ExploreMenu category={category} setCategory={setCategory} />
        <Bookdisplay category={category} />
        <AppDownload />
      </div>
    </>
  )
};

export default Home;