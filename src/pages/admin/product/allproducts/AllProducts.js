import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getProductByCount, removeProduct } from '../../../../functions/product';
import { toast } from 'react-toastify';
import AdminNav from '../../../../components/admin/adminnav/AdminNav';
import './AllProducts.css';
import AdminProductCard from '../../../../components/admin/adminproductcard/AdminProductCard';

function AllProducts() {
 
  const [products, setProducts] = useState([]);
  
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductByCount(100)
     .then((res) => {
         setProducts(res.data);
     })
     .catch((err) => {
         console.log(err);
     });
  };

  const handleProductRemove = (slug) => {
      let answer = window.confirm("Delete ?");
      if (answer) {
          removeProduct(slug, user.token)
          .then((res) => {
            loadAllProducts();
            toast.error(`${res.data.title} Product is deleted`);
          }).catch((err) => {
            if (err.response.status === 400) toast.error(err.response.data);
            console.log(err);
          }); 
      }
  } 

  return (
    <div className='allproducts_main'>
       <div className='admin_sidebar'>
           <AdminNav
           navigationheader="All Products"/>
       </div>  
      <div className='allproducts_main_container'>
        <div className='auth_right'>
          <form>
           {products.map((product) => (
             <div key={product._id} className="container_product_card_admin">
                 <AdminProductCard
                 product={product}
                 handleRemove={handleProductRemove}/>
             </div>    
           ))}
           </form>
        </div>
      </div>
    </div>
  )
}

export default AllProducts