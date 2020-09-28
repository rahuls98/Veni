import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AVEM_Event_List from './AVEM_Event_List';

const AVEM_Event_Selection = ( props ) => {
    const [videoMetadata, setVideoMetadata] = useState({
        filename: undefined,
        source: undefined,
        duration: undefined,
        video: undefined,
        audio: {},
        events: {}
    });
    const [timestamp, setTimestamp] = useState(0);
    const [viewForm, setViewForm] = useState(false);
    const [event, setEvent] = useState("");
    const [events, setEvents] = useState({});

    const handleVideoMetadata = (e) => {
        const metadata = { ...videoMetadata };
        metadata.filename = props.location.state.fileName;
        metadata.source = props.location.state.filePath;
        metadata.duration = e.target.duration;
        metadata.video = e.target;
        setVideoMetadata(metadata);
    }

    const handleViewForm = (e) => {
        e.preventDefault();
        if(!viewForm) {
            videoMetadata.video.pause();
            const timestamp = videoMetadata.video.currentTime;
            setTimestamp(timestamp);
            setViewForm(!viewForm);
        } else {
            setEvent("");
            setViewForm(!viewForm);
        }
    }

    const handleAddEvent = (e) => {
        e.preventDefault();
        const eventObj = { title: event, timestamp };
        const temp = {...events};
        temp[`${timestamp.toString()}`] = eventObj;
        setEvents(temp);

        const metadata = { ...videoMetadata };
        metadata.events = events;
        setVideoMetadata(metadata);
        setEvent("");
        setViewForm(!viewForm);
    }

    const handleDeleteEvent = (e, ts) => {
        e.preventDefault();
        const temp = {...events};
        delete temp[ts];
        setEvents(temp);
        const metadata = { ...videoMetadata };
        metadata.events = events;
        setVideoMetadata(metadata);
    }

    const handleAudioMetadata = ( audioObj ) => {
        console.log("DEBUG LOG: handleAudioMetadata -> audioObj", audioObj);
        const metadata = { ...videoMetadata };
        metadata.audio = audioObj;
        setVideoMetadata(metadata);
    }

    /* const handleDataPass = (e) => {
        e.preventDefault();
        window.localStorage.setItem('videoMetadata', JSON.stringify(videoMetadata));
    } */

    return (
        <div className="AVEM_Event_Selection_Container">
            <div className="row">
                <div className="column" id="video_container">
                    <video controls src={props.location.state.filePath} type="video/mp4"
                        onLoadedMetadata={e => handleVideoMetadata(e)}
                    ></video>
                    <button className="primary-btn" onClick={e => handleViewForm(e)}>Add event</button>
                    {
                        viewForm ?
                        <form>
                            <input type="text" name="" id="" placeholder="Event title"
                                value={event} onChange={e => setEvent(e.target.value)}
                            />
                            <button onClick={e => handleAddEvent(e)}>Add</button>
                            <button onClick={e => handleViewForm(e)}>Cancel</button>
                        </form> : null
                    }
                    
                </div>
                <div className="column" id="event_list_container">
                    <h1>Events list</h1>
                    <AVEM_Event_List events={events} handleDeleteEvent={handleDeleteEvent} handleAudioMetadata={handleAudioMetadata}/>
                </div>
            </div>
            {/* <Link to='/avem_final_cut'>
                <button style={{float: "right"}} className="primary-btn" onClick={e => handleDataPass(e)}>Preview</button>
            </Link> */}
        </div>
    )
}

export default AVEM_Event_Selection;
