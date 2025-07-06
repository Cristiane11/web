import {NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope,FaGoogle} from "react-icons/fa";

import '../index.css';

function Header() {
  
  return (
    <>
    
    <div className="header-container">
     

    <nav className="nav">
      <NavLink to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/education" activeClassName="active">Education</NavLink>
      <NavLink to="/experience" activeClassName="active">Experience</NavLink>
      <NavLink to="/projects" activeClassName="active">Projects</NavLink>
      <NavLink to="/about" activeClassName="active">About</NavLink>
      <NavLink to="/contact" activeClassName="active">Contact</NavLink>
    </nav>
   
      <div className="top-bar">
        <div className="social-icons">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://google.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaGoogle /></a>
          <a href="mailto:youremail@example.com"><FaEnvelope /></a>
        </div>
      </div>
        <header className="header__text-box">
                <h1 className="heading-primary">
                 <span class="heading-primary--main">Cristiane Abreu</span>
                  <span class="heading-primary--sub">Full Stack Developer</span>
                </h1>
                <a href="/contact" class="btn btn--white btn--animated">Contact Me</a>

        </header>
      
    </div>
    </>
  );
}

export default Header;