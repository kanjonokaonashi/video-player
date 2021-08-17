import {Progress} from "./Progress";
import {BottomControls} from "./BottomControls";
import {useRef} from "react";

export const Controls2 = (props) => {

    const {
        VideoService,
        skipAhead,
        togglePlay,
        isPlaying
    } = props;


    const videoControlsRef = useRef(null);

    // maybe should be in one parent up
    const showControls = () => {

    }

    const hideControls = () => {

    }

    return (
        <div onMouseLeave={hideControls} onMouseEnter={showControls} ref={videoControlsRef} className="video-controls" id="video-controls">
            <Progress currentTime={VideoService.currentTime} maxTime={VideoService.totalDuration} skipAhead={skipAhead}/>
            <BottomControls VideoService={VideoService} togglePlay={togglePlay} isPlaying={isPlaying}/>
        </div>
    )
}