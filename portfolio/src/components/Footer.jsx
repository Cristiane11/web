import {NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope,FaGoogle} from "react-icons/fa";
import '../index.css';

function Footer(){
    return(
  <footer className="footer">
      <p className="footer-phone">704-891-4329</p>
      <p className="footer-credit"> &copy;{new Date().getFullYear()}| <a href="./about">Cristiane Abreu</a></p>
      
          <div className="social-icons">
            <a href="https://github.com/Cristiane11" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/cristianegabreu/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://www.facebook.com/people/Website-Professional/100066757076765/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://g.co/kgs/UgtGyva" target="_blank" rel="noopener noreferrer"><FaGoogle /></a>
            <a href="mailto:cristipiane@gmail.com"><FaEnvelope /></a>
          </div>
      
  </footer>
);
}
export default Footer;