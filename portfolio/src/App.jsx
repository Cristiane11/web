
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Education from './pages/Education';
import SkillsPage from './pages/SkillsPage';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Projects from './pages/Project';
import About from './pages/About';
import Home from './pages/Home';
import './index.css'

function App() {
  
  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/education" element={<Education/>}/>
          <Route path="/experience" element={<Experience/>}/>
          <Route path="/skills" element={<SkillsPage />}/>
          <Route path="/projects" element={<Projects/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
