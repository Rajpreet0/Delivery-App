import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../../components/admin/adminnav/AdminNav';
import './ProductUpdate.css';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { getProduct, updateProduct } from '../../../../functions/product';
import { getCategories } from '../../../../functions/category';
import FileUpload from '../../../../components/fileupload/FileUpload';
import { toast } from 'react-toastify';


const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    shipping: "",
    sizes: ["small", "medium", "large"],
    size: "",
    images: [],
}

function ProductUpdate() {

    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [subOptions, setSubOptions]               = useState([]);
    const [arrayOfSubs, setArrayOfSubs]             = useState([]);

    const {
        title,
        description,
        price,
        category,
        shipping,
        size,
        sizes,
        images
       } = values;

       const {user} = useSelector((state) => ({...state}));
    
       const {slug}   = useParams();
       const navigate = useNavigate();

       useEffect(() => {
           loadProduct();
           loadCategories();
       }, []);

       const loadProduct = () => {
           getProduct(slug)
           .then((p) => {
               setValues({...values, ...p.data});
              let arr = [];
              p.data.subs.map((s) => {
                arr.push(s._id);
              });
              setArrayOfSubs((prev) => arr);
           });
       };

       const loadCategories = () => {
        getCategories().then((c) => {
            setCategories(c.data);
        });
       }

      const handleCategoryChange = (e) => {
          e.preventDefault();

          console.log('CLICKED CATEGORY', e.target.value);
          setValues({...values});
          setSelectedCategory(e.target.value);
          console.log("EXISTING CATEGORY values.category", values.category);
          if (values.category._id === e.target.value) {
              loadProduct();
          }
      };

      const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
      };

      const handleProductUpdate = (e) => {
          e.preventDefault();

          values.category = selectedCategory ? selectedCategory : values.category;

          updateProduct(slug, values, user.token)
          .then(res => {
              toast.success(`"${res.data.title}" is updated`);
              navigate("/admin/products");
          }).catch(err => {
              console.log(err);
          })         
      };

  return (
    <div className='productupdate_main'>
        <div className='admin_sidebar'>
           <AdminNav
           navigationheader="Product Update"/>
        </div>

        <div className='productupdate_main_container'>
        <div className='auth_right'>
              <form onSubmit={handleProductUpdate}>
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
                   value={shipping === "Yes" ? "Yes" : "No"}
                   required
                   name="shipping"
                   onChange={handleChange}
                   >
                       <option value="Yes">Yes</option>
                       <option value="Yes">No</option>
                   </select>
                </div>
                <div className='auth_input_container password'>
                    <label>Size</label>
                    <select
                    value={size}
                    name='size'
                    required
                    onChange={handleChange}>
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
                    onChange={handleCategoryChange}
                    value={selectedCategory ? selectedCategory : category._id}>
                    {categories.length > 0 &&
                      categories.map((c) => (
                          <option key={c._id} value={c._id}>
                             {c.name}
                          </option>
                      ))}
                    </select>
                </div>
                <button
          className='auth_signup_btn'
          type='submit'>
            Update</button>
              </form>
           </div>
        </div>
    </div>
  )
}

export default ProductUpdate