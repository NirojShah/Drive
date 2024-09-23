// import React, { useEffect, useState } from 'react';
// import { axiosInstance } from '../../helper/axiosInstance';
// import mammoth from 'mammoth';

// const Docs = () => {
//   const [docxHtml, setDocxHtml] = useState("");

//   const fetchData = async () => {
//     try {
//       const { data } = await axiosInstance.get("/doc");
//       const base64Content = data.data; // Base64 string
//       const arrayBuffer = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0)).buffer;
//       const result = await mammoth.convertToHtml({ arrayBuffer });
//       setDocxHtml(result.value); // HTML content from .docx
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Docs</h2>
//       <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
//     </div>
//   );
// };

// export default Docs;

import React, { useState } from 'react';
import DocxPreview from 'docx-preview'; // Import the default export

const Docs = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h2>Upload and View .docx File</h2>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      {file && <DocxPreview file={file} />}
    </div>
  );
};

export default Docs;

