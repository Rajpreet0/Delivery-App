import React from 'react';
import './AdminNav.css';
import {RiLockPasswordFill, RiShoppingBasket2Fill, RiCoupon2Fill} from 'react-icons/ri';
import {AiFillHeart, AiFillHome, AiTwotoneShop} from 'react-icons/ai';
import {FaUserAlt} from 'react-icons/fa';
import {MdSpaceDashboard, MdLabel} from 'react-icons/md';
import { useSelector } from 'react-redux';

function AdminNav(props) {

    let { user } = useSelector((state) => ({...state}))

  return (
    <div className='usernav_main'>
       <div className='usernav_container'>
           <div className='usernav_topbar'>
              <div className='usernav_logo'>
                  <h2>Seamly - <span style={{color: 'black', letterSpacing: 1, fontWeight: 500}}>{props.navigationheader}</span></h2>
              </div>
              <div className='usernav_user'>
                 <p>Admin - {user.email && user.email.split("@")[0]}</p>
              </div>
           </div>
           <div className='usernav_sidebar'>
               <ul>
                    <li>
                       <a href='/'>
                         <AiFillHome className='usernav_icon'/>
                         <div>Home</div>
                       </a>
                   </li>
                   <li>
                       <a href='/shop'>
                         <RiShoppingBasket2Fill className='usernav_icon'/>
                         <div>Shop</div>
                       </a>
                   </li>
                   <li>
                       <a href='/user/history'>
                         <FaUserAlt className='usernav_icon'/>
                         <div>User Section</div>
                       </a>
                   </li>
                   <li>
                       <a href='/admin/dashboard'>
                         <MdSpaceDashboard className='usernav_icon'/>
                         <div>Dashboard</div>
                       </a>
                   </li>
                   <li>
                       <a href='/admin/product'>
                         <AiTwotoneShop className='usernav_icon'/>
                         <div>Product</div>
                       </a>
                   </li>
                   <li>
                       <a href='/admin/products'>
                         <AiTwotoneShop className='usernav_icon'/>
                         <div>Products</div>
                       </a>
                   </li>
                   <li>
                       <a href='/admin/category'>
                         <MdLabel className='usernav_icon'/>
                         <div>Category</div>
                       </a>
                   </li>
                   <li>
                       <a href='/admin/coupon'>
                         <RiCoupon2Fill className='usernav_icon'/>
                         <div>Coupon</div>
                       </a>
                   </li>
                   <li>
                       <a href='/user/password'>
                         <RiLockPasswordFill className='usernav_icon'/>
                         <div>Password</div>
                       </a>
                   </li>
               </ul>
           </div>
       </div>
    </div>
  )
}

export default AdminNav