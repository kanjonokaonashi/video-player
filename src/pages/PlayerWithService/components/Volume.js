import {VolumeButton} from "./VolumeButton";
import {Input} from "./Input";

export const Volume = (props) => {

    const {
        updateVolume,
        currentVolume,
        toggleMute,
        isMuted
    } = props;

     return (
         <div className="volume-controls">
             <VolumeButton toggleMute={toggleMute} isMuted={isMuted} currentVolume={currentVolume}/>

             <Input onInput={updateVolume} value={currentVolume} className="volume" id="volume" max="1" step="0.01"/>
         </div>
     )
}