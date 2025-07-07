import {NavLink } from "react-router-dom";


import '../index.css';

function Header() {
  
  return (
    <>
    
    <div className="header-container">
     
    <a href="#menu" className="menuToggle"><span>Menu</span></a>
    <nav className="nav">
      <div id="menu">
            <NavLink to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/education" activeClassName="active">Education</NavLink>
            <NavLink to="/experience" activeClassName="active">Experience</NavLink>
            <NavLink to="/projects" activeClassName="active">Projects</NavLink>
            <NavLink to="/about" activeClassName="active">About</NavLink>
            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
      </div>
     
    </nav>
   
  
        <section id="banner">
          <div className="inner">
            <h1 className="heading-primary">
                 <span className="heading-primary--main">Cristiane Abreu</span>
                  <span className="heading-primary--sub">Full Stack Developer</span>
                </h1>
          </div>
                
                <a href="/contact" className="button primary">Contact Me</a>

        </section>
      </div>
    </>
  );
}

export default Header;