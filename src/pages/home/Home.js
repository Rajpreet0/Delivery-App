import React, { useState } from 'react'
import { useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import HomeHero from '../../components/hero/HomeHero';
import HomeAbout from '../../components/home_elements/home_about/HomeAbout';
import HomeContact from '../../components/home_elements/home_contact/HomeContact';
import HomeMenu from '../../components/home_elements/home_menu/HomeMenu';
import HomeService from '../../components/home_elements/home_service/HomeService';
import Header from '../../components/nav/Header';
import MobileHeader from '../../components/nav/mobileheader/MobileHeader';
import { getProducts, getProductsCount } from '../../functions/product';
import './Home.css';

function Home() {
 
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);



  useEffect(() => {
     loadAllProducts();
  }, []);

  useEffect(() => {
     getProductsCount().then((res) => setProductsCount(res.data));
  }, [])

  const loadAllProducts = () => {
     getProducts('sold', 'desc', 3)
     .then((res) => {
        setProducts(res.data);
     })
  }
 

  return (
    <>
    <Header toggle={toggle}/>
    <MobileHeader isOpen={isOpen} toggle={toggle}/>
    <div className='main_home'>
      <HomeHero/>
      <HomeAbout/>
      
      <div className='home_menu_heading'>
             <span>Food Menu</span>
             <h2>Fresh taste and great price</h2>
          </div>
          <div className='test'>
      {products.map((product) => (
        <div key={product._id} className="home_cards_product">
      <div className='home_menu_main'>       

             <HomeMenu product={product}/>

    </div>
        </div> 
      ))}
      </div>
      <HomeService/>
      <HomeContact/>
      <Footer/>
    </div>
    </>
  )
}

export default Home