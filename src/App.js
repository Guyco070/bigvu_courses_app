import './App.css';
import {
  BrowserRouter as Router,
  Route,
  // Navigate,
  Routes
} from 'react-router-dom'
import CoursesView from './views/CoursesView';
import CourseView from './views/CourseView';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<CoursesView/>}/>
        <Route exact path='/course' element={<CourseView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
