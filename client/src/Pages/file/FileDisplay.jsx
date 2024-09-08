import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileDisplay = ({ fileId }) => {
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        // Set the URL for the file based on the backend API
        if (fileId) {
            setFileUrl(`/file/${fileId}`); // Assuming your backend serves the file at /file/:id
        }
    }, [fileId]);

    return (
        <div>
            {fileUrl ? (
                <img src={fileUrl} alt="Uploaded file" style={{ maxWidth: '100%', height: 'auto' }} />
            ) : (
                <p>Loading file...</p>
            )}
        </div>
    );
};

export default FileDisplay;
