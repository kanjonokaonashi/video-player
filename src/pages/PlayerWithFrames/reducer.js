import {GET_VIDEOS} from "../../store/actionsConstants";

// initial state

const initialState = {
    data: [
        {
            name: 'Big Buck Bunny',
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            id: 5053,
            start: 0,
            end: 14050,
            frames: 14051
        },
        {
            name: "GOT",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            id: 3552,
            start: 14051,
            end: 14411,
            frames: 361,
        },
        {
            name: "TearsOfSteel",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            id: 9465,
            start: 14412,
            end: 15443,
            frames: 1032,
        },
        {
            name: "Monster",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            id: 9538,
            start: 15444,
            end: 15804,
            frames: 361,
        },
        {
            name: "Cars",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            id: 2799,
            start: 15805,
            end: 16165,
            frames: 361,
        },
        {
            name: "BatMan",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            id: 7326,
            start: 16166,
            end: 16526,
            frames: 361,
        },
        {
            name: "Bullrun",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            id: 7335,
            start: 16527,
            end: 17665,
            frames: 1139,
        },
    ],
}


// const initialState = {
//     data: [
//         {
//             name: "GOT",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//             id: 3552,
//             start: 0,
//             end: 360,
//         },
//         {
//             name: "Monster",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
//             id: 9538,
//             start: 361,
//             end: 722,
//         },
//         {
//             name: "Cars",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
//             id: 2799,
//             start: 723,
//             end: 1083,
//         },
//         {
//             name: "BatMan",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//             id: 7326,
//             start: 1083,
//             end: 1444
//         },
//     ],
// }

// const initialState = {
//     data: [
//         {
//             name: "GOT",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//             id: 3552,
//             start: 0,
//             end: 360,
//             frames: 361,
//         },
//         {
//             name: "Monster",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
//             id: 9538,
//             start: 361,
//             end: 721,
//             frames: 361
//         },
//         {
//             name: "Bullrun",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
//             id: 7335,
//             start: 722,
//             end: 1860,
//             frames: 1139,
//         },
//         {
//             name: "Cars",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
//             id: 2799,
//             start: 1861,
//             end: 2221,
//             frames: 361
//         },
//         {
//             name: "BatMan",
//             source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//             id: 7424,
//             start: 2222,
//             end: 2582,
//             frames: 361,
//         },
//     ],
// }

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_VIDEOS:
            return state;
        default: return state;
    }
}

export default reducer;

