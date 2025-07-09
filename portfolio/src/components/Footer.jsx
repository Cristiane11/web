import {NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope,FaGoogle} from "react-icons/fa";
import '../index.css';

function Footer(){
    return(
<div>
    <p>704-891-4329</p>
    Cristiane Abreu &copy;{new Date().getFullYear()}<a href="#">Web Developer</a>
    <div className="top-bar">
        <div className="social-icons">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://google.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaGoogle /></a>
          <a href="mailto:youremail@example.com"><FaEnvelope /></a>
        </div>
      </div>
</div>
);
}
export default Footer;