import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailLink, updatePassword } from '@firebase/auth';
import {auth} from '../../../firebase';
import { toast } from 'react-toastify';
import './RegisterComplete.css';
import { useSelector, useDispatch } from 'react-redux';
import {createOrUpdateUser} from '../../../functions/auth';


function RegisterComplete() {
 
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let dispatch = useDispatch();    

    useEffect(() => {
       setEmail(window.localStorage.getItem("emailForRegistration"));
    }, [navigate]);

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
       if (user && user.token) navigate('/');
    }, [user, navigate]); 

    
    const roleBasedRedirect = (res) => {
      if (res.data.role === "admin") {
         navigate("/admin/dashboard");
      } else {
         navigate("/user/history");
      }
   }

    const handleRegisterComplete = async (e) => {
      e.preventDefault();

      if (!email || !password) {
        toast.error("Email and Password is required");
        return;
      } 

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      try {
        
        const result = await signInWithEmailLink(auth, email, window.location.href);
        if (result.user.emailVerified){
          window.localStorage.removeItem('emailForRegistration');
          let user = auth.currentUser;
          await updatePassword(user, password);
          const idTokenResult = await user.getIdTokenResult();
      
          console.log("user", user, "idTokenResult", idTokenResult);

          createOrUpdateUser(idTokenResult.token).then(
            (res) => 
            {
               dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                     name: res.data.name,
                     email: res.data.email,
                     token: idTokenResult.token,
                     role: res.data.role,
                     _id: res.data._id,
                  },
               });
               roleBasedRedirect(res);
            }
           ).catch(err => console.log(err));

          //navigate('/');
        }

      } catch (error) {
         toast.error(error.message);
      }

    }

  return (
    <div className='registerComplete_main'>
        <div className='logo_top'>
           <span onClick={() => navigate('/')}>Seamly</span>
        </div>
        <div className='auth_split_screen'>
          <div className='auth_left'>
             <section className='auth_copy'>
                <h1>“A pizza slice a day keeps sadness away.”</h1>
                <p>Jet Paacal</p>
             </section>
          </div>
          <div className='auth_right'>
              <form onSubmit={handleRegisterComplete}> 
                  <section className='auth_copy'>
                     <h2>Register-Complete</h2>
                  </section>
                  <div className='auth_input_container email'>
                      <label for="email">Email</label>
                      <input type="email" name='email' value={email} disabled></input>
                  </div>
                  <div className='auth_input_container password'>
                      <label>Password</label>
                     
                      <input 
                      placeholder='Must be at least 6 characters'
                      type="password" name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}>
                      </input>
                      
                  </div>
                  <button className='auth_signup_btn' type='submit'>Complete Register</button>
              </form>
          </div>
       </div>
    </div>
  )
}

export default RegisterComplete