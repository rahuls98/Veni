import React, { useState, useEffect } from 'react';
import AVEM_Audio_Upload from './AVEM_Audio_Upload';

const AVEM_Event_List = ({ events, handleDeleteEvent, handleAudioMetadata }) => {
    const [viewModal, setViewModal] = useState(false);
    const [uploadedAudio, setUploadedAudio] = useState({});
    const [selectedEvent, setSelectedEvent] = useState("0");
    const [audio, setAudio] = useState({});

    const eventItemStyle = {
        padding: "20px",
        fontSize: "1.8vw",
        borderBottom: "grey solid 1px",
        color: "white"
    }
    const timestampStyle = {
        padding: "2px 5px 2px 5px",
        border: "#0d7377 solid 1px",
        background: "#0d7377",
        borderRadius: "5px",
        color: "white"
    }
    const titleStyle = {
        color: "white"
    }

    const timeFormat = (seconds) => {
        let h,m,s,ms;
        let duration = seconds*1000;

        ms = parseInt(duration%1000);
        s = parseInt((duration/1000)%60);
        m = parseInt((duration/(1000*60))%60);
        h = parseInt((duration/(1000*60*60))%24);

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        ms = (ms < 10) ? "00" + ms : (ms < 100) ? "0" + ms : ms;
        return(`${m}:${s}:${ms}`);
    }

    const handleModalOpen = (e, ts) => {
        e.preventDefault();
        setViewModal(true);
        setSelectedEvent(ts);
    }

    const handleModalClose = (e, choice, files) => {
        e.preventDefault();
        setViewModal(false);

        const audioObj = { id:choice, timestamp:events[`${selectedEvent}`].timestamp ,...files[choice]};
        const temp = {...audio};
        temp[`${selectedEvent}`] = audioObj;
        setAudio(temp);
        setUploadedAudio(files);
        handleAudioMetadata(temp);
    }

    const handleDeleteAudio = (e, ts) => {
        e.preventDefault();
        const temp = {...audio};
        delete temp[ts];
        setAudio(temp);
        handleDeleteEvent(e, ts);
    }

    useEffect(() => {
        var modalContainer = document.getElementById("modal_container");
        modalContainer.style.display =  viewModal? "block" : "none";
    }, [viewModal]);

    return (
        <div>
            {
            (Object.keys(events).length > 0) ?
                Object.keys(events).sort().map(timestamp => {
                    return (
                        <div key={timestamp} style={ eventItemStyle }>
                            <span style={timestampStyle}>{timeFormat(events[timestamp].timestamp)}</span>
                            <span style={titleStyle}>{` : ${events[timestamp].title} `}</span>
                            <span style={{float:"right", marginRight: "5px"}}>
                                <button className="secondary-btn" onClick={e => handleModalOpen(e, timestamp)}>Attach Audio</button>
                                <button className="secondary-btn" id="trash-btn" onClick={e => handleDeleteAudio(e, timestamp)}>
                                    <i className="fa fa-trash" style={{fontSize:"1.5vw"}}></i>
                                </button>
                            </span>
                        </div>
                    )
                }) : <p style={{ color:"gray", textAlign:"center", marginTop:"10vh" }}>No events attached!</p>
            }
            {viewModal ? <AVEM_Audio_Upload uploadedAudio={uploadedAudio} handleModalClose={handleModalClose}/> : null}
        </div>
    )
}

export default AVEM_Event_List;