import React from 'react';
import Nav from '../components/Nav';
import CristianeAbreu from '../assets/img/cristianeAbreu.jpg'

export default function About(){
    return(
          <div className="about-section container">
      <Nav />
      <div className="about-content">
        <div className="about-text">
          <h3>Cristiane Abreu</h3>
          <p>
            Versatile, client-focused, and motivated professional with nearly ten years’ experience providing Search Engine Optimization (SEO) and Website Optimization services world-wide. Trained and experienced Google AdWords, Google Search Console, & Analytics trained and certified consultant. Experience conducting onsite audits and action plans. Developing websites using HTML5, CSS3, JavaScript (ES6), React and Node packages, making API calls, connecting data from front end to databases like MySQL and MongoDB. Hands-on experience with Visual Studio Code, Sublime, and IntelliJ IDEA.
          </p>
        </div>
       
        <img src={CristianeAbreu} alt="Cristiane Abreu" className="about-image" />
      </div>
    </div>
    )
}