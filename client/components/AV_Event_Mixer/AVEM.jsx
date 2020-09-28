import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { avemStorage, avemFirestore, uploadTimestamp } from '../../firebase/config'; 
/* import axios from 'axios'; */
import 'regenerator-runtime/runtime' 

const AVEM = () => {
    const [file, setFile] = useState();
    const [filename, setFilename] = useState("");
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadStatus, setUploadStatus] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState("0");
    const [viewProgress, setViewProgress] = useState(false);

    const handleSelection = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    /* const handleUpload = async e => {
        e.preventDefault();
        setViewProgress(true);
        const PREFIX = 'http://localhost:8000/av_mixer';
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${PREFIX}/uploadVideo`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        (parseInt( Math.round((progressEvent.loaded * 100)/progressEvent.total))).toString() + '%'
                    )
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            setViewProgress(false);
            setUploadStatus(true);
            setUploadPercentage("0");
        } catch(err) {
            if(err.response.status === 500) console.log("Server error!");
            else console.log(err.response.data.msg);
        }
    } */

    const handleUpload = (e) => {
        e.preventDefault();
        setViewProgress(true);
        
        const storageRef = avemStorage.ref(file.name);
        const collectionRef = avemFirestore.collection('video-assets');

        storageRef.put(file).on('state_changed', (snap) => {
            setUploadPercentage(
                ((snap.bytesTransferred / snap.totalBytes) * 100).toString() + '%'
            );   
        }, (err) => {
            // error during upload
            console.log("DEBUG LOG: handleUpload -> err", err); 
        }, async () => {
            // successful upload
            const url = await storageRef.getDownloadURL();
            const createdAt = uploadTimestamp();
            collectionRef.add({ url, createdAt });

            const uploadObj = {fileName: filename ,filePath: url };
            setUploadedFile(uploadObj);

            setViewProgress(false);
            setUploadStatus(true);
            setUploadPercentage("0");
        })
    }

    return (
        <div className="AVEM_Container">
            <div className="row">
                <div className="column" id="AVEM_About">
                    <h1>About</h1>
                    <p>
                        The Audio-Video Event Mixer is a feature of VENI Studio. 
                    </p>
                </div>

                <div className="column" id="AVEM_Upload">
                    {/* <p>Select and upload a base <br/>video file to start with!</p> */}
                    <div className="video_upload_container">
                        <div>
                            <input type="file" name="file_upload" id="file_upload" onChange={e => handleSelection(e)}/>
                        </div>
                    </div>
                    <button type="button" className="primary-btn" onClick={e => handleUpload(e)}>Upload</button>
                    <div className="progress_bar_container">
                    {
                        viewProgress ? 
                        <div id="progress">
                            <div id="percent" style={{ width: uploadPercentage }} ></div>
                        </div> : uploadStatus ? 
                                <div>
                                    <span>File uploaded!</span>
                                    <Link to={{
                                                pathname: '/avem_event_selection',
                                                state: { ...uploadedFile }
                                            }}>
                                        <button><i className="fa fa-arrow-right"></i></button>
                                    </Link>
                                </div> : null
                    }
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default AVEM;
