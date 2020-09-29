import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const AVEM_Final_Cut = (props) => {
    const { state } = useLocation();
    console.log('state :>> ', state);
    const history = useHistory();
    const { source, audio } = {...state};

    const playAudio = (id, delay) => {
        const audio = document.getElementById(id);
        setTimeout(() => {
            audio.play();
        }, (delay * 1000))
        return;
    }

    const playFinal = () => {
        Object.keys(audio).forEach(timestamp => playAudio(audio[timestamp].id, audio[timestamp].timestamp));
    }

    return (
        <div className="AVEM_Final_Cut_Container">
            <div>
            <video id="finalCut" controls src={source} type="video/mp4" onPlay={() => playFinal()}></video>
            {
                Object.keys(audio).map(timestamp => {
                    return ( <audio id={audio[timestamp].id} 
                                    src={audio[timestamp].filePath}
                                    key={timestamp}
                            ></audio> )
                })
            }
            <br />
            <button className="primary-btn" onClick={e => history.goBack()}>Back</button>
            </div>
        </div>
    )
}

export default AVEM_Final_Cut;
