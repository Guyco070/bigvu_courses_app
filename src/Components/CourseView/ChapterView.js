import play_icon from '../../Assets/icons/play_icon.svg';
import check_icon from '../../Assets/icons/check_icon.svg';

function ChapterView({number, title, duration, isNowWatching, setNowWatching, isWatched}) {

    const getDurationText = (secDuration) => {
        let date = new Date(0);
        date.setSeconds(secDuration);
        let timeString = date.toISOString().substring(14, 19); // contain only minutes and seconds
        return timeString;
    }

    return (            
        <div className='chapter_item' 
            style={isNowWatching ? {background: `rgba(0, 171, 254, 0.08)`} : {opacity: 0.6, cursor: 'pointer'}} 
            onClick={() => setNowWatching({ index: number-1, currentTime: 0, isClicked: true })}>
            {
                isWatched ? 
                    <img className="check_icon" src={check_icon} alt='check_icon' /> : 
                    <div className='play_icon_container'>
                        <img className="play_icon" src={play_icon} alt='play_icon'/>
                    </div>
            }
            <label className='chapter_title_text'>
                {number}. {title}
                <label className='duration'>{getDurationText(duration)}</label>
            </label>
        </div>
    );
}

export default ChapterView;