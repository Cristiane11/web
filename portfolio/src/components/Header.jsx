import {Link } from "react-router-dom";
import '../index.css';

function Header() {
  
  return (
    <nav>
      <h1>CristianeAbreu</h1>
            <Link to="/" >Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
    </nav>
  );
}

export default Header;