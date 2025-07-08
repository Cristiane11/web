import { NavLink } from "react-router-dom";
import Nav from '../components/Nav';

function SkillsPage() {
  <Nav/>
  const skills = [
    "JavaScript |", "HTML5 |", "CSS3 |", "ES6 |", "React |", 
    "Bootstrap |", "Node.js |", "SQL |", "Git |", 
    "Agile Project Management |", "WordPress"
  ];

  return (
    <section className="skills-text-section">
      <h2 className="skills-title">Skills</h2>
      <p className="skills-line">
        {skills.map((skill, index) => (
          <span key={index}>{skill} </span>
        ))}
      </p>
    </section>
  );
}

export default SkillsPage;