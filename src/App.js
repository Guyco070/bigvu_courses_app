import './App.css';
import {
  BrowserRouter as Router,
  Route,
  // Navigate,
  Routes
} from 'react-router-dom'
import Courses from './views/Courses';
import Course from './views/Course';


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
