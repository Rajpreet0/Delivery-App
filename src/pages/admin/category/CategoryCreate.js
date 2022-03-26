import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {toast} from "react-toastify";
import {createCategory, getCategories, removeCategory } from '../../../functions/category';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import AdminNav from '../../../components/admin/adminnav/AdminNav';
import './CategoryCreate.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Category() {
 
  const {user} = useSelector((state) => ({ ...state}));
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");

  const handleSearchChange = (e) => {
     e.preventDefault();
     setKeyword(e.target.value.toLowerCase());
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => 
    getCategories().then((c) => setCategories(c.data));
 
  const handleCategory = (e) => {
    e.preventDefault();
    createCategory({name}, user.token)
    .then((res) => {
      setName("");
      toast.success(`${res.data.name} is created`);
      loadCategories();
   }).catch((err) => {
       if(err.response.status === 400) toast.error(err.response.data);
   });
  }

  const handleCategoryRemove = async (slug) => {
    if (window.confirm("Delete?")){
      removeCategory(slug, user.token)
      .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadCategories();
      })
      .catch(err => {
          if(err.response.status === 400) {
            toast.error(err.response.data);
        }
      });
  }
  }

  return (
    <div className='category_main'>
      <div className='admin_sidebar'>
        <AdminNav
        navigationheader="Category Create"/>
      </div>
      

      <div className='category_main_container'>

        <div className='auth_right'>               

          <form onSubmit={handleCategory}>
          <section className='auth_copy'>
          
            <h2
            style={{marginBottom: 20}}>Create Category</h2>
          </section>
          <div className='auth_input_container password'>
            <label>Category</label>
            <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text">
            </input>
          </div>
          <button
          className='auth_signup_btn'
          type='submit'>
            Create</button>
          
            </form>
        </div>
        <div className='search_input'>
          <input type="search" placeholder='Search' value={keyword} onChange={handleSearchChange}></input>
        </div>
        <hr className='category_hr'/>
          { categories.filter(searched(keyword)).map((c) => (

            <div className='category_banner' key={c._id}>
              
              {c.name}
              <div className='category_banner_items'>
              <span
              onClick={() => handleCategoryRemove(c.slug)}>
                  <AiFillDelete className='category_banner_delete_icon'/>
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span>
                   <AiFillEdit className='category_banner_edit_icon'/>
                </span>
              </Link>
              </div>
            </div>  
          ))}
      </div>
    </div>
  )
}

export default Category