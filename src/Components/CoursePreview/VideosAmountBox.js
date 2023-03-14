import video from '../../assets/icons/video_icon.svg';
import './coursePreview.css';

function VideoAmountBox({amount}) {
    return (
      <div className="videos_amount_box">
          <img src={video} alt='video'/>
          <div className='videos_amount_text'>{amount} videos</div>
      </div>
    );
  }
  
  export default VideoAmountBox;