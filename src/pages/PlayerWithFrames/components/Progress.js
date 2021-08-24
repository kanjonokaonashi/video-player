import {Input} from "./Input";

export const Progress = (props) => {

    const {
        currentTime,
        totalDuration,
        skipAhead,
    } = props;

    return (
        <div className="video-progress">
            <progress id="progress-bar" value={currentTime} min="0" max={totalDuration}/>
            <Input onInput={skipAhead} value={currentTime} className="seek" id="seek" max={totalDuration}  step="1"/*onMouseMove={updateSeekTooltip}*/ />
            {/*<div ref={seekTooltipRef} className="seek-tooltip" id="seek-tooltip">00:00</div>*/}
        </div>
    )
}