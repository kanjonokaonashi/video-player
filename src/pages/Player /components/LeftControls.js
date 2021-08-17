import {PlayButton} from "./PlayButton";
import {Volume} from "./Volume";
import {Time} from "./Time";

export const LeftControls = (props) => {

    const {
        totalDuration,
        currentTime,
        updateVolume,
        currentVolume,
        toggleMute,
        isMuted,
        togglePlay,
        isPlaying
    } = props;


    return (
        <div className="left-controls">
            <PlayButton togglePlay={togglePlay} isPlaying={isPlaying}/>

            <Volume updateVolume={updateVolume} currentVolume={currentVolume} toggleMute={toggleMute} isMuted={isMuted}/>

            <Time totalDuration={totalDuration} currentTime={currentTime} />
        </div>
    )
}