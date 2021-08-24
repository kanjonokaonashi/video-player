export const PlayButton = (props) => {

    const {
        togglePlay,
        isPlaying
    } = props;

    return (
        <button onClick={togglePlay} data-title="Play" id="play">
            <svg className="playback-icons">
                <use href="#play-icon" className={isPlaying ? "hidden" : ""}/>
                <use className={isPlaying ? "" : "hidden"} href="#pause"/>
            </svg>

            <svg style={{display: 'none'}}>
                <defs>
                    <symbol id="pause" viewBox="0 0 24 24">
                        <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"/>
                    </symbol>

                    <symbol id="play-icon" viewBox="0 0 24 24">
                        <path d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z"/>
                    </symbol>
                </defs>
            </svg>
        </button>
    )
}