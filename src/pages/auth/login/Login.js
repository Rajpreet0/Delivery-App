import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';
import ClipLoader from 'react-spinners/SyncLoader';
import './Login.css';
import {createOrUpdateUser} from '../../../functions/auth';


function Login() {
 
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#bf2e19");

    let dispatch = useDispatch();

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

    const handleLogin = async (e) => {
       e.preventDefault();
       
       try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          const {user} = result;
          const idTokenResult = await user.getIdTokenResult();

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
           }).catch(err => console.log(err));


     
          //navigate("/");
       } catch (error){
           toast.error(error.message);
           setLoading(false);
       }
    }

  return (
    <div className='login_main'>
        <div className='logo_top'>
           <span onClick={() => navigate('/')}>Seamly</span>
        </div>
       <div className='auth_split_screen'>
          <div className='auth_left'>
             <section className='auth_copy'>
                <h1>"Unless you are a pizza, the answer is yes, I can live without you."</h1>
                <p>Bill Murray</p>
             </section>
          </div>
          <div className='auth_right'>
              <form onSubmit={handleLogin}>
                  <section className='auth_copy'>
                     <h2>Login</h2>
                     <div className='auth_container'>
                       <p>Don't have an account? <a href='/register'><strong>Register</strong></a></p>
                     </div>
                  </section>
                  <div className='auth_input_container email'>
                      <label for="email">Email</label>
                      <input 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email" name='email'></input>
                  </div>
                  <div className='auth_input_container password'>
                      <label>Password</label>
                     
                      <input 
                      required
                      placeholder='Must be at least 6 characters'
                      type="password" name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}>
                      </input>
                      
                  </div>
                  <button className='auth_signup_btn' type='submit'
                  disabled={!email || password.length < 6}>Log In</button>
                <ClipLoader
                color={color} 
                size={10} 
                loading={loading}/>
                  <section className='auth_copy legal'>
                    <p><span className='auth_small'> <a href='/forgot/password'>Forgot your Password ?</a></span></p>
                  </section>
              </form>
          </div>
       </div>
      
    </div>
  )
}

export default Login