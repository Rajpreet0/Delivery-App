import React from 'react';
import { useState } from 'react';
import UserNav from '../../../components/user/user-nav/UserNav';
import {updatePassword} from 'firebase/auth';
import './Password.css';
import {auth} from '../../../firebase';
import { toast } from 'react-toastify';

function Password() {
 
  const [password, setPassword] = useState();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    await updatePassword(auth.currentUser, password)
    .then(() => {
      setPassword("");
      toast.success("Password updated");
    }).catch(err =>  {
      toast.error(err.message);
    })
  }

  return (
    <div className='password_main'>
      <div className='user_sidebar'>
         <UserNav/>
      </div>
      <div className='password_main_container'>
        <div className='auth_right'>
        <div className='password_form_position'>
        <form onSubmit={handleUpdatePassword}>
          <section className='auth_copy'>
            <h2
            style={{marginBottom: 20}}>Update Password</h2>
          </section>
          <div className='auth_input_container password'>
            <label>New Password</label>
            <input
            required
            placeholder='Must be at least 6 characters'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password">
            </input>
          </div>
          <button
          className='auth_signup_btn'
          type='submit'
          disabled={!password || password.length < 6}>
            Upadte</button>
        </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Password