import video from '../../Assets/icons/video_icon.svg';
function VideoAmountBox({amount}) {
    return (
      <div className="videos_amount_box">
          <img className="video_icon" src={video} alt='video'/>
          <div className='videos_amount_text'>{amount} videos</div>
      </div>
    );
  }
  
  export default VideoAmountBox;