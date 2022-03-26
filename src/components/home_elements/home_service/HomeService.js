import React from 'react';
import s1 from '../../../images/home_element/s1.png';
import s2 from '../../../images/home_element/s2.png';
import s3 from '../../../images/home_element/s3.png'
import './HomeService.css';

function HomeService() {
  return (
    <div className='home_service_main'>
        <section className='home_service_section'>
            <div className='home_menu_heading'>
                <span>Services</span>
                <h2>We provide best quality food</h2>
            </div>
            <div className='home_service_container'>
              <div className='home_service_s_box'>
                  <img src={s1}></img>
                  <h3>Order</h3>
                  <p>Lorem ipsum dolor sit amet, consetetur 
                      invidunt ut labore et dolore magna aliquyam erat,
                       sed diam voluptua. At</p>
              </div>
              <div className='home_service_s_box'>
                  <img src={s2}></img>
                  <h3>Shipping</h3>
                  <p>Lorem ipsum dolor sit amet, consetetur 
                      invidunt ut labore et dolore magna aliquyam erat,
                       sed diam voluptua. At</p>
              </div>
              <div className='home_service_s_box'>
                  <img src={s3}></img>
                  <h3>Delivered</h3>
                  <p>Lorem ipsum dolor sit amet, consetetur 
                      invidunt ut labore et dolore magna aliquyam erat,
                       sed diam voluptua. At</p>
              </div>
            </div>
        </section>
    </div>
  )
}

export default HomeService