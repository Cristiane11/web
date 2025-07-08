import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Nav from '../components/Nav';

<Nav/>
const jobs = [
  {
    title: "TEKsystems INC | New Providence, NJ",
    role: "SEO Specialist",
    details: `Local Search Engine Optimization (SEO) and Website Optimization, On-Page & Off-Page Optimization...
    Monitored 190 websites using SEMRush, GA4, GTM, Console, Screaming Frog, BrightLocal.
    Developed strategies, fixed technical issues, trained juniors, created SEO reports, optimized site ranking...`,
  },
  {
    title: "Affordable Websites LLC | Charlotte, NC (Remote)",
    role: "WordPress Developer",
    details: `Built and maintained WordPress sites, worked with HTML5, CSS3, React, JavaScript, cross-browser compatibility...
    Created reusable components, used Figma/Adobe tools, API calls, Docker, MySQL, and more.`,
  },
  {
    title: "Rug Wash INC. | Kearny, NJ",
    role: "Project Manager",
    details: `Managed WordPress websites, analyzed traffic using GA + GTM, optimized AdWords campaigns, managed social SEO, coordinated teams and resources, tracked project schedules and risks.`,
  }
];

function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="experience">
      <h1 className="experience-title">Professional Experience</h1>
      <div className="accordion">
        {jobs.map((job, index) => (
          <div className="accordion-item" key={index}>
            <button className="accordion-header" onClick={() => toggle(index)}>
              {job.title} <span>- {job.role}</span>
            </button>
            {openIndex === index && (
              <div className="accordion-body">
                <p>{job.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;