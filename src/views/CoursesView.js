import React, { useEffect, useState } from 'react';
import getAllCourses from '../ApiServices';
import CoursePreview from '../components/coursePreview/CoursePreview';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';
import './coursesView.css';

function Courses() {
  const [courses, setCurses] = useState({
    isLoading: false,
    data: null,
    isFinished: null,
    error: false,
  });
  const [isCompleted, setIsCompleted] = useState({}); // { chapterIndex: {currentTimeInSec, isFinished, isEnded}} *isEnded - all the video isCompleted

  let content = null;

  useEffect(() => {
    setCurses({
      isLoading: true,
    });
    getAllCourses(setCurses);
  }, [])

  useEffect(() => {
    if(courses.data){
      courses?.data.map((course) => {
        let tempWatched = localStorage.getItem(course.id);
        if(tempWatched != null) {
            tempWatched = JSON.parse(tempWatched)
            isCompleted[course.id] = tempWatched['isCourseFinished'] ?? false
        }
        else setIsCompleted({})
      })
      setIsCompleted({...isCompleted})
    }
  }, [courses.data])

  if(courses.isLoading){
    content = <LoadingSpinner />;
  }

  if(courses.error){
    content = (<p>
        Sorry, there was an error. please refresh or try again later.
      </p>);
  }

  if(courses.data){
    content = (<ul className='priview_grid'>
        {courses.data.map((course, i) => <CoursePreview course={course} key={course.id} index={i} isCompleted={isCompleted[course.id]}/>)}
      </ul>);
  }

  return (
    <div className='courses_page'>
      <div className='courses_page_title'>BIGVU 101 Crash Course</div>
      <div className='courses_page_sub_title'>
        Zero editing experience to pro — your journey starts here.<br/>
        Watch step-by-step video lessons how to make videos with impact.
      </div>
      <div className='courses_container'>
        {content}
      </div>
    </div>
  );
}

export default Courses;