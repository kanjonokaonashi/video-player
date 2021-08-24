import {useEffect, useMemo, useRef, useState} from "react";
import {Controls} from "./components/Controls";

export const Player = (props) => {

    // data from props
    const {
        mediaObjects,
        mediaElements,
    } = props;

    const _FPS = 24;
    const _FRAMERATE = 0.042;

    const timeToFrame = (time) => { // use callback
        let frame = Math.round(time * _FPS);
        return frame;
    }

    const frameToTime = (frame) => {
        let time = Math.round(frame / _FPS);
        return time;
    }

    const firstMedia = useMemo(() => {
        return mediaObjects.find(obj => obj.start === 0);
    }, [mediaObjects]);

    const totalFrames = useMemo(() => {
        const totalDuration = Math.max(...mediaObjects.map((obj) => obj.end));
        return timeToFrame(totalDuration);
    }, [mediaObjects]);

    // state
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

    useEffect(() => {
        const videoContainer = videoContainerRef.current;
        videoContainer.addEventListener('fullscreenchange', () => {setIsFullScreen(!isFullScreen);});
    });

    useEffect(() => {
        if(currentFrame >= totalFrames) {
            setCurrentVideo(mediaElements[firstMedia.id]);
            setCurrentVideoObj(firstMedia)
            togglePlay();
        } else if((currentFrame >= timeToFrame(currentVideoObj.end)) || currentFrame < timeToFrame(currentVideoObj.start)) {
            currentVideo.pause();
            let currentTime = frameToTime(currentFrame);

            const newMedia = mediaObjects.find(obj => (obj.start <= currentTime) && (obj.end > currentTime));
            let video = mediaElements[newMedia.id];
            setCurrentVideo(video);
            setCurrentVideoObj(newMedia);
        }
    }, [currentFrame]);

    useEffect(() => {
        currentVideo.currentTime = frameToTime(currentFrame) - currentVideoObj.start;

        currentVideo.volume = volume;
        currentVideo.muted = isMuted;

        currentVideo.onplaying = () => currentVideo.requestVideoFrameCallback(drawOnCanvas);
        if(isPlaying) {
            currentVideo.play();
        } else {
            currentVideo.addEventListener('loadeddata', requestRender);
        }
        return (() => {
            currentVideo.removeEventListener('playing', () => currentVideo.requestVideoFrameCallback(drawOnCanvas));
        });
    }, [currentVideo]);

    const drawOnCanvas = (now, metadata) => {

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

        if(!currentVideo.paused) {
            // console.log("from draw canvas currentVideo.requestVideoFrameCallback(drawOnCanvas),");
            // console.dir(currentVideo)
            let currFrame = Math.ceil(timeToFrame(metadata.mediaTime) + timeToFrame(currentVideoObj.start)) + 1 ;
            // console.log("currFrame is ", timeToFrame(currentVideoObj.start));
            // console.log("timeToFrame(metadata.mediaTime) ", timeToFrame(metadata.mediaTime))
            context.drawImage(
                currentVideo,
                0,
                0,
                width,
                height
            );
            setCurrentFrame(currFrame)
        }

        console.log("in the draw canvas , currentVideo.currentTime -> ", currentVideo.currentTime, ", currentVideo.readyState -> ", currentVideo.readyState);


        // let frameOffset = -2 // must be determined from seeing what const frames = Math.round(metadata.mediaTime  * fps) equals to at time = 0.


        currentVideo.requestVideoFrameCallback(drawOnCanvas);
    }

    // todo if ready then draw the one and only frame
    // for every frame call the draw only once, but in
    // case of a frame change, repeat, so this should be a loop
    const requestRender = () => {
        if(currentVideo.readyState >= 2) {
            // console.log(currentVideo.requestVideoFrameCallback(drawOnCanvas));
            // currentVideo.requestVideoFrameCallback(drawOnCanvas);
            drawOnCanvas()
            // drawOnCanvas()
        } else {
            requestRender();
        }
    }

    function skipAhead(event) {
        const skipTo = event.target.dataset.seek
            ? event.target.dataset.seek
            : event.target.value;


        console.log("skipTo is ", skipTo);
        //
        // let currentFrameInterval = frameTimeInterval(skipTo);
        //
        // console.log("currentFrameInterval is ", currentFrameInterval)
        //
        //
        // if(skipTo >= timeToFrame(currentVideoObj.start) && skipTo < timeToFrame(currentVideoObj.end)) {
        //     // console.log("video was skipped ", frameToTime(skipTo) - currentVideoObj.start)
        //     currentVideo.currentTime = currentFrameInterval.start - currentVideoObj.start;
        //
        //     // console.log("currentVideo.currentTime from skip to  -> ", currentVideo.currentTime);
        //     // console.log(" skip to  -> ", skipTo);
        // }

        if(skipTo >= timeToFrame(currentVideoObj.start) && skipTo < timeToFrame(currentVideoObj.end)) {
            // console.log("video was skipped ", frameToTime(skipTo) - currentVideoObj.start)
            currentVideo.currentTime = skipTo - currentVideoObj.start;

            // console.log("currentVideo.currentTime from skip to  -> ", currentVideo.currentTime);
            // console.log(" skip to  -> ", skipTo);
        }

        setCurrentFrame(skipTo);
        // do{
        //     requestRender();
        // } while(currentVideo.readyState < 2)
        // currentVideo.play();
    }

    // todo check this, some issues
    const togglePlay = () => {
        if(isPlaying) {
            currentVideo.pause();
        } else {
            currentVideo.play();
        }
        setIsPlaying(!isPlaying);
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
                    toggleFullScreen={toggleFullScreen}
                    isFullScreen={isFullScreen}
                    toggleMute={toggleMute}
                    isMuted={isMuted}
                    areControlsVisible={areControlsVisible}
                    currentFrame={currentFrame}
                    totalFrames={totalFrames}
                />
            </div>
            <div className="playback-container">
                <div className="playback-video-divs">

                </div>
                <div className="playback-progress"></div>
            </div>
        </div>
    )
}