import React from 'react';
import './ShopCards.css';
import DefaultImage from '../../images/default_product_image.png'
import {FaShoppingCart} from 'react-icons/fa';
import {AiOutlineHeart} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function ShopCards({product}) {

    const { title, description, images, slug} = product; 

    const { user,  cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch(); 

    const  handleAddToCart = () => {
      let cart = [];
      if (typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.push({
          ...product,
          count: 1,
        })

        let unique = _.uniqWith(cart, _.isEqual);

        localStorage.setItem("cart", JSON.stringify(unique))

        dispatch({
          type: "ADD_TO_CART",
          payload: unique,
        });


      }
      toast.success('Added to Cart')
   }


  return (
    <div>
    {/* --- single product --- */}
      
                           <div className='shop_product'>

                   <div className='shop_product-content'>
                      
                      <div className='shop_product-img'>
                      <img 
                      src={images && images.length ? images[0].url : DefaultImage}
                      alt='product image'></img>
                      </div>
                 
                      <div className='shop_product-btns'>
                          <button type='button' className='shop_btn-cart'>Wishlist
                          <AiOutlineHeart />
                          </button>
                          <a onClick={handleAddToCart}>
                          <button 
                          type='button' className='shop_btn-cart'>Add to Cart
                          <span><FaShoppingCart/></span>
                          </button>
                          </a>
                      </div>
                      
                   </div>
                   <Link to={`/product/${slug}`}>
                   <div className='shop_product-info'>
                     <div className='shop_product-info-top'>
                       <h2 className='shop_sm-title'>{title}</h2>

                     </div>
                     <a href='#' className='shop_product-name'>
                       {description && description.substring(0, 40)}...
                     </a>

                   </div>
                   
               </Link>

               </div>
               
   </div>
  )
}

export default ShopCards