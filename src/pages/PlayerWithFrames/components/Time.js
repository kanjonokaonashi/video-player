export const Time = (props) => {

    const {
        currentTime
    } = props;

    return (
        <div className="time">
            <time id="time-elapsed">
                {currentTime.hours} : {currentTime.minutes} : {currentTime.seconds} . {currentTime.frames}
            </time>
        </div>
    )
}