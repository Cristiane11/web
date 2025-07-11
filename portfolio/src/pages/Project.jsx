import { useState } from 'react';
import projects from '../data/projectData';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

function Projects() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter projects based on search term and skills
  const filteredProjects = projects.filter(project =>
    project.projectSkills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="projects-page container">
      <h2 className="section-title">All Projects</h2>

      {/* Search Input */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by skill (e.g., React, JavaScript)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Project Grid */}
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="no-results">No projects found for "{searchTerm}"</p>
        )}
      </div>
    </section>
  );
}

export default Projects;




/*import projects from '../data/projectData';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

function Projects() {
  return (
    <section className="projects-page container">
      <h2 className="section-title">All Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;*/