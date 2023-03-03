import React from 'react';
import '../src/assets/css/App.css';
// import Product from './component/Product/Product';
// import Login from './component/Login/Login';
// import Header from './component/UI/Header/Header';
// import Slider from './component/UI/Slider/Slider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import AboutUs from './component/UI/AboutUs/AboutUs';
import Product from './component/Product/Product';
import Sale from './component/Sale/Sale';
import Cart from './component/Cart/Cart';
import Payment from './component/Payment/Payment';
import CartProvider from './Store/CartProvider';
import AuthorList from './component/Author/Author';
import ContactForm from './component/UI/Contact/ContactForm';
import Invoice from './component/Cart/Invoice';

function App() {
  return (
    <CartProvider>
        <BrowserRouter>
            <div className="container" >
                <Routes>
                    <Route path='/' element = {<Home/>} ></Route>
                    <Route path='/aboutus' element= {<AboutUs/>}></Route>
                    <Route path='/product' element= {<Product/>}></Route>
                    <Route path='/author' element= {<AuthorList/>}></Route>
                    <Route path='/sale' element= {<Sale/>}></Route>
                    <Route path='/cart' element= {<Cart/>}></Route>
                    <Route path='/contact' element= {<ContactForm/>}></Route>
                    <Route path='/payment' element= {<Payment/>}></Route>
                    <Route path='/myinvoice' element= {<Invoice/>}></Route>
                </Routes>
            </div>
      </BrowserRouter>
    </CartProvider>
      
  );
}

export default App;
