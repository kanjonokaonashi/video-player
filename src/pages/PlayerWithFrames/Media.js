import {createElement, useEffect} from "react";

// todo the same thing with the custom hook

export const Media = (props) => {

    let {data, getMediaItemsObj} = props;

    useEffect(() => {
        const videoArray  = data.map(item => {
            let videoItem = document.createElement('video');
            let videoSource = document.createElement('source');
            videoSource.src = item.source;
            videoItem.key = item.id;
            videoItem.crossOrigin = "";
            videoItem.preload = "auto";
            // videoItem.src = item.source;
            videoItem.appendChild(videoSource);
            videoItem.load();
            return ({ [item.id]: videoItem });
        });
        let videoObject = Object.assign({}, ...videoArray );
        getMediaItemsObj(videoObject);
    }, [data]);
    return null;
};

//     videoItem.src = 'http://videos-fms.jwpsrv.com/0_61112a7b_0x0b8a8879a3d4e4ce750ec7633f09db1aca98f6ad/content/conversions/q5LYEpNm/videos/cNs1NN0L-32479298.mp4';

// export const useMedia = (props) => {
//
//     let {data, type} = props;
//
//     const [videoObject, setMediaObject] = useState({});
//
//     console.log("the data is ", data);
//
//     useEffect(() => {
//         function setInTheState(videoObject) {
//             setMediaObject(videoObject)
//         }
//         const videoArray  = data.map(item => {
//             let videoItem = document.createElement(type);
//             videoItem.src = item.source;
//             videoItem.key = item.id;
//             return ({ [item.id]: videoItem });
//         });
//         let videoObj = Object.assign({}, ...videoArray );
//         return () => {setInTheState(videoObj)
//         }
//     }, [data]);
//
//     console.log(videoObject);
//     return videoObject;
// };


