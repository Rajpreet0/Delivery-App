import React from 'react';
import { useEffect } from 'react';
import {toast} from "react-toastify";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { updateCategory, getCategory } from "../../../../functions/category";
import AdminNav from '../../../../components/admin/adminnav/AdminNav';
import './CategoryUpdate.css';

function CategoryUpdate() {

    const {user} = useSelector((state) => ({ ...state}));
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const {slug}   = useParams();

    useEffect(() => {
        loadCategory();
    }, []);

      const loadCategory = () => 
      getCategory(slug).then((c) => setName(c.data.name));


      const handleCategoryUpdate = (e) => {
        e.preventDefault();
        console.log("hallo")
        updateCategory(slug, {name}, user.token)
        .then((res) => {
           
           setName("");
           toast.success(`${res.data.name} is updated`);
           navigate("/admin/category");
           loadCategory ();
        }).catch((err) => {
            
            if(err.response.status === 400) toast.error(err.response.data);
        });
    }

  return (
    <div className='categoryupdate_main'>
     <div className='admin_sidebar'>
        <AdminNav
        navigationheader="Category Update"/>
      </div>
      <div className='categoryupdate_main_container'>
        <div className='auth_right'>
          <form onSubmit={handleCategoryUpdate}>
          <section className='auth_copy'>
            <h2
            style={{marginBottom: 20}}>Update Category</h2>
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
            Update</button>
          
            </form>
        </div>
      </div>
    </div>
  )
}

export default CategoryUpdate