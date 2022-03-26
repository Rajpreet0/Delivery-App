import React from 'react';
import UserNav from '../../../components/user/user-nav/UserNav';
import './History.css';

function History() {
  return (
    <div className='history_main'> 
      <div className='user_sidebar'>
        <UserNav/>
      </div> 
    </div>
  )
}

export default History