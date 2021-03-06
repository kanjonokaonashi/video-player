import {useEffect, useMemo, useRef, useState} from "react";
import {Controls} from "./components/Controls";

export const Player = (props) => {
    // data from props
    const {
        mediaObjects,
        mediaElements,
    } = props;

    const firstMedia = useMemo(() => {
        return mediaObjects.find(obj => obj.start === 0);
    }, [mediaObjects]);
    const totalDuration = useMemo(() => Math.max(...mediaObjects.map((obj) => obj.end)), [mediaObjects]);

    // state
    const [currentTime, setCurrentTime] = useState(0);
    const [areControlsVisible, setAreControlsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(mediaElements[firstMedia.id]);
    const [currentVideoObj, setCurrentVideoObj] = useState(firstMedia);
    const [isFullScreen, setIsFullScreen] = useState(false); // todo remove
    const [currentFrame, setCurrentFrame] = useState(0);

    const canvasRef = useRef(null);
    const videoContainerRef = useRef(null);

    const _FPS = 24;
    const _FRAMERATE = 0.042;

    useEffect(() => {
        const videoContainer = videoContainerRef.current;
        videoContainer.addEventListener('fullscreenchange', () => {setIsFullScreen(!isFullScreen);});
    });


    useEffect(() => {
        if(currentTime >= totalDuration) {
            setCurrentVideo(mediaElements[firstMedia.id]);
            setCurrentVideoObj(firstMedia)
            setCurrentTime(0);
            togglePlay();
        } else if(currentTime >= currentVideoObj.end || currentTime < currentVideoObj.start) {
            currentVideo.pause();
            const newMedia = mediaObjects.find(obj => (obj.start <= currentTime) && (obj.end > currentTime));
            let video = mediaElements[newMedia.id];
            setCurrentVideo(video);
            setCurrentVideoObj(newMedia);
        }
    }, [currentTime]);

    useEffect(() => {

        console.log("currrent video")
        console.dir(currentVideo)
        currentVideo.currentTime = currentTime - currentVideoObj.start;
        // currentVideo.onplaying =  () => requestAnimationFrame(drawOnCanvas);
        currentVideo.onplaying =  () => currentVideo.requestVideoFrameCallback(drawOnCanvas);

        currentVideo.addEventListener('timeupdate', updateCurrentTime);
        currentVideo.volume = volume;
        currentVideo.muted = isMuted;
        if(isPlaying && currentTime !== 0) {
            currentVideo.play();
        }
        return (() => {
            currentVideo.removeEventListener('playing', () => requestAnimationFrame(drawOnCanvas));
            currentVideo.removeEventListener('timeupdate', updateCurrentTime)

        });
    }, [currentVideo]);

    // TODO, used both here and in the child time component, maybe removed fromm there
    function formatTime(timeInSeconds) {
        const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

        return {
            minutes: result.substr(3, 2),
            seconds: result.substr(6, 2),
        };
    }

    //TODO may be eliminated from here, since it is in the child component
    function updateTimeElapsed() {
        const newTime = Math.round(currentVideo.currentTime + currentVideoObj.start);
        const time = formatTime(newTime);
        return `${time.minutes}:${time.seconds}`;
        // timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
        // console.log("updateTimeElapsed -> ", currentVideo.currentTime + currentVideoObj.start)
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

    // changed version

    function skipAhead(event) {
        const skipTo = event.target.dataset.seek
            ? event.target.dataset.seek
            : event.target.value;


        if(skipTo >= currentVideoObj.start && skipTo < currentVideoObj.end) {
            currentVideo.currentTime = skipTo - currentVideoObj.start;
        }
        setCurrentTime(skipTo);
    }

    const updateCurrentTime = () => {
        const newTime = currentVideo.currentTime + currentVideoObj.start;
        const newFrame = timeToFrame(newTime)

        if(newFrame !== currentFrame) {
            console.log("(currentVideo.currentTime + currentVideoObj.start - currentTime) >= _FRAMERATE)")
            setCurrentFrame(newFrame);
        }
        setCurrentTime(newTime);
    }

    const toggleMute = () => {
        if(isMuted) {
            if(volume === 0) {
                setVolume(1);
                currentVideo.volume = 1;
            } else {
                currentVideo.volume = volume;
            }
            setIsMuted(false);
            currentVideo.muted = false;
        } else {
            currentVideo.volume = 0;
            setIsMuted(true);
            currentVideo.muted = true;
        }
    }


    // todo check this, some issues
    const updateVolume = (e) => {
        if(isMuted) {
            if(volume == 0) {
                currentVideo.volume = 1;
                setVolume(1);
            } else {
                currentVideo.volume = e.target.value;
                setVolume(e.target.value);
            }
            setIsMuted(false);
            currentVideo.muted = false;
        } else if(e.target.value == 0) {
            setIsMuted(true);
            currentVideo.muted = true;
            setVolume(0);
            currentVideo.volume = 0;
        } else {
            setVolume(+e.target.value);
            currentVideo.volume =  e.target.value;
        }
    }

    const togglePlay = () => {
        if(isPlaying) {
            currentVideo.pause();
        } else {
            currentVideo.play();
        }
        setIsPlaying(!isPlaying);
    }

    const toggleFullScreen = () => {
        const videoContainer = videoContainerRef.current;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoContainer.requestFullscreen();
        }
    }

    const hideControls = () => {
        setAreControlsVisible(false);
    }

    const showControls = () => {
        setAreControlsVisible(true);
    }

    const drawOnCanvas = () => {

        if (currentVideo.paused) {
            return;
        }

        const canvas = canvasRef.current;
        let width = document.fullscreenElement ? window.innerWidth : 640; // not using isFullScreen because of closures
        let height = document.fullscreenElement ? window.innerHeight : 360;

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        let context = canvas.getContext('2d');
        context.drawImage(
            currentVideo,
            0,
            0,
            width,
            height
        );

        requestAnimationFrame(drawOnCanvas);
    }

    const timeToFrame = (time) => {
        let frame = Math.floor(time * _FPS);
        return frame;
    }

    const frameToTime = (frame) => {
        let time = Math.round(frame * _FRAMERATE);
        return time;
    }

    // console.log("CurrentFrame", currentFrame);
    // console.log("CurrentTime", currentTime);

    return (
        <div className="container">
            <div ref={videoContainerRef} /*onMouseLeave={hideControls} onMouseEnter={showControls} */ className="video-container" id="video-container">
                <div className="canvas-container">
                    <canvas ref={canvasRef} onClick={togglePlay} className="canvas" id="canvas"/>
                </div>

                <Controls
                    togglePlay={togglePlay}
                    isPlaying={isPlaying}
                    skipAhead={skipAhead}
                    updateVolume={updateVolume}
                    currentVolume={volume}
                    currentTime={currentTime}
                    toggleFullScreen={toggleFullScreen}
                    isFullScreen={isFullScreen}
                    toggleMute={toggleMute}
                    isMuted={isMuted}
                    areControlsVisible={areControlsVisible}
                    totalDuration={totalDuration}
                />
            </div>
        </div>
    )
}