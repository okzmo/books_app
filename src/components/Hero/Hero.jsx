import React from "react";
import "./hero.scss";
import lamp from '../../images/Lamp.png'
import illustration from '../../images/Illustration.png'

function Hero() {
  return (
    <div className="hero">
      <h1 className="greeting">
        <span className="firstWord">CALM </span>
        <span className="secondWord">YOUR </span>
        <span className="thirdWord">MIND </span>
        <span className="and">&</span> 
        <span className="fourthWord">EXPLORE</span>
      </h1>
      <img src={lamp} alt="" id="LampPos" />
      <img src={illustration} alt="" id="Illustration" />
    </div>
  );
}

export default Hero;
