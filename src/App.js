import './App.css';
import {VideoCanvas} from "./pages/VideoPlayer";
import {useSelector} from "react-redux";


const App = () => {

    const state = useSelector(state => state);

    return (
        <div className="App">
            <VideoCanvas state={state} />
        </div>
    );
}

export default App;
