export const Frames = (props) => {
    const {
        totalFrames,
        currentFrame
    } = props;

    return (
        <div className="time">
            <time id="time-elapsed">{currentFrame}</time>
            <span> / </span>
            <time id="duration">{totalFrames}</time>
        </div>
    )
}