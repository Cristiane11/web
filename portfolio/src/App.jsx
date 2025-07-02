
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Education from './pages/Education';
import SkillsPage from './pages/SkillsPage';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import About from './pages/About';
import Home from './pages/Home';
import './App.css'

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
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
