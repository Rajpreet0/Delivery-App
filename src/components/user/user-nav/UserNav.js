import React from 'react';
import './UserNav.css';
import {FaThList} from 'react-icons/fa';
import {RiLockPasswordFill, RiShoppingBasket2Fill} from 'react-icons/ri';
import {AiFillHeart, AiFillHome} from 'react-icons/ai';
import {FaUserAlt} from 'react-icons/fa';
import { useSelector } from 'react-redux';

function UserNav() {
  
  let { user } = useSelector((state) => ({...state}))

  return (
    <div className='usernav_main'>
       <div className='usernav_container'>
           <div className='usernav_topbar'>
              <div className='usernav_logo'>
                  <h2>Seamly</h2>
              </div>
              <div className='usernav_user'>
              {user && user.role === "subscriber" && (
                 <p>User - {user.email && user.email.split("@")[0]}</p>)}
                 {user && user.role === "admin" && (
                 <p>Admin - {user.email && user.email.split("@")[0]}</p>)}
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
                   {user && user.role === "admin" && (
                   <li>
                       <a href='/admin/dashboard'>
                         <FaUserAlt className='usernav_icon'/>
                         <div>Admin Section</div>
                       </a>
                   </li>
                   )}
                   <li>
                       <a href='/shop'>
                         <RiShoppingBasket2Fill className='usernav_icon'/>
                         <div>Shop</div>
                       </a>
                   </li>
                   <li>
                       <a href='/user/history'>
                         <FaThList className='usernav_icon'/>
                         <div>History</div>
                       </a>
                   </li>
                   <li>
                       <a href='/user/password'>
                         <RiLockPasswordFill className='usernav_icon'/>
                         <div>Password</div>
                       </a>
                   </li>
                   <li>
                       <a href='/user/wishlist'>
                         <AiFillHeart className='usernav_icon'/>
                         <div>Wishlist</div>
                       </a>
                   </li>
               </ul>
           </div>
       </div>
    </div>
  )
}

export default UserNav