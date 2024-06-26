import React, { useState } from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Fooddisplay from '../../components/FoodDisplay/Fooddisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
function Home() {
  const [category, setCategory] = useState("All");


  return (
   <>
    <Header/>
    <ExploreMenu category= {category} setCategory={setCategory} />
    <Fooddisplay category= {category} />
    <AppDownload/>
   </>
  )
}

export default Home