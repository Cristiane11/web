import { NavLink } from "react-router-dom";


function ProjectCard({ project }) {
 
  return (
    <div className="project-card container">
 
     
      <img src={project.img} alt={project.title} className="project-img" />
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <p className="project-skills">{project.projectSkills}</p>
        <a className="project-link" href={project.link}>View Project</a>
      </div>
    </div>
  );
}

export default ProjectCard;