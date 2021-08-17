import {useEffect, useMemo, useRef, useState} from "react";

export const Player = (props) => {
    const {
        mediaObjects,
        mediaElements,
    } = props;

    const [currentTime, setCurrentTime] = useState(0);



    const firstMedia = useMemo(() => {
        return mediaObjects.find(obj => obj.start === 0);
    }, [mediaObjects]);

    const [currentVideo, setCurrentVideo] = useState(mediaElements[firstMedia.id]);
    const [currentVideoObj, setCurrentVideoObj] = useState(firstMedia);

    const currentVolume = useMemo(() => {
        return 1;
    }, [currentVideo.volume])

    const [isFullScreen, setIsFullScreen] = useState(false); // todo remove

    const totalDuration = useMemo(() => Math.max(...mediaObjects.map((obj) => obj.end)), [mediaObjects]);
    const canvasRef = useRef(null);
    const videoContainerRef = useRef(null);

    const videoControlsRef = useRef(null);
    const playButtonRef = useRef(null);
    const playbackIconsRef = useRef(null);
    const volumeMuteRef = useRef(null);
    const volumeLowRef = useRef(null);
    const volumeHighRef = useRef(null);
    const volumeRef = useRef(null);

    useEffect(() => {
        let canvas = canvasRef.current;
        canvas.setAttribute('width', 640);
        canvas.setAttribute('height', 360);
        // canvas.onclick = togglePlay;
        const videoContainer = videoContainerRef.current;
        videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);
        // videoContainer.onmouseenter = showControls;
        // videoContainer.onmouseleave = hideControls;
    }, []);


    useEffect(() => {
        if(currentTime >= totalDuration) {
            setCurrentVideo(mediaElements[firstMedia.id]);
            setCurrentVideoObj(firstMedia)
            setCurrentTime(0); // TODO instead of this start first video if play button is clicked
        } else if(currentTime >= currentVideoObj.end || currentTime < currentVideoObj.start) {
            // console.log('currentTime >= currentVideoObj.end || currentTime < currentVideoObj.start, currentTime', currentTime)
            const newMedia = mediaObjects.find(obj => (obj.start <= currentTime) && (obj.end > currentTime));
            console.log("the new media ");
            console.dir(newMedia)
            let video = mediaElements[newMedia.id];
            setCurrentVideo(video);
            setCurrentVideoObj(newMedia);
        }
    }, [currentTime]);

    useEffect(() => {
        console.dir(currentVideo);
        currentVideo.currentTime = currentTime - currentVideoObj.start;
        // console.log('currentVideo.currentTime = ', currentTime - currentVideoObj.start )
        currentVideo.onplay = updatePlayButton;
        currentVideo.onplaying =  updateCanvas;
        currentVideo.onpause = updatePlayButton;
        currentVideo.addEventListener('timeupdate', updateCurrentTime)
        currentVideo.onvolumechange = updateVolumeIcon;
        if (currentVideo.readyState >= 2) {
            autoStart()
        } else {
            currentVideo.addEventListener('seeked', autoStart);
        }

        return (() => {
            // console.log("removing")
            currentVideo.removeEventListener('play', updatePlayButton);
            currentVideo.removeEventListener('playing', updateCanvas);
            currentVideo.removeEventListener('pause', updatePlayButton);
            currentVideo.removeEventListener('timeupdate', updatePlayButton);
            currentVideo.removeEventListener('volumechange', updatePlayButton);
            currentVideo.removeEventListener('seeked', autoStart);
        });
    }, [currentVideo]);

    function autoStart() {
        currentVideo.play()
    }

    function togglePlay() {
        if (currentVideo.paused) {
            currentVideo.play()
        } else {
            currentVideo.pause();
        }
    }

    function updatePlayButton() {

        const playButton = playButtonRef.current;
        const playbackIcons = playbackIconsRef.current.childNodes;

        for(let icon of playbackIcons) {
            icon.classList.toggle('hidden');
        }

        if (currentVideo.paused) {
            playButton.setAttribute('data-title', 'Play');
        } else {
            playButton.setAttribute('data-title', 'Pause');
        }

        setCurrentTime(currentVideo.currentTime + currentVideoObj.start)
    }

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
        const newTime = Math.round(currentVideo.currentTime + currentVideoObj.start);
        const time = formatTime(newTime);
        return `${time.minutes}:${time.seconds}`;
        // timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
        // console.log("updateTimeElapsed -> ", currentVideo.currentTime + currentVideoObj.start)
    }

    function updateCurrentTime() {
        const newTime = currentVideo.currentTime + currentVideoObj.start;
        console.log("currentVideo.currentTime -> ", currentVideo.currentTime);
        console.log("currentVideoObj.start -> ", currentVideoObj.start);
        console.log("newTime -> ", newTime)
        setCurrentTime(newTime);
    }

    // function updateSeekTooltip(event) {
    //     const skipTo = Math.round(
    //         (event.nativeEvent.offsetX / event.nativeEvent.target.clientWidth) *
    //         parseInt(event.target.getAttribute('max'), 10)
    //     );
    //
    //     const t = formatTime(skipTo);
    //     return `${t.minutes}:${t.seconds}`;
    //     // const rect = video.getBoundingClientRect();
    //     // seekTooltip.style.left = `${event.pageX - rect.left}px`;
    // }

    function skipAhead(event) {

        // const seek = seekRef.current;
        // const progressBar = progressBarRef.current;


        const skipTo = event.target.dataset.seek
            ? event.target.dataset.seek
            : event.target.value;


        if(skipTo >= currentVideoObj.start && skipTo < currentVideoObj.end) {
            currentVideo.currentTime = skipTo - currentVideoObj.start;
        } else {

            currentVideo.pause();
            // console.log("currentVideo.paused -> ", currentVideo.paused)
        }

        console.log('skipTo is -> ', skipTo)
        setCurrentTime(skipTo);
    }

    function toggleMute() {
        // console.log("video muted ? ", currentVideo.muted)
        currentVideo.muted = !currentVideo.muted;

        // const volume = volumeRef.current;
        //
        // currentVideo.muted = !currentVideo.muted;
        //
        // if (currentVideo.muted) {
        //     volume.setAttribute('data-volume', volume.value);
        //     // volume.value = 0;
        //     setCurrentVolume(0);
        // } else {
        //     // volume.value = volume.dataset.volume;
        //     setCurrentVolume(volume.dataset.volume);
        //     console.log('volume.dataset.volume ', volume.dataset.volume)
        // }
    }

    //TODO
    function updateVolume() {
        // const volume = volumeRef.current;

        if (currentVideo.muted) {
            currentVideo.muted = false;
        }

        currentVideo.volume = currentVolume;
    }

    function updateVolumeIcon() {
        // const volumeMute = volumeMuteRef.current;
        // const volumeLow = volumeLowRef.current;
        // const volumeHigh = volumeHighRef.current;
        // const volumeButton = volumeButtonRef.current;
        // const volumeIcons = volumeButtonRef.current.firstChild.childNodes;

        // console.log(volumeButtonRef.current.firstChild.childNodes, " volume button")

        // for(let i = 0; i < volumeIcons.length; i++) {
        //     volumeIcons[i].classList.add('hidden');
        // }
        //
        // volumeButton.setAttribute('data-title', 'Mute');
        //
        // if (currentVideo.muted || currentVideo.volume === 0) {
        //     volumeMute.classList.remove('hidden');
        //     volumeButton.setAttribute('data-title', 'Unmute');
        // } else if (currentVideo.volume > 0 && currentVideo.volume <= 0.5) {
        //     volumeLow.classList.remove('hidden');
        // } else {
        //     volumeHigh.classList.remove('hidden');
        // }
    }

    function toggleFullScreen() {
        const videoContainer = videoContainerRef.current;

        if (document.fullscreenElement) {
            document.exitFullscreen().then(r => r);
        } else {
            videoContainer.requestFullscreen().then(r => r);
        }
    }

    function updateFullscreenButton() {
        setIsFullScreen(!isFullScreen);
        // const fullscreenButton = fullscreenButtonRef.current;
        // const fullscreenIcons = fullscreenButton.firstChild.children;
        //
        // fullscreenIcons[0].classList.toggle('hidden');
        // fullscreenIcons[1].classList.toggle('hidden');
        //
        // if (document.fullscreenElement) {
        //     fullscreenButton.setAttribute('data-title', 'Exit full screen');
        // } else {
        //     fullscreenButton.setAttribute('data-title', 'Full screen');
        // }
    }

    function hideControls() {
        const videoControls = videoControlsRef.current;

        if (currentVideo.paused) {
            return;
        }

        videoControls.classList.add('hide');
    }

    function showControls() {
        const videoControls = videoControlsRef.current;

        videoControls.classList.remove('hide');
    }

    function updateCanvas() {

        if (currentVideo.paused) {
            console.log("currentVideo.paused? ", currentVideo.paused)
            return;
        }

            let context = canvasRef.current.getContext('2d');
            context.drawImage(
                currentVideo,
                0,
                0,
                currentVideo.videoWidth/2,
                currentVideo.videoHeight/2
            );

        requestAnimationFrame(updateCanvas);
    }

    return (
        <div>
            <div className="container">
                <div ref={videoContainerRef} className="video-container" id="video-container">
                    <div className="canvas-container">
                        <canvas ref={canvasRef} className="canvas" id="canvas"/>
                    </div>
                    <div onMouseLeave={hideControls} onMouseEnter={showControls} ref={videoControlsRef} className="video-controls" id="video-controls">
                        <div className="video-progress">
                            {/*{console.log('progress', currentVideo.currentTime + currentVideoObj.start)}*/}
                            <progress id="progress-bar" value={currentTime} min="0" max={Math.round(totalDuration)}/>
                            <input onInput={skipAhead} /*onMouseMove={updateSeekTooltip}*/ className="seek" id="seek" value={currentTime} min="0" max={Math.round(totalDuration)} type="range" step="0.2"/>
                            {/*<div ref={seekTooltipRef} className="seek-tooltip" id="seek-tooltip">00:00</div>*/}
                        </div>

                        <div className="bottom-controls">
                            <div className="left-controls">
                                <button ref={playButtonRef} onClick={togglePlay} data-title="Play" id="play">
                                    <svg className="playback-icons" ref={playbackIconsRef}>
                                        <use href="#play-icon"/>
                                        <use className="hidden" href="#pause"/>
                                    </svg>
                                </button>

                                <div className="volume-controls">
                                    <button  onClick={toggleMute} data-title="Mute" className="volume-button" id="volume-button" key="volumeButton">
                                        <svg>
                                            <use ref={volumeMuteRef} className={currentVideo.muted ? "" : "hidden"} href="#volume-mute"/>
                                            <use ref={volumeLowRef} className="hidden" href="#volume-low"/>
                                            <use ref={volumeHighRef} href="#volume-high"/>
                                        </svg>
                                    </button>

                                    <input ref={volumeRef} onChange={updateVolume} className="volume" id="volume" value={currentVolume}
                                           data-mute="0.5" type="range" max="1" min="0" step="0.01" />
                                </div>

                                <div className="time">
                                    <time id="time-elapsed">{updateTimeElapsed()}</time>
                                    <span> / </span>
                                    <time id="duration">{setTotalTime()}</time>
                                </div>
                            </div>

                            <div className="right-controls">
                                <button onClick={toggleFullScreen} data-title={isFullScreen? "Full screen" : "Exit full screen"} className="fullscreen-button" id="fullscreen-button">
                                    <svg>
                                        <use href="#fullscreen" className={isFullScreen ? "hidden" : ""}/>
                                        <use href="#fullscreen-exit" className={isFullScreen ? "" : "hidden"}/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <svg style={{display: 'none'}}>
                <defs>
                    <symbol id="pause" viewBox="0 0 24 24">
                        <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"/>
                    </symbol>

                    <symbol id="play-icon" viewBox="0 0 24 24">
                        <path d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z"/>
                    </symbol>

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
        </div>
    )
}