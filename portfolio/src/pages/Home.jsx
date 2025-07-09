
import Skills from './SkillsPage';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import reactDeveloper from '../assets/img/reactDeveloper.jpg'
import projects from '../data/projectData';
import Nav from '../components/Nav'


function Home({skills}) {

   const latestProjects = projects.slice(-4); // get last 4
  return (
    <>
    <Nav/>
    <Header/>
     <section className="home container">
      <img src={reactDeveloper} alt="Cristiane Abreu" className="home-image"/>
      <div className="home-content">
        <h4>Hi, I'm Cristiane Abreu.</h4>
        <p>
          I’m a front-end developer and SEO consultant. I build clean, performant, and accessible websites
          using modern web technologies like React, JavaScript, and Node.js. With nearly a decade of experience,
          I help businesses grow their online presence through strategic SEO and effective UI development.
        </p>
      </div>
    </section>
    <section className="projects-preview">
        <h2 className="section-title">Latest Projects</h2>
        <div className="projects-grid">
          {latestProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
         
          ))}
              
        </div>
          <a href="/projects" className=" Project-button">Click to see more projects</a>
      </section>
    {/* Inject child component with props */}
      <Skills skills={skills} />
      </>
  );
}

export default Home;