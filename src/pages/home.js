// Home.js
import React, { useState, useEffect } from 'react';
import '../cssfile/home.css';
import Carousel from '../components/carousel';
import Quote from '../components/quote';
import ActivitySection from '../components/basedactivity';
import BestSellers from '../components/bestseller';
import NewReleases from '../components/newrelease';


const Home = () => {
    return (
      <div className='root-container'>
        <Quote />
        <BestSellers />
        <NewReleases />
        <ActivitySection />
        </div>
    );
  };
  
  export default Home;