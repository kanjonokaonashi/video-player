import {useEffect, useState} from "react";
import {Media} from "./Media";
import {useDispatch} from "react-redux";
import {getVideos} from "../../store/actions";
import {Player} from "./Player";

// use index js only for final exports
export const VideoPlayerWithFrames = (props) => {

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
}