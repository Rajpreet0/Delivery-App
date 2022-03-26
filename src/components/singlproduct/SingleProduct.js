import React from 'react';
import DefualtImage from '../../images/default_product_image.png';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {FaShoppingCart} from 'react-icons/fa';
import {AiOutlineHeart} from 'react-icons/ai';
import _ from 'lodash';
import './SingleProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function SingleProduct({product}) {
 
    const { title, images, description,  price ,   _id} = product;

    
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
    <div className='single_product_main'>
      <div className='single_product_container'>
          <div className='single_product_card'>
              <div className='single_product_images'>
                  {images && images.length ? (
                      <Carousel 
                      showThumbs={false}
                      showArrows={true} autoPlay infiniteLoop>
                         {images && images.map((i) => <img 
                         style={{width: 300}}
                         src={i.url} key={i.public_id}></img>)}
                      </Carousel>
                  ): (
                    <img src={DefualtImage} alt=""></img>
                  )}
              </div>
              <div className='single_product_info'>
                  
                  <h1>{title}</h1>
                  <div className='single_product_price'>
                    <h3>{price},00 €</h3>
                  </div>
                  <div className='single_product_more_infos'>
                                       
                    <h4>{description && description}</h4>
                    
                  
                  </div>
                  <div className='single_product_buttons'>
                     <button
                     
                     onClick={handleAddToCart}
                     ><FaShoppingCart 
                     style={{
                         marginRight: 10,
                         
                     }}/> Add to Cart</button>
                     <button><AiOutlineHeart 
                     style={{
                         fontSize: 20
                     }}/></button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default SingleProduct