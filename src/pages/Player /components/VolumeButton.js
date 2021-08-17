export const VolumeButton = (props) => {

    const {
        toggleMute,
        isMuted,
        currentVolume,
    } = props;

    console.log("is muted -> ", isMuted)

    return (
        <button onClick={toggleMute} data-title="Mute" className="volume-button" id="volume-button" key="volumeButton">
            <svg>
                <use className={isMuted || currentVolume === 0 ? "" : "hidden"} href="#volume-mute"/>
                <use className={currentVolume > 0 && currentVolume <= 0.5 && !isMuted ? "" : "hidden"} href="#volume-low"/>
                <use href="#volume-high" className={currentVolume > 0.5 ? "" : "hidden"}/>
            </svg>

            <svg style={{display: 'none'}}>
                <defs>
                    <symbol id="volume-high" viewBox="0 0 24 24">
                        <path
                            d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q1.031 0.516 1.758 1.688t0.727 2.344zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"/>
                    </symbol>

                    <symbol id="volume-low" viewBox="0 0 24 24">
                        <path
                            d="M5.016 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6zM18.516 12q0 2.766-2.531 4.031v-8.063q1.031 0.516 1.781 1.711t0.75 2.32z"/>
                    </symbol>

                    <symbol id="volume-mute" viewBox="0 0 24 24">
                        <path
                            d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.547 1.313-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.203-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q1.031 0.516 1.758 1.688t0.727 2.344z"/>
                    </symbol>
                </defs>
            </svg>
        </button>
    )
}