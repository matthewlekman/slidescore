import { useState, useRef } from 'react';
import UploadIcon from '../assets/cloud-upload.svg';
import '../App.css';


export default function Uploader({ onAnalyse }) {
    
    const [file, setFile] = useState(null); 
    const [dragActive, setDragActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    const validateAndSetFile = (selectedFile) => {
        if (!selectedFile) {
            return;
        } 
        if (selectedFile.name.toLowerCase().endsWith('.pptx') && selectedFile.size < 100 * 1024 * 1024) {
            setFile(selectedFile);
            setErrorMessage('');
            onAnalyse?.(selectedFile);
        } else {
            setErrorMessage('Please upload a .pptx file smaller than 100MB.');
        }
    }

    const handleFileChange = (e) => {
        validateAndSetFile(e.target.files[0]);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        validateAndSetFile(e.dataTransfer.files[0]);
    }

    const handleClick = () => {
        fileInputRef.current.click();
    }

    return (
        <div className="drop-zone" 
             onDragOver={handleDragOver} 
             onDragLeave={() => setDragActive(false)}
             onDrop={handleDrop}>
            <img className="upload-icon" src={UploadIcon} onClick={handleClick} />
            <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{ display: 'none' }}/>
            {dragActive ? <p>Drop the file here...</p> : <p>Drag & drop a file here</p>}
            {file && <p>Selected file: {file.name}</p>}
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    )
}