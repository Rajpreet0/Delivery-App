import React from 'react';
import {GiFullPizza} from 'react-icons/gi';
import {HiMenuAlt3, HiShoppingCart} from 'react-icons/hi';
import {MdExitToApp} from 'react-icons/md';
import {BsFillPersonFill} from 'react-icons/bs';
import { useNavigate } from 'react-router';
import {signOut} from '@firebase/auth';
import {auth} from '../../firebase';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';

function Header({toggle}) {
 
  const navigate = useNavigate();
  let dispatch = useDispatch();

  let { user } = useSelector((state) => ({...state}));

  const handleLogout = () => {
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate('/login');
  }

  return (
    <>
      <div className='header'>
         <header>
             <a href='/'><GiFullPizza
             className='gifullpizza'/> <span>Seamly</span></a>
             <div className='header_mobileIcon'>
                <HiMenuAlt3 className='icon_header' onClick={toggle}/>
             </div>
             <ul className='header_navigation'> 
               <li><a href='/'>Home</a></li>
               <li><a href='/shop'>Shop</a></li>
              
              {user && user.role === "subscriber" && (
               <li><a href='/user/history'>Dashboard</a></li>
               )}

              {user && user.role === "admin" && (
               <li><a href='/admin/dashboard'>Dashboard</a></li>
               )}

               {!user && (
               <li>
                   <BsFillPersonFill
                   onClick={() => navigate('/login')}
                   className='icon_header'/>
               </li> )}
               
               
               {user && (
                 <li>
               <a
               style={{
                 fontWeight: 'bold'
               }}>{user.email && user.email.split("@")[0]}</a>
               </li>
               )}
              {user && (
               <li>
                 <MdExitToApp
                 onClick={handleLogout}
                 className='icon_header'/>
               </li>
               )}
               <li>
                  <HiShoppingCart
                  onClick={() => navigate('/cart')}
                  className='icon_header'/>
               </li>
             </ul>
         </header>
      </div>
    </>
  )
}

export default Header