export const FullScreenButton = (props) => {

    const {
        toggleFullScreen,
        isFullScreen,
    } = props;

    return (
        <button onClick={toggleFullScreen} data-title={isFullScreen? "Full screen" : "Exit full screen"} className="fullscreen-button" id="fullscreen-button">
            <svg>
                <use href="#fullscreen" className={isFullScreen ? "hidden" : ""}/>
                <use href="#fullscreen-exit" className={isFullScreen ? "" : "hidden"}/>
            </svg>

            <svg style={{display: 'none'}}>
                <defs>
                    <symbol id="fullscreen" viewBox="0 0 24 24">
                        <path
                            d="M14.016 5.016h4.969v4.969h-1.969v-3h-3v-1.969zM17.016 17.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 9.984v-4.969h4.969v1.969h-3v3h-1.969zM6.984 14.016v3h3v1.969h-4.969v-4.969h1.969z"/>
                    </symbol>

                    <symbol id="fullscreen-exit" viewBox="0 0 24 24">
                        <path
                            d="M15.984 8.016h3v1.969h-4.969v-4.969h1.969v3zM14.016 18.984v-4.969h4.969v1.969h-3v3h-1.969zM8.016 8.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 15.984v-1.969h4.969v4.969h-1.969v-3h-3z"/>
                    </symbol>
                </defs>
            </svg>
        </button>
    )
}
