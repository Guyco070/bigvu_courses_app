import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa';

function VideoPlayerView({chapter, updateWatchedAtLoclStorage, playChapter}) {
    const playerRef = useRef();
    const [isPlayingIcon, setWithPlayingIcon] = useState(false);
    const screenHeight = window.screen.availHeight;
    const screenWidth = window.screen.availWeight;

    useEffect(()=>{setWithPlayingIcon(false);},[chapter.index])

    const onProgress = (data) => {
      if(data.playedSeconds != '0' && data.playedSeconds != chapter.asset.resource.duration) {
        const isFinished = parseFloat(data.playedSeconds) >= 10; // check if the user watched at least 10 second of the current chapter (to update isFinished)
        updateWatchedAtLoclStorage(
          chapter.index,
          {
            currentTimeInSec: data.playedSeconds,
            isFinished: isFinished,
            isEnded: false
          }
        )}
    }

    const onEnded = () => {
      updateWatchedAtLoclStorage( // update chapter that ended (to update isEnded)
        chapter.index,
        {
          currentTimeInSec: 0,
          isFinished: true,
          isEnded: true
        }
      )
      setWithPlayingIcon(false)
      playChapter(chapter.index + 1) // try to play the next chapter
    }

    const onStart = () => {
      if(!chapter.isEnded)
        playerRef.current.seekTo(parseFloat(chapter.currentTime)) // will play the chapter from the last playing position
    }

    return (
      <div className='video_player_container'>
        { isPlayingIcon && 
        <div className='video_player_play_container' onClick={() => {setWithPlayingIcon(false);}} style={{top: screenHeight/2}}>
          <FaPlay className="video_player_icon" />
        </div>}
          <ReactPlayer
            ref={playerRef}
            controls = {!isPlayingIcon}
            url={chapter.asset.resource.stream.url}
            onProgress = {onProgress}
            onEnded = {onEnded}
            onStart = {onStart}
            playing = {!chapter.isEnded && !isPlayingIcon}
            onPause={() => setWithPlayingIcon(true)}
            onSeek={() => setWithPlayingIcon(false)}
          />
      </div>
    );
  }
  
  export default VideoPlayerView;