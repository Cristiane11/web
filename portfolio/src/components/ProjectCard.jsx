import { NavLink } from "react-router-dom";
import Nav from './Nav'

function ProjectCard({ project }) {
  <Nav/>
  return (
    <div className="project-card">
     
      <img src={project.img} alt={project.title} className="project-img" />
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <p className="project-skills">{project.projectSkills}</p>
      </div>
    </div>
  );
}

export default ProjectCard;