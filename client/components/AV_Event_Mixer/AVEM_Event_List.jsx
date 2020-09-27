import React from 'react';

const AVEM_Event_List = ({ events, handleDeleteEvent }) => {
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

    return (
        <div>
            {
            (Object.keys(events).length > 0) ?
                Object.keys(events).sort().map(timestamp => {
                    return (
                        <div key={timestamp} style={ eventItemStyle }>
                            <span style={timestampStyle}>{timeFormat(events[timestamp].timestamp)}</span>
                            <span style={titleStyle}>{` : ${events[timestamp].title} `}</span>
                            <span style={{float:"right", marginRight: "10px"}}>
                                <button onClick={e => handleDeleteEvent(e, timestamp)}>
                                    <i className="fa fa-trash" style={{fontSize:"1.5vw"}}></i>
                                </button>
                            </span>
                        </div>
                    )
                }) : <p style={{ color:"gray", textAlign:"center", marginTop:"10vh" }}>No events attached!</p>
            }
        </div>
    )
}

export default AVEM_Event_List;