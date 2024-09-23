import { GridFSBucket } from 'mongodb';
import fs from "fs"

const upload = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                message: "Please send a file."
            });
        }
        const gfsBucket = req.app.get("gfsBucket"); // Use the updated key
        const uploadStream = gfsBucket.openUploadStream(req.files.file.name, {
            contentType: req.files.file.mimetype,
            metadata: {
                owner: req.user._id,
                // other metadata if needed
            }
        });

        uploadStream.end(req.files.file.data);

        uploadStream.on('finish', () => {
            res.status(200).json({
                status: "success",
                data: {
                    filename: req.files.file.name
                }
            });
        });
        uploadStream.on('error', (err) => {
            res.status(500).json({
                status: "failed",
                message: err.message
            });
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};


const myFiles2 = async (req, res) => {
    try {
        const gfsBucket = req.app.get("gfsBucket");

        // Find files where metadata.owner == req.user._id
        const cursor = gfsBucket.find({ "metadata.owner": req.user._id });
        const files = await cursor.toArray();

        console.log('Files fetched:', files); // Log files to verify

        if (!files || files.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No files found for this user."
            });
        }

        // Map over the files to include a URL for each
        const filesWithUrls = files.map(file => ({
            ...file,
            url: `${req.protocol}://${req.get('host')}/file/${file._id}`
        }));

        res.status(200).json({
            status: "success",
            data: {
                files: filesWithUrls
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};













const myFiles = async (req, res) => {
    try {
        const gfsBucket = req.app.get("gfsBucket");

        // Find all files
        const cursor = gfsBucket.find({"metadata.owner":req.user._id});
        const files = await cursor.toArray();

        console.log('Files fetched:', files); // Log files to verify

        if (!files || files.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No files found."
            });
        }

        // Add URL to each file object
        const filesWithUrls = files.map(file => ({
            ...file,
            url: `${req.protocol}://${req.get('host')}/file/file/${file._id}`
        }));

        res.status(200).json({
            status: "success",
            data: {
                files: filesWithUrls
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};








const docsRes = async(req,res)=>{


const buffer = fs.readFileSync("./a.docx")

const base = buffer.toString("base64")


    console.log("testing")
    res.status(200).json({
        data:base
    })
}



export { upload,myFiles,docsRes };
