import { NavLink } from "react-router-dom";
import Nav from '../components/Nav';
import './pages.css';


function Education() {

  return (
    <>
 <Nav/>
    <section className="education container">
      <div className="education-summary">
        <p>
          <strong>Rutgers University</strong>, Coding Bootcamp, Graduation: 08/2018, Newark NJ
          <br />
          <strong>BS in Computer Information Technologies</strong>, South Piedmont Community College, Graduation: 12/2013 Monroe, NC
          <br />
          <strong>Bachelor of Arts in Elementary Education</strong>, E.E. Monsenhor Amantino, Graduation: 12/1998 MG, Brazil
        </p>
      </div>

      <div className="education-table">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Course Details</th>
              <th>Course Provider</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Code Bootcamp</td>
              <td>Software Engineer – HTML, CSS, JavaScript, React, Python</td>
              <td>Coding Temple</td>
            </tr>
            <tr>
              <td>Project Management</td>
              <td>Agile Project Management Certified</td>
              <td>University System, Maryland</td>
            </tr>
            <tr>
              <td>Google Analytics</td>
              <td>Google Data Analytics</td>
              <td>Google Career Certificates</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    </>
  );
}

export default Education;