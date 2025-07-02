import projects from '../data/projectData';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

function Projects() {
  return (
    <section className="projects-page">
      <h2 className="section-title">All Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;