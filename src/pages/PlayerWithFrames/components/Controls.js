import {Progress} from "./Progress";
import {PlayButton} from "./PlayButton";
import {Volume} from "./Volume";
import {Time} from "./Time";
import {FullScreenButton} from "./FullScreenButton";
import {Frames} from "./Frames";
import {useState} from "react";

export const Controls = (props) => {

    const {
        togglePlay,
        isPlaying,
        skipAhead,
        updateVolume,
        currentVolume,
        toggleFullScreen,
        isFullScreen,
        toggleMute,
        isMuted,
        areControlsVisible,
        currentFrame,
        totalFrames,
        currentTime
    } = props;

    const [skipTo, setSkipTo] = useState(0);

    function updateSeekTooltip(event) {
        const skipTo = Math.round(
            (event.nativeEvent.offsetX / event.nativeEvent.target.clientWidth) *
            parseInt(event.target.getAttribute('max'), 10)
        );
        if(skipTo < 0 ) {
            return;
        }
        setSkipTo(skipTo);
        // console.log(event.nativeEvent.offsetX, " event.nativeEvent.offsetX")
        // console.log(event.nativeEvent.target.clientWidth, " event.nativeEvent.target.clientWidth")
        // console.log( parseInt(event.target.getAttribute('max'), 10), "  parseInt(event.target.getAttribute('max'), 10)")

        // const rect = currentVideo.getBoundingClientRect();
        // seekTooltip.style.left = `${event.pageX + 5}px`;
    }

    return (
        <div className={areControlsVisible || !isPlaying ? "video-controls" : "video-controls hide"} id="video-controls">
            <Progress currentTime={currentFrame} totalDuration={totalFrames} skipAhead={skipAhead} updateSeekTooltip={updateSeekTooltip} skipTo={skipTo}/>
            <div className="bottom-controls">
                <div className="left-controls">
                    <PlayButton togglePlay={togglePlay} isPlaying={isPlaying}/>

                    <Volume updateVolume={updateVolume} currentVolume={currentVolume} toggleMute={toggleMute} isMuted={isMuted}/>

                    {/*<Frames currentFrame={currentFrame} totalFrames={totalFrames}/>*/}

                    <Time currentTime={currentTime}/>
                </div>
                <div className="right-controls">
                    <FullScreenButton toggleFullScreen={toggleFullScreen} isFullScreen={isFullScreen}/>
                </div>
            </div>
        </div>
    )
}