import {useEffect} from "react";

// todo the same thing with the custom hook

export const Media = (props) => {

    let {data, getMediaItemsObj} = props;

    useEffect(() => {
        const mediaArray  = data.map(item => {
            let mediaItem = document.createElement('video');
            mediaItem.key = item.id;
            mediaItem.crossOrigin = 'anonymous';
            mediaItem.src = item.source;
            mediaItem.load();
            return ({ [item.id]: mediaItem });
        });
        let mediaObject = Object.assign({}, ...mediaArray );
        getMediaItemsObj(mediaObject);
    }, [data]);
    return null;
};

//     mediaItem.src = 'http://videos-fms.jwpsrv.com/0_61112a7b_0x0b8a8879a3d4e4ce750ec7633f09db1aca98f6ad/content/conversions/q5LYEpNm/videos/cNs1NN0L-32479298.mp4';

// export const useMedia = (props) => {
//
//     let {data, type} = props;
//
//     const [mediaObject, setMediaObject] = useState({});
//
//     console.log("the data is ", data);
//
//     useEffect(() => {
//         function setInTheState(mediaObject) {
//             setMediaObject(mediaObject)
//         }
//         const mediaArray  = data.map(item => {
//             let mediaItem = document.createElement(type);
//             mediaItem.src = item.source;
//             mediaItem.key = item.id;
//             return ({ [item.id]: mediaItem });
//         });
//         let mediaObj = Object.assign({}, ...mediaArray );
//         return () => {setInTheState(mediaObj)
//         }
//     }, [data]);
//
//     console.log(mediaObject);
//     return mediaObject;
// };


