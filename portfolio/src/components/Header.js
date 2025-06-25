import {Link , NavLink} from "react-router-dom";
import reactDeveloper from "./img/reactDeveloper.jpg"
import '../index.css';



function Header() {
  const getClass =({isActive})=> (isActive ? "nav-active": null);
  return (
    <div className="header about">
     <header>
      <Link to ="https://www.websitesprofessional.com/">
        <img 
          className="img" 
          src={reactDeveloper}
          alt="web developer"
          title="react-developer"
          />
        </Link>
          <div>
              <h1><span className="font-primary">C</span>ristiane <span className="font-primary">A</span>breu</h1>
              <a class="title-icon" href="#"><i class="bi bi-linkedin"></i></a>
                <a class="title-icon" href="#"><i class="bi bi-github ms-3"></i></a>
              </div>
              <nav className="nav">
                <ul>
                  <li><NavLink to="/" className={getClass}>Home</NavLink></li>
                  <li><NavLink to="/about" className={getClass}>About</NavLink></li>
                  <li><NavLink to="/contact" className={getClass}>Contact</NavLink></li>
                  <li><NavLink to="/project" className={getClass}>Project</NavLink> </li>
                    <ul>
                      <li><NavLink to="/project" className={getClass}>Project</NavLink></li>
                      <li><NavLink to="/skills" className={getClass}>Skills</NavLink></li>
                      <li><NavLink to="/Experience" className={getClass}>Experience</NavLink></li>
                      <li><NavLink to="/Experience/education" className={getClass}>Education</NavLink></li>
                      <li><NavLink to="/register" className={getClass}>Register</NavLink></li>
                    </ul>
                </ul>
              </nav>
        </header>
    </div>
  );
}

export default Header;