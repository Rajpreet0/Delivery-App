import React from 'react';
import Background from '../../../images/home_element/about_img.png';
import './HomeAbout.css';

function HomeAbout() {
  return (
    <div className='home_about_main'>
      <section className='home_about_section'>
          <div className='home_about_img'>
              <img src={Background} alt="About Background Image"/>
          </div>
          <div className='home_about_text'>
              <span>About Us</span>
              <h2>We speak the good <br/> food language</h2>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                sed diam nonumy eirmod tempor invidunt ut labore et dolore
                 magna aliquyam erat, sed diam voluptua. At</p>
              <a href='#' className='home_about_btn'>Menu</a>
          </div>
      </section>
    </div>
  )
}

export default HomeAbout