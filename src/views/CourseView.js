import medal_icon from '../assets/icons/medal_icon.svg';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoPlayerView from '../components/courseView/VideoPlayerView';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';
import ChapterView from '../components/courseView/ChapterView';
import './courseView.css';

function Course() {
    const location = useLocation();
    const course = location.state;
    const [watched, setWatched] = useState(null); // { chapterIndex: {currentTimeInSec, isFinished, isEnded}} *isEnded - all the video watched
    const [nowWatching, setNowWatching] = useState({ index: 0, currentTime: 0, isClicked: false});
    const [isLoaded, setIsLoaded] = useState(false)
    const screenHeight = window.screen.availHeight;

    useEffect(() => {
        let tempWatched = localStorage.getItem(course.id);
        if(tempWatched != null) {
            tempWatched = JSON.parse(tempWatched)
            tempWatched['finishedAmount'] = getFinishedLength(tempWatched);
            setWatched(tempWatched)
        }
        else setWatched({})
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if(watched)
            playChapter(nowWatching.index)
    }, [isLoaded])

    const updateWatchedAtLoclStorage = (newWatchedIndex, newWatchedData,) => {
        watched[newWatchedIndex] = newWatchedData
        watched['finishedAmount'] = getFinishedLength(watched);
        watched['isCourseFinished'] = watched['finishedAmount'] == course.chapters.length
        setWatched({...watched})
        localStorage.setItem(course.id, JSON.stringify(watched))
    }

    const playChapter = (index) => {
        if(index < course.chapters.length && !watched['isCourseFinished']){
            if(watched[index]){
                if(!watched[index].isEnded){
                    setNowWatching({
                        index,
                        currentTime: watched[index].currentTimeInSec
                    })
                }
                else{
                    playChapter(index + 1)
                }
            } else {
                setNowWatching({ index, currentTime: 0 })
            }
        } else if(!watched['isCourseFinished']) {
            playChapter(0)
        } else { // no more chapters to watch at this course
            setNowWatching({ index: 0, currentTime: 0 })
        }
    }

    const getFinishedLength = (tempWatched) => {
        let fininishedLength = 0
        for(let i in (tempWatched ?? watched)) if((tempWatched ?? watched)[i].isFinished) fininishedLength++;
        return fininishedLength;
    }

    return (
        <div>
            {watched == null ? 
            <LoadingSpinner style={{marginLeft: '25%', marginTop: '15%'}}/> :
            <div className='course_view_container' style={{marginTop: screenHeight/3}}>
                <VideoPlayerView 
                    chapter = {
                        {...nowWatching, 
                        setNowWatching, 
                        ...course.chapters[nowWatching.index], 
                        isFinished: watched[nowWatching.index] ? watched[nowWatching.index].isFinished : false,
                        isEnded: watched[nowWatching.index] ? watched[nowWatching.index].isEnded : false
                    }}
                    updateWatchedAtLoclStorage = {updateWatchedAtLoclStorage}
                    playChapter = {playChapter}
                    courseFinished = {watched['isCourseFinished']}
                />
                <div className='course_side_container'>
                    <div className="headline_container">
                        <div className='course_headline_text'>{course.headline}</div>
                        <div className='watched_container'>
                            <img className="medal_icon" src={medal_icon} alt='medal_icon'/>
                            <label className='watched_text'>{watched['finishedAmount']}/{course.chapters.length}</label>
                        </div>
                    </div>
                    <div className='chapters_container'>
                        {
                        course.chapters.map((chapter, i) => 
                            <ChapterView
                                key = {chapter.id} 
                                number = {i + 1} 
                                title = {chapter.title} 
                                duration = {chapter.asset.resource.duration} 
                                isNowWatching = {i  == nowWatching.index} 
                                setNowWatching = {setNowWatching}
                                isWatched = {watched[i] && watched[i].isFinished}/>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Course;