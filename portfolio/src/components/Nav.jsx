import { NavLink } from "react-router-dom";
import '../index.css';

function Nav() {
return(

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

  );
}

export default Nav;;