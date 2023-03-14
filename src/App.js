import './App.css';
import Courses from './Views/Courses';
import {
  BrowserRouter as Router,
  Route,
  // Navigate,
  Routes
} from 'react-router-dom'
import Course from './Views/Course';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Courses/>}/>
        <Route exact path='/course' element={<Course/>}/>
      </Routes>
    </Router>
  );
}

export default App;
