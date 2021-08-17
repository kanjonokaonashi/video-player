export const Time = (props) => {

    const {
        totalDuration,
        currentTime
    } = props;

    function formatTime(timeInSeconds) {
        const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

        return {
            minutes: result.substr(3, 2),
            seconds: result.substr(6, 2),
        };
    }

    function setTotalTime() {
        const videoDuration = Math.round(totalDuration);
        const time = formatTime(videoDuration);
        return `${time.minutes}:${time.seconds}`;
        // duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    }

    function updateTimeElapsed() {
        const newTime = Math.round(currentTime);
        const time = formatTime(newTime);
        return `${time.minutes}:${time.seconds}`;
        // timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
        // console.log("updateTimeElapsed -> ", currentVideo.currentTime + currentVideoObj.start)
    }

    return (
        <div className="time">
            <time id="time-elapsed">{updateTimeElapsed()}</time>
            <span> / </span>
            <time id="duration">{setTotalTime()}</time>
        </div>
    )
}