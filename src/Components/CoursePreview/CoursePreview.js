import SummaryGrid from "./SummeryGrid";
import VideoAmountBox from "./VideosAmountBox";
import buttonArrow from '../../assets/icons/button_arrow.svg';
import sideImage1 from '../../assets/icons/preview_side_image1.svg';
import sideImage2 from '../../assets/icons/preview_side_image2.svg';
import sideImage3 from '../../assets/icons/preview_side_image3.svg';
import sideImage4 from '../../assets/icons/preview_side_image4.svg';
import sideImage5 from '../../assets/icons/preview_side_image5.svg';
import { useNavigate } from "react-router-dom";
import medal_icon from '../../assets/icons/medal_icon.svg';
import './coursePreview.css';

const colors = { 
  0: ['linear-gradient(270deg, #28B3F7 0.65%, #506AFF 99.35%)', sideImage1],
  1: ['linear-gradient(90deg, #00EA3B 0%, #00D096 100%)', sideImage2],
  2: ['linear-gradient(270deg, #F79F28 0.65%, #FF5350 99.35%)', sideImage3],
  3: ['linear-gradient(270deg, #f7287e 0.65%, #ff50ff 99.35%)', sideImage4],
  4: ['linear-gradient(270deg, #71d7e6 0.65%, #10ff1f 99.35%)', sideImage5],
}

function CoursePreview({course, index, isCompleted}) {
  const navigate = useNavigate();

  const screenWidth = window.screen.availWidth;

  const color = colors[index % Object.keys(colors).length] // choose color by index
  const style = {
    background: color[0],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const navigateToSpecificCourse = () => navigate('/course',  {state: course});
  return (
    <div className="preview_item">
        <div className='course_preview_title' style={style}>{course.headline}</div>

        <div className='preview_box_item' onClick={screenWidth < 550 ? navigateToSpecificCourse : null}>
          <div className="course_preview_box_header">
            <VideoAmountBox amount={course.chapters.length}/>
            { isCompleted && <div className='complited_container'>
                <img src={medal_icon} alt='medal_icon'/>
                <label className='commpleted_text'>Completed</label>
            </div> }
          </div>
          <div className="preview_bottom_container">
            <img className="preview_side_image" src={color[1]} alt='sideImage'/>
            <div  className="preview_button" onClick={navigateToSpecificCourse}>
              <div className="preview_button_elipse"/>
              <img className="button_arrow" src={buttonArrow} alt='button_arrow'/>
            </div>
          </div>
          <div className="preview_body_container">
            <div className='course_description_preview'>{course.description}</div>
            <SummaryGrid summary={course.summary} color={color[0]}/>
          </div>
        </div>
    </div>
  );
}

export default CoursePreview;