import {Progress} from "./Progress";
import {PlayButton} from "./PlayButton";
import {Volume} from "./Volume";
import {Time} from "./Time";
import {FullScreenButton} from "./FullScreenButton";
import {Frames} from "./Frames";

export const Controls = (props) => {

    const {
        togglePlay,
        isPlaying,
        skipAhead,
        updateVolume,
        currentVolume,
        // currentTime,
        toggleFullScreen,
        isFullScreen,
        toggleMute,
        isMuted,
        areControlsVisible,
        // totalDuration,
        currentFrame,
        totalFrames,
    } = props;

    return (
        <div  className={areControlsVisible || !isPlaying ? "video-controls" : "video-controls hide"} id="video-controls">
            <Progress currentTime={currentFrame} totalDuration={totalFrames} skipAhead={skipAhead}/>
            <div className="bottom-controls">
                <div className="left-controls">
                    <PlayButton togglePlay={togglePlay} isPlaying={isPlaying}/>

                    <Volume updateVolume={updateVolume} currentVolume={currentVolume} toggleMute={toggleMute} isMuted={isMuted}/>

                    <Frames currentFrame={currentFrame} totalFrames={totalFrames}/>

                    {/*<Time totalDuration={totalDuration} currentTime={currentTime} />*/}
                </div>
                <div className="right-controls">
                    <FullScreenButton toggleFullScreen={toggleFullScreen} isFullScreen={isFullScreen}/>
                </div>
            </div>
        </div>
    )
}