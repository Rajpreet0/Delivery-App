import React from 'react';
import './Footer.css';
import Logo from '../../images/logo.png';
import {
    AiFillFacebook,
    AiFillTwitterCircle,
    AiOutlineInstagram,
    AiOutlineYoutube,
    AiOutlineLinkedin
} from 'react-icons/ai';

function Footer() {
  return (
    <div className='footer_main'>
       <section className='footer'>
          <div className='footer_social'>
             <a href='#'><AiFillFacebook className='footer_icon'/></a>
             <a href='#'><AiFillTwitterCircle className='footer_icon'/></a>
             <a href='#'><AiOutlineInstagram className='footer_icon'/></a>
             <a href='#'><AiOutlineYoutube className='footer_icon'/></a>
             <a href='#'><AiOutlineLinkedin className='footer_icon'/></a>
          </div>
          <ul className='footer_list'> 
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>Shop</a>
            </li>
            <li>
              <a href='#'>Login</a>
            </li>
            <li>
              <a href='#'>Cart</a>
            </li>
            <li>
              <a href='#'>Privacy Policy</a>
            </li>
          </ul>
          <p className='footer_copyright'>
            Seamly @ 2022
          </p>
       </section>
    </div>
  )
}

export default Footer