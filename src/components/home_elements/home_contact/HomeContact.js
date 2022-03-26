import React from 'react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import {toast} from 'react-toastify';
import ClipLoader from 'react-spinners/SyncLoader';
import './HomeContact.css';

function HomeContact() {
 
  const [email, setEmail] = useState("");
  const [name, setName]   = useState("");
  const [message, setMessage] = useState("");

  const [color, setColor] = useState("#bf2e19");
  const [loading, setLoading] = useState(false);

 
  function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm(
      'service_rsbk40s',
      'template_qz2f7ag',
      e.target,
      'DpALq00NeBgCcpARE'
    ).then(res =>  {
      toast.success(`Die Email wurde erfolgreich verschickt. Wir werden uns melden !`);
      setEmail('');
      setName('');
      setMessage('');
      setLoading(false);
    }).catch(err => {
      toast.error(`Es ist etwas schiefgelaufen. Versuchen Sie es später nochmal`)
    });
  }



  return (
    <div className='home_contact_main'>
      <div className='home_contact_title'>
        <div className='home_contact_left_side'>
            <h2>GET IN TOUCH</h2>
        </div>
        <div className='home_contact_right_side'>
           <p><span>Lorem ipsum</span> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore</p>
        </div>
      </div>

      <div className='home_contact_container'>
          <div className='home_contact_left_side'>
            <div className='home_contact_item'>
                <h3>EMAIL</h3>
                <a href='mailto:information@untitled.ext'>information@untitled.ext</a>
            </div>
            <div className='home_contact_item'>
                <h3>PHONE</h3>
                <a href='tel:(000) 000-000'>(000) 000-000</a>
            </div>
            <div className='home_contact_item'>
                <h3>ADDRESS</h3>
                <a href=''>123 Somewhere Road, Nashville, TN 000</a>
            </div>
          </div>
          
          <div className='home_contact_right_side'>
            
            <form onSubmit={sendEmail}>
                <div className='home_contact_top'>
                  <input 
                  required
                  type="text"
                  name='name'
                  value={name}
                  onChange={() => setName()} 
                  placeholder="Name"></input>
                  <input 
                  required
                  name='email'
                  value={email}
                  onChange={() => setEmail()}
                  type="text" 
                  placeholder="Email"></input>
                </div>
              
                <textarea 
                required
                name='message' 
                value={message}
                onChange={() => setMessage()}
                placeholder='Message...'></textarea>
                
                <button type='submit'>SEND MESSAGE</button>
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

export default HomeContact