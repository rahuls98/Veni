import React from 'react';
import { render } from 'react-dom'
import AudioUploadForm from '../components/AudioUploadForm';
import EventSelectionForm from '../components/EventSelectionForm';
import FinalCut from '../components/FinalCut';
import VideoUploadForm from '../components/VideoUploadForm';
import VideoMetadataProvider from '../contexts/VideoMetadataProvider';


const App = () => {
    return (
        <VideoMetadataProvider>
            <VideoUploadForm />
            <EventSelectionForm />
            <AudioUploadForm />
            <FinalCut />
        </VideoMetadataProvider>
    )
}

render(
    <App />,
    document.getElementById("root")
);
