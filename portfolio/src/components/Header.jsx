import {NavLink } from "react-router-dom";
import '../index.css';

function Header() {
  
  return (
    <header className="header">
      <h1 className="logo">CristianeAbreu</h1>
    <nav className="nav">
      <NavLink to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/contact" activeClassName="active">Contact</NavLink>
      <NavLink to="/education" activeClassName="active">Education</NavLink>
      <NavLink to="/experience" activeClassName="active">Experience</NavLink>
      <NavLink to="/projects" activeClassName="active">Projects</NavLink>
      <NavLink to="/about" activeClassName="active">About</NavLink>
    </nav>
    </header>
  );
}

export default Header;