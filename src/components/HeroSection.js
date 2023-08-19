import React from 'react';
import './HeroSection.css';
import FormBookingCard from './FormBookingCard';
import video from '../public/videos/video-2.mp4';

import Button from './Button';

function HeroSection() {
  return (
    <div>
      <div className="hero-container">
        <div className="heading__primary">
          <h1>ADVENTURE AWAITS</h1>
          <p>A Journey To Remember</p>
          <div className="hero-btns">
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large">GET STARTED</Button>
          </div>
        </div>

        <div className="right-floated-content">
          <FormBookingCard />
        </div>

      </div>
    </div>
  )
}

export default HeroSection;
