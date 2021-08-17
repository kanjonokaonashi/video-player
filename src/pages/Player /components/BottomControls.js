import {LeftControls} from "./LeftControls";
import {RightControls} from "./RightControls";

export const BottomControls = (props) => {

    const {
        VideoService,
        togglePlay,
        isPlaying,
    } = props;

    const updateVolume = () => {
        // maybe shouldnt be here
    }

    const toggleMute = () => {
        // maybe not here
    }

    // pass the props to all of them
    return (
        <div className="bottom-controls">
            <LeftControls
                totalDuration={VideoService.totalDuration}
                currentTime={VideoService.currentTime}
                updateVolume={updateVolume}
                currentVolume={VideoService.volume}
                toggleMute={toggleMute}
                isMuted={VideoService.isMuted}
                togglePlay={togglePlay}
                isPlaying={isPlaying}
            />
            <RightControls />
        </div>
    )
}