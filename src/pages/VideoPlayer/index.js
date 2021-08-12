import {useEffect, useState} from "react";
import {Media} from "./Media";
import {useDispatch} from "react-redux";
import {getVideos} from "./actions";
import {Player} from "./Player";

// use index js only for final exports
export const VideoCanvas = (props) => {

    const dispatch = useDispatch();

    const [videos, setVideos] = useState(null);

    useEffect(() => {
        dispatch(getVideos());
    }, [dispatch]);

    function getMediaItemsObj(videosObj) {
        setVideos(videosObj);
    }

    return (
        <div>
            <Media data={props.state.videos.data} type="video" getMediaItemsObj={getMediaItemsObj} />
            {videos !== null ?
                <Player mediaElements={videos} mediaObjects={props.state.videos.data}/> :
                <div></div>
            }
        </div>
    );













    //
    // console.log(videos);
    //
    // let video1 = document.createElement("video");
    // video1.src = "https://www.youtube.com/watch?v=K0D1iAQqZtg";
    // video1.onplay = () => updateCanvas();
    //
    // let video2 = document.createElement("video");
    // video2.src = firstVideoSource;
    // video2.onplay = () => updateCanvas();
    //
    // // const Media = {
    // //     hasNextOneStarted: false,
    // //     video1,
    // //     video2,
    // // }
    //
    // const times = [];
    // let fps;
    //
    // const canvasRef = useRef(null);
    // // const videoRef = useRef(null);
    // /*const buttonRef = useRef(null);
    // const progressRef = useRef(null);
    // const currentTimeRef = useRef(null);*/
    //
    // /*function updateProgress(e) {
    //
    //     // let video = videoRef.current;
    //     let currentTime = currentTimeRef.current;
    //     progressRef.current.style.width = `${video1.currentTime/video1.duration*100}%`;
    //     currentTime.innerHTML = `${neatTime(video1.currentTime)} / ${neatTime(video1.duration)}`;
    //     // textTotal.innerHTML = neatTime(video.duration);
    //     // console.log(progressRef.current.style.width);
    // }
    //
    // function setProgress(e) {
    //     // let video = videoRef.current;
    //     let progress = progressRef.current;
    //     const newTime = e.offsetX/progress.offsetWidth;
    //     progressRef.current.style.width = `${newTime*100}%`;
    //     video1.currentTime = newTime*video1.duration;
    // }*/
    //
    //
    // async function playOnClick() {
    //     // let video = videoRef.current;
    //
    //     console.log(video1.duration + " video 1 duration");
    //     console.log(video2.duration + " video 2 duration");
    //
    //     if (Media.video1.paused) {
    //         await playVideo(Media.video1);
    //     } else {
    //         Media.video1.pause();
    //     }
    //     // buttonRef.current.classList.toggle('paused');
    // }
    //
    // async function playVideo(video) {
    //     try {
    //         // console.log("playyy")
    //         // console.log(video);
    //         await video.play();
    //     } catch {
    //         console.log("error")
    //     }
    // }
    //
    // async function playVideo2OnEnd() {
    //     // let video = videoRef.current;
    //     Media.has2ndStarted = true;
    //     await playVideo2(Media.video2);
    //     // if (video2.paused) {
    //     //     console.log("from play video, video2 is paused")
    //     //     await playVideo2(video2);
    //     // } else {
    //     //     console.log("pausing video 2")
    //     //     video2.pause();
    //     // }
    //     // buttonRef.current.classList.toggle('paused');
    // }
    //
    // async function playVideo2(video) {
    //     try {
    //         // console.log(Media.video2);
    //         await Media.video2.play();
    //     } catch {
    //         console.log("error")
    //     }
    // }
    //
    // function neatTime(time) {
    //     // var hours = Math.floor((time % 86400)/3600)
    //     let minutes = Math.floor((time % 3600) / 60);
    //     let seconds = Math.floor(time % 60);
    //     seconds = seconds > 9 ? seconds : `0${seconds}`;
    //     return `${minutes}:${seconds}`;
    // }
    //
    // async function updateCanvas() {
    //
    //     // console.log("video1.defaultPlaybackRate -> ", Media.video1.defaultPlaybackRate);
    //     // const video = videoRef.current;
    //     if ((Media.video2.paused && Media.video1.ended && Media.has2ndStarted) || Media.video2.ended) {
    //         // console.log("(video2.paused && video1.ended && has2ndStarted) || video2.ended")
    //         // console.log("video 2 paused -> ", Media.video2.paused);
    //         // console.log("video 2 ended -> ", Media.video2.ended);
    //         // console.log("video 1 ended -> ", Media.video1.ended);
    //         // console.log("has2ndStarted -> ", Media.has2ndStarted);
    //         return;
    //     } else if (Media.video1.ended) {
    //         // console.log("video 1 ended, draw 2 ");
    //         await playVideo2OnEnd().then(r => r);
    //         drawCanvas(Media.video2);
    //         refreshLoop();
    //         console.log(fps);
    //     } else if (Media.video1.paused) {
    //         // console.log("video 1 paused");
    //         return;
    //     } else {
    //         // console.log("draw video 1")
    //         drawCanvas(Media.video1);
    //         refreshLoop();
    //         console.log(fps);
    //     }
    //
    //     requestAnimationFrame(updateCanvas);
    // }
    //
    // function refreshLoop() {
    //     requestAnimationFrame(() => {
    //         const now = performance.now();
    //         while (times.length > 0 && times[0] <= now - 1000) {
    //             times.shift();
    //         }
    //         times.push(now);
    //         fps = times.length;
    //         refreshLoop();
    //     });
    // }
    //
    // function drawCanvas(video) {
    //     let context = canvasRef.current.getContext('2d');
    //     context.drawImage(
    //         video,
    //         0,
    //         0,
    //         600,
    //         338
    //     );
    // }
    //
    // return (
    //     <div>
    //         <Media state={props.state} type="video" getMediaItemsArr={getMediaItemsArr}/>
    //     </div>
    // )

//     return (
//         <div>
//             <div className='player-container'>
//                 <div className='player'>
//                     <canvas ref={canvasRef}
//                             id="video-canvas"
//                             width="600"
//                             height="338"></canvas>
//                     <div className='play-btn-start'></div>
//                     <div className='controls'>
//                         <div className='left-controls'>
//                             <div /*ref={buttonRef}*/ className='play-btn paused' onClick={playOnClick}></div>
//                             <div className="time">
//                                 <span /*ref={currentTimeRef}*/ className="time-current">00</span>
//                                 <span> / </span>
//                                 <span className="time-total">00</span>
//                             </div>
//                         </div>
//                         <div className='progress-control'>
//                             <div className='progress'>
//                                 <div /*ref={progressRef}*/ className='progress-filled'></div>
//                             </div>
//                         </div>
//                     </div>
//                     {/*<video ref={videoRef}*/}
//                     {/*       id='video'*/}
//                     {/*       src={firstVideoSource}*/}
//                     {/*       width="600"*/}
//                     {/*       height="338"*/}
//                     {/*       controls="true"*/}
//                     {/*       onPlay={() => requestAnimationFrame(updateCanvas)}*/}
//                     {/*       crossOrigin playsInline preload="auto">*/}
//                     {/*</video>*/}
//                 </div>
//             </div>
//         </div>
//     )
// }

}
// export const VideoCanvas = (props) => {
//
//     let video1 = document.createElement("video");
//     video1.src = firstVideoSource;
//
//     let video2 = document.createElement("video");
//     video2.src = secondVideoSource;
//
//
//     const Media = {
//         video1,
//         video2,
//     }
//
//     // console.log(Media.video1.duration);
//
//     video1.onloadedmetadata = function() {
//         console.log('metadata loaded!');
//         console.log(this.paused);//this refers to myVideo
//     };
//     // console.log(Media.video2);
//
// }

//
// return (
//     <div>
//         <h1>Video to Canvas stream</h1>
//         <div id="original-player">
//             <video
//                 ref={videoRef}
//                 width="600"
//                 height="338"
//                 id="videooo"
//                 data-poster-time="10"
//                 controls={true}
//                 onPlay={() => requestAnimationFrame(updateCanvas)}
//             >
//                 <source src={firstVideoSource} type="video/mp4"/>
//             </video>
//         </div>
//         <div>
//             <canvas ref={canvasRef} id="canvas" width="600" height="338" />
//         </div>
//         <div>
//                      <div className='player-container'>
//                          <div className='player'>
//                              <canvas ref={canvasRef}
//                                     id="video-canvas"
//                                     width="600"
//                                     height="338"></canvas>
//                             <div className='play-btn-start'></div>
//                             <div className='controls'>
//                                 <div className='left-controls'>
//                                     <div className='play-btn paused'></div>
//                                 </div>
//                                 <div className='progress-control'>
//                                     <div className='progress'>
//                                         <div className='progress-filled'></div>
//                                     </div>
//                                 </div>
//                                 {/*<div className='controls-main'>*/}
//                                 {/*    <div className='play-btn paused'></div>*/}
//                                 {/*</div>*/}
//                             </div>
//                             <video ref={videoRef}
//                                    id='video'
//                                    src={firstVideoSource}
//                                    width="600"
//                                    height="338"
//                                    controls="true"
//                                    onPlay={() => requestAnimationFrame(updateCanvas)}
//                                    crossOrigin playsInline preload="auto">
//                             </video>
//                         </div>
//                     </div>
//                 </div>
//     </div>
// )