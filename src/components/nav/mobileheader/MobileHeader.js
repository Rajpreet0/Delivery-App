import React from 'react'
import styled from 'styled-components';
import {AiOutlineClose} from 'react-icons/ai';
import {HiShoppingCart} from 'react-icons/hi';
import {BsFillPersonFill} from 'react-icons/bs';
import {GiFullPizza} from 'react-icons/gi';
import { useNavigate } from 'react-router';
import './MobileHeader.css';

function MobileHeader({isOpen, toggle}) {
 
   const navigate = useNavigate(); 

  return (
    <>
     <MobileHeader_Container
       isOpen={isOpen}
       onClick={toggle}>
           <div className='MobileHeader_Logo'>
                <GiFullPizza 
                onClick={() => navigate('/')}
                className='gifullpizza_mobile'/>
           </div>
        <div className='MobileHeader_Icon'>
           <AiOutlineClose style={{color: '#fff'}} onClick={toggle}/>
        </div>
        <div className='MobileHeader_Wrapper'>
           <ul>
               <a href='/'>Home</a>
               <a href='/'>Shop</a>
               <a href='/login'><BsFillPersonFill
               className='icon_header'
               style={{marginRight: 10}}/> Login</a>
               <a href='/'><HiShoppingCart
               className='icon_header'
               style={{marginRight: 10}}/>Cart</a>
           </ul>
        </div>
     </MobileHeader_Container>
    </>
  )
}

export default MobileHeader;


export const MobileHeader_Container = styled.div`
position: fixed;
z-index: 9999;
width: 100%;
height: 100%;
background: #bf2e19;
display: grid;
align-items: center;
top: 0;
left: 0;
transition: 0.3s ease-in-out;
opacity: ${({ isOpen }) => (isOpen ? '100%' : '0%')};
top: ${({ isOpen }) => (isOpen ? '0'  : '-100%')};
`