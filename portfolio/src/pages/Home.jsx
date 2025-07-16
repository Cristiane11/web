
import Skills from './SkillsPage';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import IMG_9200 from '../assets/img/IMG_9200.jpeg'
import projects from '../data/projectData';
import Nav from '../components/Nav'


function Home({skills}) {

   const latestProjects = projects.slice(-4); // get last 4
  return (
    <>
    <Nav/>
    <Header/>
     <section className="home">
      <div className="home-image">
          <img src={IMG_9200} alt="Cristiane Abreu" />
      </div>
      <div className="home-content">
        <h1>Hi, I'm Cristiane Abreu</h1>
        <p>
         I’m a front-end developer and SEO consultant with nearly a decade of experience helping businesses grow their online presence. I specialize in building clean, high-performing, and accessible websites using modern technologies like React, JavaScript, and Node.js. By combining thoughtful UI development with strategic SEO practices, I create digital experiences that not only look great but also drive meaningful results.
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