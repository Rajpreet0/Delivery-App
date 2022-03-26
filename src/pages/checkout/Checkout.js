import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/nav/Header';
import MobileHeader from '../../components/nav/mobileheader/MobileHeader';
import { emptyUserCart, getUserCart, saveUserAddress } from '../../functions/user';
import {toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './Checkout.css';
import { useNavigate } from 'react-router';

function Checkout() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  } 

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

 
  const saveAdressToDB = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };
  return (
    <>
    <Header toggle={toggle}></Header>
    <MobileHeader isOpen={isOpen} toggle={toggle}></MobileHeader>
    <div className='checkout_main'>

       <div className='checkout_form'>
          <h4>Delivery Adress</h4>
          <br/>
          <br/>
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <div className='checkout_button'>
          <button onClick={saveAdressToDB}>Save</button>
          </div>
          <hr/>
          <h4>Got Coupon?</h4>
          <br/>
          coupon input and apply button
       </div>
       <div className='summary_box'>
         <h4>Order Summary</h4>
         <hr/>
         <p>Products {products.length}</p>
         <hr/>
         {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title}  ={" "}
              {p.product.price},00 €
            </p>
          </div>
        ))}
         <hr/>
         <p>Cart Total: {total},00€</p>

         <div>
             <button
             disabled={!addressSaved || !products.length}
             onClick={() => navigate('/user/payment')}
             >Place Order</button>
         </div>

         
         <div>
             <button
              disabled={!products.length}
              onClick={emptyCart}
             >Empty Card</button>
         </div>
       </div>
    </div>
    </>
  )
}

export default Checkout