import React, { useEffect, useState } from 'react';
import {sendPasswordResetEmail} from '@firebase/auth';
import {auth} from '../../../firebase';
import './ForgotPassword.css';
import {useNavigate} from 'react-router-dom';
import ClipLoader from 'react-spinners/SyncLoader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function ForgotPassword() {
    
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
   const [color, setColor] = useState("#bf2e19");

    const navigate = useNavigate();

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
       if (user && user.token) navigate('/');
    }, [user]); 

   const handleForgotPassword = async (e) => {
      e.preventDefault();
      setLoading(true);


      await sendPasswordResetEmail(auth, email ).then(() => {
         setEmail("");
         setLoading(false);
         toast.success(`Check your Inbox ${email} for password reset link`);
         navigate('/login')
      }).catch((error) => {
         setLoading(false);
         toast.error(error.message);
      })
   }

  return (
    <div className='forgot_password_main'>
        <div className='logo_top'>
           <span onClick={() => navigate('/')}>Seamly</span>
        </div>
        <div className='auth_split_screen'>
          <div className='auth_left'>
             <section className='auth_copy'>
                <h1>“Those pizzas I ate were for medicinal purposes.”</h1>
                <p>Amy Neftzger</p>
             </section>
          </div>
          <div className='auth_right'>
              <form onSubmit={handleForgotPassword}>
                  <section className='auth_copy'>
                     <h2>Forgot Password</h2>
                  </section>
                  <div className='auth_input_container email'>
                      <label for="email">Email</label>
                      <input 
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email" name='email'></input>
                  </div>

                  <button className='auth_signup_btn' type='submit'>Submit</button>
               <ClipLoader
                color={color} 
                size={10} 
                loading={loading}/>
              </form>
          </div>
       </div>
    </div>
  )
}

export default ForgotPassword