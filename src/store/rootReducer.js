import {combineReducers} from "redux";
import videosReducer from '../pages/VideoPlayer/reducer';

export const rootReducer = combineReducers({
    videos: videosReducer
});