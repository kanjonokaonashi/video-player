import {useEffect, useMemo, useRef, useState} from "react";
import {Controls} from "./components/Controls";

export const Player = (props) => {

    // data from props
    const {
        mediaObjects,
        mediaElements,
    } = props;

    const _FPS = 24;

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
        return Math.max(...mediaObjects.map((obj) => obj.end));
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
            setCurrentVideoObj(firstMedia);
            setCurrentFrame(0);
            // togglePlay();

            setIsPlaying(false);
            // togglePlay().then(r => r);
        } else if(currentFrame >= currentVideoObj.end || currentFrame < currentVideoObj.start) {
            pauseVideo().then(r => r);
            console.log("new video")
            const newMedia = mediaObjects.find(obj => (obj.start <= currentFrame + 1) && (obj.end > currentFrame));
            let video = mediaElements[newMedia.id];
            setCurrentVideo(video);
            setCurrentVideoObj(newMedia);
        }
    }, [currentFrame]);

    useEffect(() => {
        // console.dir(currentVideo)
        currentVideo.currentTime = frameToTime(currentFrame - currentVideoObj.start + 1);

        currentVideo.volume = volume;
        currentVideo.muted = isMuted;

        currentVideo.onplaying = () => currentVideo.requestVideoFrameCallback(drawOnCanvas);


        if(isPlaying) {
            let playPromise = currentVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(v => v)
                    .catch(error => {
                        console.log(error)
                        currentVideo.requestVideoFrameCallback(drawOnCanvas)
                    });
            }
        } else if(currentVideo.paused) {
            currentVideo.requestVideoFrameCallback(drawOnCanvas);
        }
        return (() => {
            currentVideo.removeEventListener('playing', () => currentVideo.requestVideoFrameCallback(drawOnCanvas));
            currentVideo.removeEventListener('loadeddata', requestRender);
        });
    }, [currentVideo]);

    async function playVideo() {
        try {
            await currentVideo.play();
        } catch(err) {
            console.log("an error occurred, ", err)
        }
    }

    async function pauseVideo() {
        try {
            await currentVideo.pause();
        } catch(err) {
            console.log("an error occurred, ", err)
        }
    }

    const drawOnCanvas = (now, metadata) => {

        const canvas = canvasRef.current;
        let width = document.fullscreenElement ? window.innerWidth : 640; // not using isFullScreen because of closures
        let height = document.fullscreenElement ? window.innerHeight : 360;

        // let frameOffset = -2 // must be determined from seeing what const frames = Math.round(metadata.mediaTime  * fps) equals to at time = 0.
        let currFrame = timeToFrame(metadata.mediaTime) + currentVideoObj.start + 1; // TODO it was +1 before

        // if(currentVideoObj.start !== 0) {
        //     currFrame -= 1;
        // }

        console.log("metadata.mediaTime)", metadata.mediaTime)

        // console.log("current frame", currFrame)

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

        setCurrentFrame(currFrame);

        currentVideo.requestVideoFrameCallback(drawOnCanvas);
    }

    // todo if ready then draw the one and only frame
    // for every frame call the draw only once, but in
    // case of a frame change, repeat, so this should be a loop
    const requestRender = () => {

        if(currentVideo.readyState >= 2) {
            currentVideo.requestVideoFrameCallback(drawOnCanvas);
        } else {
            requestRender();
        }
    }

    function skipAhead(event) {
        const skipTo = event.nativeEvent.target.dataset.seek
            ? event.nativeEvent.target.dataset.seek
            : event.nativeEvent.target.value;


        if(skipTo >= currentVideoObj.start && skipTo < currentVideoObj.end) {
            currentVideo.currentTime = frameToTime(skipTo - currentVideoObj.start);
        }

        console.log('skipTo', skipTo)

        setCurrentFrame(skipTo);
    }

    // todo check this, some issues
    const togglePlay = async () => {
        if (isPlaying) {
            await pauseVideo().then(r => r);
        } else {
            await playVideo().then(r => r);
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
        let hours = Math.floor(currentFrame / (60 * 60 * _FPS));
        let minutes = (Math.floor(currentFrame / (60 * _FPS))) % 60;
        let seconds = (Math.floor(currentFrame / _FPS)) % 60;
        let frames = currentFrame % _FPS;

        return {
            hours,
            minutes,
            seconds,
            frames
        }
    }

    console.log(currentFrame)
    console.log("current video current time", currentVideo.currentTime)
    // console.log(updateTimeElapsed());

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
                    currentTime={updateTimeElapsed()}
                />
            </div>
            <div className="playback-container">
                <div className="playback-video-divs">
                    {
                        mediaObjects.map(obj => {
                            let divWidth = ((obj.end - obj.start + 1) / (totalFrames + 1));
                            return <div className="video-duration-div" style={{width: (divWidth * 100) + "%"}} key={obj.id}/>;
                        })
                    }
                </div>
                <div className="playback-progress" style={{left: ((currentFrame + 1) / (totalFrames + 1)) * 100 + '%' }}/>
            </div>

            <div className="canvas-playback-container">
                <div className="playback-video-divs">
                    {
                        mediaObjects.map(obj => {
                            let canvasWidth = ((obj.end - obj.start + 1) / (totalFrames + 1));
                            return <canvas className="video-duration-div" style={{width: (canvasWidth * 100) + "%"}} key={obj.id}/>;
                        })
                    }
                </div>
            </div>
        </div>
    )
}