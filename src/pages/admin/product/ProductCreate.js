import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {createProduct} from '../../../functions/product';
import { getCategories } from '../../../functions/category';
import AdminNav from '../../../components/admin/adminnav/AdminNav';
import {toast} from "react-toastify";
import './ProductCreate.css';
import FileUpload from '../../../components/fileupload/FileUpload';


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    sizes: ["small", "medium", "large"],
    size: "",
    images: [],
}

function ProductCreate() {

   const [values, setValues] = useState(initialState);
   
   const {user} = useSelector((state) => ({...state}));

   useEffect(() => {
    loadCategories();
   }, []);

   const loadCategories = () => 
   getCategories().then((c) => setValues({...values, categories: c.data}));

   const {
    title,
    description,
    price,
    categories,
    category,
    shipping,
    size,
    sizes,
    images
   } = values


   const handleCreateProduct = (e) => {
       e.preventDefault();
       createProduct(values, user.token)
       .then(res => {
           console.log(res);
           window.alert(`${res.data.title} is created`);
           window.location.reload();
       }) .catch(err => {
        console.log(err);
         if (err.response.status === 400) toast.error(err.response.data);
        
    });
   };

   const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('CLICKED CATEGORY', e.target.value);
    setValues({...values, subs: [], category: e.target.value});
};

   const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
   }; 

  return (
    <div className='product_main'>
        <div className='admin_sidebar'>
          <AdminNav
          navigationheader="Product Create"/>
        </div>

        <div className='product_main_container'>
           <div className='auth_right'>
              <form onSubmit={handleCreateProduct}>
                  <section className='auth_copy'>
                <h2  style={{marginBottom: 20}}>Create Product</h2>
                </section>
                <div className='auth_input_container password'>
                   <FileUpload
                    values={values} 
                    setValues={setValues}/>
                </div>
                <div className='auth_input_container password'>
                  
                   <label>Title</label>
                   <input
                   required
                   type="text"
                   name="title"
                   value={title}
                   onChange={handleChange}
                   ></input>
                </div>
                <div className='auth_input_container password'>
                   <label>Description</label>
                   <input
                   required
                   type="text"
                   name="description"
                   value={description}
                   onChange={handleChange}
                   ></input>
                </div>
                <div className='auth_input_container password'>
                   <label>Price</label>
                   <input
                   required
                   type="number"
                   name="price"
                   value={price}
                   onChange={handleChange}
                   ></input>
                </div>
                <div className='auth_input_container password'>
                   <label>Shipping</label>
                   <select
                   required
                   name="shipping"
                   onChange={handleChange}
                   >
                       <option>Please Select</option>
                       <option value="Yes">Yes</option>
                       <option value="Yes">No</option>
                   </select>
                </div>
                <div className='auth_input_container password'>
                    <label>Size</label>
                    <select
                    name='size'
                    required
                    onChange={handleChange}>
                      <option>Please Select</option>
                      {sizes.map((c) => (
                          <option key={c} value={c}>
                             {c}
                          </option>
                      ))}
                    </select>
                </div>
                <div className='auth_input_container password'>
                    <label>Category</label>
                    <select
                    name='category'
                    onChange={handleCategoryChange}>
                    <option>Please Select</option>
                      {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                             {c.name}
                          </option>
                      ))}
                    </select>
                </div>
                <button
          className='auth_signup_btn'
          type='submit'>
            Create</button>
              </form>
           </div>
        </div>
    </div>
  )
}

export default ProductCreate