import { NavLink } from "react-router-dom";
import Nav from './Nav'
import '../index.css';

function Header() {
  return (
    <>
      <div className="header-container">
   
    <Nav/>
        <section id="banner">
          <div className="inner">
            <h1 className="heading-primary">
              <span className="heading-primary--main">Cristiane Abreu</span>
              <span className="heading-primary--sub">Full Stack Developer</span>
              <a href="/contact" className="button primary">Contact Me</a>
            </h1>
          </div>
          
        </section>
      </div>
    </>
  );
}

export default Header;