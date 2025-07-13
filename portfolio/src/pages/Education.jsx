import { NavLink } from "react-router-dom";
import Nav from '../components/Nav';
import './pages.css';


function Education() {

  return (
    <>
      <Nav/>
   
    <br/>
      <div>
        <section className="education container">
          <h1>Education</h1>
      <div className="education-summary">
        <p>
         <h3> <strong>Rutgers University</strong>, Coding Bootcamp, Newark NJ</h3>
        
          <h3> <strong>BS in Computer Information Technologies</strong>, South Piedmont Community College, Monroe, NC</h3>

          <h3><strong>Bachelor of Arts in Elementary Education</strong>, E.E. Monsenhor Amantino Dos Santos, Brazil</h3>
        </p>
      </div>

      <div className="education-table container">
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
    </div>
    </>
  );
}

export default Education;