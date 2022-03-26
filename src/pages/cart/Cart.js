import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ProductCardInCheckOut from '../../components/cart/ProductCardInCheckOut';
import Header from '../../components/nav/Header';
import MobileHeader from '../../components/nav/mobileheader/MobileHeader';
import { userCart } from '../../functions/user';
import './Cart.css';

function Cart() {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
      setIsOpen(!isOpen)
    }

    const { cart, user} = useSelector((state) => ({ ...state}));
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {
        userCart(cart, user.token)
        .then(res => {
            console.log('CART POST RES', res);
            if(res.data.ok) navigate('/user/checkout');
        }).catch((err) => console.log("cart save err", err));
    }

    const showCartItems = () => {

    }

  return (
      <>
       <Header toggle={toggle}/>
       <MobileHeader isOpen={isOpen} toggle={toggle}/>
       <div className='cart_main'>
           <h4>Cart / {cart.length} Product</h4>
  

           {!cart.length ? (
             <p>
                 No products in cart. <Link to="/shop">Continue Shopping.</Link>
             </p>
           ) : (
            <table className='order_content_table'>
            <thead className='thead_order'>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Shipping</th>
                    <th>Remove</th>
                </tr>
            </thead>
   
           {cart.map((p) => (
              <ProductCardInCheckOut key={p._id} p={p}/>
           ))}

        </table>
           )}           
 
             
           <section className='summary_box'>
             <h4>Order Summary</h4>
             <hr/>
             <p>Products</p>
             {cart.map((c, i) => (
                 <div key={i}>
            <p
             style={{fontWeight: 'bold'}}
             >{c.title} = {c.price},00€</p>
                </div>
              ))}
             <hr/>
              Total: <b>{getTotal()},00 €</b>
             <hr/>
             {
                 user ? (
                    <button
                    onClick={saveOrderToDb}
                    disabled={!cart.length}>
                    Procced to Checkout
                </button>
                 ) : (
             <Link to={{
                 pathname: "/login",
                 state: { from: "cart"},
             }}>    
             <button>
             Login to Checkout  
          </button>
          </Link>
                 )
             }
           </section>
       </div>
      </>
  )
}

export default Cart