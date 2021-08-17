import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getVideos} from "../../store/actions";
import {Player} from "./Player";

// use index js only for final exports
export const VideoPlayer = (props) => {

    const dispatch = useDispatch();

    const videoObjectsArr = props.state.videos.data;

    useEffect(() => {
        dispatch(getVideos());
    }, [dispatch]);

    return (
        <div>
            {videoObjectsArr !== null ?
                <Player videoObjectsArr={videoObjectsArr}/> :
                <div></div>
            }
        </div>
    );
}