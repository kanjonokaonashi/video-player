export class VideoControlService {

    videoObjectsArr = null;
    videoElementsObj = null;
    currentVideo = null;
    currentVideoObj = null;
    currentTime = 0;
    isPlaying = false;
    isMuted = false;
    volume = 1;
    totalDuration = 0;

    constructor(videoObjectsArr) {
        this.videoObjectsArr = videoObjectsArr;
        this.#setVideoElementsObj(videoObjectsArr);
        this.#setTotalDuration();
        this.#setCurrentVideo();
        // console.dir(this.totalDuration);
    }

    // private
    #setVideoElementsObj = (videoObjectsArr) => {
        const videoElementsArray  = videoObjectsArr.map(item => {
            let videoElement = document.createElement('video');
            videoElement.key = item.id;
            videoElement.crossOrigin = 'anonymous';
            videoElement.src = item.source;
            videoElement.load();
            return ({ [item.id]: videoElement });
        });
        this.videoElementsObj = Object.assign({}, ...videoElementsArray);
    }

    // private
    #setTotalDuration = () => {
        this.totalDuration = Math.max(...this.videoObjectsArr.map((obj) => obj.end));

    }

    // public
    get _totalDuration() {
        return this.totalDuration;
    }

    // private
    #updateCurrentTime = () => {
        this.currentTime = this.currentVideo.currentTime + this.currentVideoObj.start;
    }

    //private
    #setCurrentVideo = () => {
        const newVideo = this.videoObjectsArr.find(obj => (obj.start <= this.currentTime) && (obj.end > this.currentTime));
        this.currentVideoObj = newVideo;
        this.currentVideo = this.videoElementsObj[newVideo.id];
        this.addCurrentVideoListeners();
    }

    // public
    get _currentVideo() {
        return this.currentVideo;
    }

    // public
    set _currentTime(newTime) {
        if(newTime >= this.currentVideoObj.start && newTime < this.currentVideoObj.end) {
            this.currentVideo.currentTime = newTime - this.currentVideoObj.start;
        } else {
            this.currentVideo.pause();
            this.#setCurrentVideo(); // may be autostart here too, or in the function
        }
    }

    // public
    get _currentTime() {
        return this.currentTime + this.currentVideoObj.start;
    }

    // public
    set _volume(newVolume) {
        this.currentVideo.volume = newVolume;
    }

    // public
    get _volume() {
        return this.volume;
    }

    // private
    addCurrentVideoListeners() {
        if(this.currentVideo) {
            this.currentVideo.currentTime = this.currentTime - this.currentVideoObj.start;
            this.currentVideo.onplay = () => this.isPlaying = true;
            this.currentVideo.onpause = () => this.isPlaying = false;
            this.currentVideo.addEventListener('timeupdate', this.#updateCurrentTime)
            this.currentVideo.onvolumechange = () => this.volume = this.currentVideo.volume;
        }
    }

    // public
    playCurrentVideo = () => {
        if(this.currentVideo) {
            this.currentVideo.play();
        }
    }

    // public
    pauseCurrentVideo = () => {
        if(this.currentVideo) {
            this.currentVideo.pause();
        }
    }


    // video manipulation methods



}