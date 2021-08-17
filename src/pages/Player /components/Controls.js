import {Progress} from "./Progress";
import {useRef} from "react";
import {PlayButton} from "./PlayButton";
import {Volume} from "./Volume";
import {Time} from "./Time";
import {FullScreenButton} from "./FullScreenButton";

export const Controls = (props) => {

    const {
        VideoService,
        togglePlay,
        isPlaying,
        skipAhead,
        updateVolume,
        currentVolume,
        currentTime,
        toggleFullScreen,
        isFullScreen,
        toggleMute,
        isMuted,
        areControlsVisible,
    } = props;

    return (
        <div  className={areControlsVisible || !isPlaying ? "video-controls" : "video-controls hide"} id="video-controls">
            <Progress currentTime={currentTime} maxTime={VideoService.totalDuration} skipAhead={skipAhead}/>
            <div className="bottom-controls">
                <div className="left-controls">
                    <PlayButton togglePlay={togglePlay} isPlaying={isPlaying}/>

                    <Volume updateVolume={updateVolume} currentVolume={currentVolume} toggleMute={toggleMute} isMuted={isMuted}/>

                    <Time totalDuration={VideoService.totalDuration} currentTime={currentTime} />
                </div>
                <div className="right-controls">
                    <FullScreenButton toggleFullScreen={toggleFullScreen} isFullScreen={isFullScreen}/>
                </div>
            </div>
        </div>
    )
}