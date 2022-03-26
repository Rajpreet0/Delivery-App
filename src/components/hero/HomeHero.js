import React from 'react';
import './HomeHero.css';
import Background from '../../images/video/video_bg.mp4';

function HomeHero() {
  return (
  <div className='videoComponent_main'>
  <div className='videoComponent_container'>
    <div className='videoComponent_bg'>
        <video src={Background} autoPlay loop muted type="video/mp4"></video>
    </div>
    <div className="heroContent">
        <h1>Seamsley</h1>
        <h2>Pizza mit Qualität</h2>
        <div className='heroContent-btn'>
            <a>Shop</a>
        </div>
       </div>
     </div>
  </div>
  )
}

export default HomeHero