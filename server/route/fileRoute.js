import { Router } from "express";
import { myFiles, upload } from "../controller/fileController.js";
import { auth } from "../middleware/auth.js";
import mongoose from "mongoose";


const fileRoute = Router()

fileRoute.post("/upload",auth,upload)
fileRoute.get("/myfile",auth,myFiles)

fileRoute.get("/file/:id", async (req, res) => {
    try {

        console.log("test")
        const gfsBucket = req.app.get("gfsBucket");
        const fileId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        
        const file = await gfsBucket.find({ _id: fileId }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "File not found."
            });
        }

        res.set({
            'Content-Type': file[0].contentType,
            'Content-Disposition': `inline; filename="${file[0].filename}"`
        });

        const downloadStream = gfsBucket.openDownloadStream(fileId);
        downloadStream.pipe(res);
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
});



export {fileRoute}