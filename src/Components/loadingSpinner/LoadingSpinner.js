import React, { useEffect, useState } from 'react';
import './loadingSpinner.css';

function LoadingSpinner({style}) {
  return (
    <div className='loading-spinner' style={style}/>
  );
}

export default LoadingSpinner;