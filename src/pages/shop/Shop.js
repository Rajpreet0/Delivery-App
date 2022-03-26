import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProductsByFilter, getProductByCount} from '../../functions/product';
import Header from '../../components/nav/Header';
import MobileHeader from '../../components/nav/mobileheader/MobileHeader';
import ShopCards from '../../components/shopcards/ShopCards';
import {getCategories} from '../../functions/category';
import './Shop.css';
import { useEffect } from 'react';
import Search from '../../components/forms/Search';

function Shop() {
 
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
      setIsOpen(!isOpen)
    }

    const [products, setProducts]       = useState([]);
    const [ok, setOk]                   = useState(false);
    const [categories, setCategories]   = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);

    let dispatch   = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search; 

    useEffect(() => {
        loadAllProducts();
        // fetch
         getCategories().then((res) => setCategories(res.data));
     }, []);

     const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        })
    }

    // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductByCount(12).then((p) => {
          setProducts(p.data);
        });
    } 

  return (
    <>
      <Header  toggle={toggle}/>
      <MobileHeader isOpen={isOpen} toggle={toggle}/>
      <div className='shop_main'>
      <div className='shop_products'>
              <div className='shop_container'>
                 <h1 className='shop_lg-title'>Special Products For you</h1>
                 <p className='shop_text-light'>
                 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                 sed diam nonumy eirmod tempor invidunt ut labore et 
                 dolore magna aliquyam erat, sed diam voluptua. 
                 </p>

                 <Search/>

                 <div className='shop_product-items'>
                   {products.map((p) => (
                       <div key={p._id}>
                           <ShopCards product={p}/>
                       </div>    
                   ))}
                 </div>
              </div>
           </div>
      </div>
    </>
  )
}

export default Shop;