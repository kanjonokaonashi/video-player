import {GET_VIDEOS} from "../../store/actionsConstants";

// initial state
const initialState = {
    data: [
       /* {
            name: 'Big Buck Bunny',
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            id: 5053,
            start: 0,
            end: 596,
        },*/
        {
            name: "GOT",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            id: 3552,
            start: 0,
            end: 15.023311,
        },
        {
            name: "Cars",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            id: 9465,
            start: 15.023311,
            end: 609.59347,
        },
        {
            name: "Monster",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            id: 9538,
            start: 609.59347,
            end: 624.640001,
        },
        /*{
            name: "Cars",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            id: 2799,
            start: 30.069842,
            end: 45.116373,
        },*/
        {
            name: "BatMan",
            source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            id: 7326,
            start: 624.640001,
            end: 639.686532,
        }
    ],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_VIDEOS:
            return state;
        default: return state;
    }
}

export default reducer;

