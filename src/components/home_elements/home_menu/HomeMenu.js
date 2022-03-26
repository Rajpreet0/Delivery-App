import React from 'react';
import HomeMenuBackground from '../../../images/home_element/home_menu_place.png';
import DefaultImage from '../../../images/default_product_image.png';
import { HiShoppingCart} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import './HomeMenu.css';

function HomeMenu({product}) {

   const { title, description, images, slug, price } = product; 

  return (
  
    <div className='home_menu_main'>
      <section className='home_menu'>

          <div className='home_menu_container'>
           <Link to={`/product/${slug}`}>  
            <div className='home_menu_box'>
               <div className='home_menu_box_img'>
                  <img src={images && images.length ? images[0].url : DefaultImage}></img>
               </div>
               <h2>{title}</h2>
               <h3>{description && description.substring(0, 50)}...</h3>
               <span>{price},00 €</span>
               <HiShoppingCart className='home_menu_cart'/>
            </div>
            </Link>
         
            
          </div>
      </section>
    </div>
  )
}

/*
<div className='home_menu_box'>
               <div className='home_menu_box_img'>
                  <img src={HomeMenuBackground}></img>
               </div>
               <h2>Chicken Burger</h2>
               <h3>Tasty Food</h3>
               <span>$11.00</span>
               <HiShoppingCart className='home_menu_cart'/>
            </div>
            <div className='home_menu_box'>
               <div className='home_menu_box_img'>
                  <img src={HomeMenuBackground}></img>
               </div>
               <h2>Chicken Burger</h2>
               <h3>Tasty Food</h3>
               <span>$11.00</span>
               <HiShoppingCart className='home_menu_cart'/>
            </div>

*/

export default HomeMenu

