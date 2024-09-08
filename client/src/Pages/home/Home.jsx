import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../helper/axiosInstance'

const home = () => {
    const [payload,setPayload] = useState({
        file : {},
        contentType:"",
        from : ""
    })


    const fetchMyFiles =async()=>{
        try{
            const {data} = await axiosInstance.get("/file/myfile")
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchMyFiles()
    },[])

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.type === "file" ? e.target.files[0] : e.target.value;
        setPayload({ ...payload, [name]: value });
      };

    const handleUpload = async()=>{
        try{
            const {data} = await axiosInstance.post("/file/upload",payload,{headers:{"Content-Type":"multipart/form-data"}})
        }catch(err){
            console.log(err.message)
        }
    }
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",height:"100%",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",
            width:"100vw",height:"200px",flexDirection:"column",gap:"5px"}}>
            <h1>UPLOAD</h1>
            <input type="file" name='file' onChange={handleChange} />
            <button onClick={handleUpload}>add</button>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100vw",height:"calc(100vh - 100px)",flexDirection:"column"}}>
<h1>Files</h1>
        </div>
    </div>
  )
}

export default home