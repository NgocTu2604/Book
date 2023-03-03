import React from 'react';
import BestSeller from '../UI/BestSeller/BestSeller';
import Header from '../UI/Header/Header';
import Slider from '../UI/Slider/Slider';

const Home = (props) => {
    return (
        <>
        <Header/>
        <Slider/>
        <BestSeller/>
        </>
    );
}

export default Home;