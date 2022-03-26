import React, { useEffect, useState } from 'react';
import { auth } from "../../../firebase";
import { useNavigate } from 'react-router';
import './Register.css';
import { sendSignInLinkToEmail } from '@firebase/auth';

import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Register() {
    
   const navigate = useNavigate();

   const [email, setEmail] = useState("");

   const {user} = useSelector((state) => ({...state}));

   useEffect(() => {
      if (user && user.token) navigate('/');
   }, [user, navigate]); 
   
   const handleRegister = async (e) => {
      e.preventDefault();
      
      const config = {
         url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
         handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, config)
      toast.success(
         `Email is sent to ${email}. Click the link to complete your registration.`
      );
     
      window.localStorage.setItem('emailForRegistration', email);
      setEmail('')
   };

  return (
    <div className='register_main'>
        <div className='logo_top'>
           <span onClick={() => navigate('/')}>Seamly</span>
        </div>
        <div className='auth_split_screen'>
          <div className='auth_left'>
             <section className='auth_copy'>
                <h1>“I think of dieting, then I eat pizza.”</h1>
                <p>Lara Stone</p>
             </section>
          </div>
          <div className='auth_right'>
              <form onSubmit={handleRegister}>
                  <section className='auth_copy'>
                     <h2>Register</h2>
                     <div className='auth_container'>
                       <p>Already have an account? <a href='/login'><strong>Login</strong></a></p>
                     </div>
                  </section>
                  <div className='auth_input_container email'>
                      <label for="email">Email</label>
                      <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      type="email" 
                      name='email'></input>
                  </div>

                  <button className='auth_signup_btn' type='submit'>Register</button>

              </form>
          </div>
       </div>
    </div>
  )
}

export default Register