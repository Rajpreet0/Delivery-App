import React from 'react'
import { useSelector } from 'react-redux';
import { Routes } from 'react-router';
import { Route, useNavigate } from 'react-router';
import Checkout from '../pages/checkout/Checkout';
import Payment from '../pages/payment/Payment';
import History from '../pages/user/history/History';
import Password from '../pages/user/password/Password';
import LoadingToRedirect from './LoadingToRedirect';


const UserRoute = ({children, ...rest}) => {

    const {user} = useSelector((state) => ({ ...state }));

    const navigate = useNavigate();

    return user && user.token ? (
         <Routes>
             <Route path="history" element={<History/>}></Route>
             <Route path="password" element={<Password/>}></Route>
             <Route path='checkout' element={<Checkout/>}></Route>
             <Route path='payment' element={<Payment/>}></Route>
         </Routes> 
    ): (
      <LoadingToRedirect/>
    );

}

export default UserRoute;