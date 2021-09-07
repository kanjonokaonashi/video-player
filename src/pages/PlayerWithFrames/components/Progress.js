import {Input} from "./Input";

export const Progress = (props) => {

    const {
        currentTime,
        totalDuration,
        skipAhead,
        updateSeekTooltip,
        skipTo
    } = props;

    // console.log(skipTo, "updateSeekToolTip")

    return (
        <div className="video-progress">
            <progress id="progress-bar" value={currentTime} min="0" max={totalDuration}/>
            <Input onInput={skipAhead} value={currentTime} className="seek" id="seek" max={totalDuration}  step="1" onMouseMove={updateSeekTooltip} />
            <div style={{left: 614 * (skipTo/totalDuration) + 20 + "px"}} className="seek-tooltip" id="seek-tooltip">{skipTo - 2}</div>
        </div>
    )
}