import React from 'react'
import { useState } from 'react'
import Header from '../../components/nav/Header'
import MobileHeader from '../../components/nav/mobileheader/MobileHeader';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from '../../components/StripeCheckout';
import '../../stripe.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payment() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
      setIsOpen(!isOpen)
    } 
  return (
    <>
          <Header toggle={toggle}></Header>
    <MobileHeader isOpen={isOpen} toggle={toggle}></MobileHeader>
        <div className='payment_main' 
        style={{marginTop: 100, textAlign: 'center'}}>
        <h1>Purchase Product</h1>
         <Elements stripe={promise}>
           <div>
               <StripeCheckout/>
           </div>
         </Elements>
        </div>
    </>
  )
}

export default Payment