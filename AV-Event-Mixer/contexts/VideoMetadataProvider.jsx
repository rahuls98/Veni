import React,{ createContext } from 'react';

export const VideoMetadata = createContext();

const VideoMetadataProvider = ( props ) => {
    const state = [];

    const setMetadata = () => {
        console.log("In setMetadata!");
    }

    return (
        <VideoMetadata.Provider>
            {props.children}
        </VideoMetadata.Provider>
    )
}

export default VideoMetadataProvider;
