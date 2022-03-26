import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../../components/nav/Header';
import MobileHeader from '../../../../components/nav/mobileheader/MobileHeader';
import SingleProduct from '../../../../components/singlproduct/SingleProduct';
import { getProduct } from '../../../../functions/product';
import './ProductPage.css';

function ProductPage() {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
      setIsOpen(!isOpen)
    }
 
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    const {slug} = useParams();

    useEffect(() => {
        loadSingleProduct();
      }, [slug]);

   
      const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
           setProduct(res.data);
          // getRelated(res.data._id).then((res) => setRelated(res.data)) 
         });
       }

  return (
      <>
    <Header toggle={toggle}/>
    <MobileHeader isOpen={isOpen} toggle={toggle}/>
    <div className='productpage_main'>
      <SingleProduct
      product={product}/>  
      <hr />
    </div>
    </>
  )
}

export default ProductPage