import { NavLink } from "react-router-dom";
import '../index.css';

function Header() {
  return (
    <>
      <div className="header-container">
        <nav className="nav">
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
          
          <div id="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Home</NavLink>
            <NavLink to="/education" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Education</NavLink>
            <NavLink to="/experience" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Experience</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Projects</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "navLink active" : "navLink"}>Contact</NavLink>
          </div>
        </nav>

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