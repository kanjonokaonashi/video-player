import './App.css';
import {useSelector} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {VideoCanvas} from "./pages/VideoPlayer";
import {VideoPlayer} from "./pages/PlayerWithService/index";
import {VideoPlayerWithFrames} from "./pages/PlayerWithFrames/index";
import Navigation from "./pages/Navigation";

const App = () => {

    const state = useSelector(state => state);

    return (

        <Router>
            <div className="App">
                <Navigation />
                <Switch>
                    <Route exact path="/" render={() => <div>Homepage</div>} />
                    <Route exact path="/video_player" render={() => <VideoCanvas state={state}/>}/>
                    <Route exact path="/player" render={() => <VideoPlayer state={state}/>}/>
                    <Route exact path="/player_with_frames" render={() => <VideoPlayerWithFrames state={state}/>}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
