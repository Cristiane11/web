import {NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope,FaGoogle} from "react-icons/fa";

import '../index.css';

function Header() {
  
  return (
    <>
    
    <header className="header">
      <h1 className="logo">CristianeAbreu</h1>

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
    </header>
    </>
  );
}

export default Header;