import {useEffect, useMemo, useRef, useState} from "react";
import {VideoControlService} from "./VideoControlService";
import {Controls} from "./components/Controls";


export const Player = (props) => {

    const videoObjectsArr = props.videoObjectsArr;

    const VideoService = useMemo(() => {
        return new VideoControlService(videoObjectsArr);
    }, [videoObjectsArr]);

    const [currentTime, setCurrentTime] = useState(VideoService._currentTime);

    const [isPlaying, setIsPlaying] = useState(false);

    const [volume, setVolume] = useState(1);

    const [isMuted, setIsMuted] = useState(false);

    const [isFullScreen, setIsFullScreen] = useState(false);

    const [areControlsVisible, setAreControlsVisible] = useState(true);
    const [currentFrame, setCurrentFrame] = useState(0);

    const canvasRef = useRef(null);
    const videoContainerRef = useRef(null);

    useEffect(() => {
        const videoContainer = videoContainerRef.current;
        videoContainer.addEventListener('fullscreenchange', () => {setIsFullScreen(!isFullScreen);});
        VideoService.currentVideo.requestVideoFrameCallback(drawOnCanvas);
    })

    // function startDrawing() {
    //     var video = document.querySelector('video');
    //     var canvas = document.querySelector('canvas');
    //     var ctx = canvas.getContext('2d');
    //
    //     var paint_count = 0;
    //     var start_time = 0.0;
    //
    //     var updateCanvas = function(now) {
    //         if(start_time == 0.0)
    //             start_time = now;
    //
    //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //
    //         var elapsed = (now - start_time) / 1000.0;
    //         var fps = (++paint_count / elapsed).toFixed(3);
    //         document.querySelector('#fps_text').innerText = 'video fps: ' + fps;
    //
    //         video.requestVideoFrameCallback(updateCanvas);
    //     }
    //
    //     video.requestVideoFrameCallback(updateCanvas);
    //
    //     video.src = "http://example.com/foo.webm"
    //     video.play()
    // }

    const drawOnCanvas = () => {

        if(currentTime != VideoService._currentTime) {
            setCurrentTime(VideoService._currentTime)
        }
        const canvas = canvasRef.current;
        let width = isFullScreen ? window.innerWidth : 640;
        let height = isFullScreen ? window.innerHeight : 360;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        let context = canvas.getContext('2d');
        context.drawImage(
            VideoService._currentVideo,
            0,
            0,
            width,
            height
        );

        // requestAnimationFrame(drawOnCanvas);
        VideoService.currentVideo.requestVideoFrameCallback(drawOnCanvas);

    }

    const togglePlay = () => {
        if(VideoService.isPlaying) {
            VideoService.pauseCurrentVideo();
        } else {
            VideoService.playCurrentVideo();
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

    const toggleMute = () => {
        if(isMuted) {
            VideoService._volume = volume;
        } else {
            VideoService._volume = 0;
        }
        setIsMuted(!isMuted);
    }


    // todo check this, some issues
    const updateVolume = (e) => {
        if (isMuted) {
            setIsMuted(false);
            VideoService._volume = volume;
            if(volume === 0) {
                setVolume(1);
            }
        } else if (e.target.value == 0) {
            setIsMuted(true);
            VideoService._volume = 0;
        } else {
            setVolume(e.target.value);
        }
    }


    // update service currentTime based on the progress bar click
    const skipAhead = (event) => {
        const skipTo = event.target.dataset.seek
            ? event.target.dataset.seek
            : event.target.value;

        VideoService._currentTime = skipTo;
    }

    const hideControls = () => {
        setAreControlsVisible(false);
    }

    const showControls = () => {
        setAreControlsVisible(true);
    }

    // pass all appropriate
    return (
        <div className="container">
            <div ref={videoContainerRef}  onMouseLeave={hideControls} onMouseEnter={showControls} className="video-container" id="video-container">
                <div onClick={togglePlay} className="canvas-container">
                    <canvas ref={canvasRef} className="canvas" id="canvas"/>
                </div>

                <Controls
                    VideoService={VideoService}
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
                    totalDuration={VideoService._totalDuration}
                />
            </div>
        </div>
    )
}

