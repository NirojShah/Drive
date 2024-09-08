import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../helper/axiosInstance';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyFiles = async () => {
            try {
                const response = await axiosInstance.get("/file/myfile");
                console.log('API Response:', response.data); // Log the response data
                const fetchedFiles = response.data.data.files;

                if (fetchedFiles && fetchedFiles.length > 0) {
                    setFiles(fetchedFiles);
                } else {
                    console.error('No files found or unexpected response structure.');
                }
            } catch (err) {
                console.error('Error fetching files:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyFiles();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading files...</p>
            ) : (
                <div>
                    {files.length > 0 ? (
                        files.map(file => (
                            <div key={file._id}>
                                <h3>{file.filename}</h3>
                                {file.contentType.startsWith('image/') ? (
                                    <img src={file.url} alt={file.filename} style={{ maxWidth: '100%', height: 'auto' }} />
                                ) : (
                                    <p>File type not supported for preview</p>
                                )}
                                <p>Content Type: {file.contentType}</p>
                                <a href={file.url} download={file.filename}>Download</a>
                            </div>
                        ))
                    ) : (
                        <p>No files found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileList;
