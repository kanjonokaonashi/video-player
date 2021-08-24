import {combineReducers} from "redux";
import videosReducer from '../pages/PlayerWithFrames/reducer';

export const rootReducer = combineReducers({
    videos: videosReducer
});