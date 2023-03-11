import React, { useEffect, useState } from 'react';
import getAllCourses from '../api';
import Course from '../Components/Course';
import LoadingSpinner from '../Components/LoadingSpinner';

function Courses() {
  const [courses, setCurses] = useState({
    isLoading: false,
    data: null,
    error: false,
  });

  let content = null;

  useEffect(() => {
    setCurses({
      isLoading: true,
    });
    getAllCourses(setCurses);
  }, [])

  if(courses.isLoading){
    content = <LoadingSpinner />;
  }

  if(courses.error){
    content = (<p>
        Sorry, there was an error. please refresh or try again later.
      </p>);
  }

  if(courses.data){
    content = (<ul className='grid'>
        {courses.data.map((course) => <Course course={course} key={course.id}/>)}
      </ul>);
  }

  return (
    <div>
      <h1>BIGVU 101 Crash Course</h1>
      <h3>
        Zero editing experience to pro — your journey starts here. Watch step-by-step video lessons how to make videos with impact.
      </h3>
      {content}
      <button onClick={getAllCourses}>print</button>
    </div>
  );
}

export default Courses;