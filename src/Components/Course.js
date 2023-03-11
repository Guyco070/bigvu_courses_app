import React, { useEffect, useState } from 'react';

function Course({course}) {

  return (
    <div>
        <ul>{course.headline}</ul>

        <div className='item'>
        <ul>{course.chapters.length}</ul>
        <ul>{course.description}</ul>
        <ul>{course.headline}</ul>
        <ul>-----------</ul>
        </div>
    </div>
  );
}

export default Course;