import React, { useState,useEffect } from 'react';
import { createPortal } from 'react-dom';
import { avemStorage, avemFirestore, uploadTimestamp } from '../../firebase/config';
import 'regenerator-runtime/runtime' 

const AVEM_Audio_Upload = ({ uploadedAudio, handleModalClose }) => {
    const fileItemStyle = {
        padding: "20px",
        fontSize: "1.8vw",
        borderBottom: "grey solid 1px",
    }
    const fileNameStyle = {
        marginLeft: "10px",
        color: "white"
    }

    const [file, setFile] = useState();
    const [filename, setFilename] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState(uploadedAudio);
    const [progressColor, setProgressColor] = useState({border: "1px solid #212121"})
    const [uploadPercentage, setUploadPercentage] = useState("0");
    const [selectedAudio, setSelectedAudio] = useState("");

    const handleSelection = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        
        setProgressColor({border: "1px solid #0d7377"})
        const storageRef = avemStorage.ref(file.name);
        const collectionRef = avemFirestore.collection('audio-assets');

        storageRef.put(file).on('state_changed', (snap) => {
            setUploadPercentage(
                ((snap.bytesTransferred / snap.totalBytes) * 100).toString() + '%'
            );   
        },(err) => {
            // error during upload
            console.log("DEBUG LOG: handleUpload -> err", err); 
        }, async () => {
            // successful upload
            const url = await storageRef.getDownloadURL();
            const createdAt = uploadTimestamp();
            collectionRef.add({ url, createdAt });

            const uploadObj = {fileName: filename ,filePath: url };
            const audioUploads = { ...uploadedFiles };
            const key_name = filename.split('.')[0].toString();
            audioUploads[`${key_name}`] = uploadObj;

            setUploadedFiles({...audioUploads });
            setUploadPercentage("0");
            setProgressColor({border: "1px solid #212121"});  
        })
    }

    /* useEffect(() => {
        console.log("DEBUG LOG: AVEM_Audio_Upload -> uploadedFiles", uploadedFiles);
    }, [uploadedFiles]); */

    return createPortal(
        <div>
            <div className="AVEM_Audio_Upload_Container">
                <h2>Select/Upload Audio</h2>
                <form>
                    <input type="file" name="audio_upload" id="audio_upload" onChange={e => handleSelection(e)}/>
                    {/* <button className="secondary-btn">Cancel</button> */}
                    <button type="button" className="secondary-btn" onClick={e => handleUpload(e)}>Add</button>
                    <div id="progress" style={progressColor}>
                        <div id="percent" style={{ width: uploadPercentage }} ></div>
                    </div>
                </form>
                {
                    Object.keys(uploadedFiles).map(file => {
                        return (<div key={file} style={fileItemStyle}>
                            <input type="radio" id="audio_choice" name="audio_choice" value={file}
                                onClick={e => setSelectedAudio(e.target.value)}/>
                            <label htmlFor="{file}" style={fileNameStyle}>{uploadedFiles[file].fileName}</label>
                        </div>)
                    })
                }
            </div>
            <div style={{ textAlign: "center" }}>
                <button className="primary-btn"
                    onClick={e => handleModalClose(e, selectedAudio, uploadedFiles)}
                    >Attach</button>
            </div>
        </div>,
        document.getElementById("modal_container")
    )
}

export default AVEM_Audio_Upload;
