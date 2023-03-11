// import logo from './logo.svg';
import get from './api';
import './App.css';
import Courses from './Views/Courses';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom'


function App() {
  return (
    <Router>
      {/* <button onClick={() => getCourseById("12345bc19dadc0984940b243")}>"print2"</button> */}
      <Routes>
        <Route exact path='/' element={<Courses/>}/>
        {/* <Navigate to="/" /> */}
      </Routes>
    </Router>
  );
}

export default App;
