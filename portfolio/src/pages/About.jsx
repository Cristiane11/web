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
            Experienced Front-End Developer and SEO Specialist with over 10 years of expertise in real estate and legal SEO marketing. I focus on creating smooth, user-friendly experiences across all devices, while prioritizing SEO best practices to ensure websites are optimized for visibility, performance..
            Skilled in developing strategies to boost organic search performance, and drive conversions. Proven success in highly competitive markets especially real estate and legal by leveraging technical SEO, on-page optimization, and multilingual keyword research (English, Portuguese, and Spanish).
          </p>
          <p>
          Fluent in three languages, I communicate effectively with global teams and stakeholders. I naturally use clear, simple language for collaboration, but I also have a strong academic background and can articulate complex ideas using advanced terminology when needed. This ability enables me to bridge the gap between technical teams and executive leadership translating technical needs for decision-makers and simplifying strategy for the team.
          To further strengthen my cross-functional collaboration skills, I completed an Agile Project Management certification in 2024, enhancing my ability to support teams and improve project outcomes.
          </p>
        </div>
       
        <img src={CristianeAbreu} alt="Cristiane Abreu" className="about-image" />
      </div>
    </div>
    )
}