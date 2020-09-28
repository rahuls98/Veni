import React, { useState, useEffect } from 'react'

const AVEM_Final_Cut = (props) => {
    const [source, setSource] = useState( props.location.state.source );
    const [audio,setAudio] = useState( props.location.state.audio )

    const playAudio = (id, delay) => {
        const audio = document.getElementById(id);
        setTimeout(() => {
            audio.play();
        }, (delay * 1000))
        return;
    }

    const playFinal = () => {
        Object.keys(audio).forEach(timestamp => playAudio(audio[timestamp].id, audio[timestamp].timestamp));
        console.log("List complete!");
    }

    useEffect(() => {
        console.log('source :>> ', source);
        console.log('audio :>> ', audio);
    })

    return (
        <div className="AVEM_Final_Cut_Container">
            <video id="finalCut" controls src={source} type="video/mp4" onPlay={() => playFinal()}></video>
            {
                Object.keys(audio).map(timestamp => {
                    return <audio id={audio[timestamp].id} src={audio[timestamp].filePath}></audio>
                })
            }
        </div>
    )
}

export default AVEM_Final_Cut;
