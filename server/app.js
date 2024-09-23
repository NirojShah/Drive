import express from "express";
import cors from "cors";
import { userRouter } from "./route/userRouter.js";
import fileUpload from "express-fileupload";
import { fileRoute } from "./route/fileRoute.js";
import fs from "fs"

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/user", userRouter);
app.use("/file", fileRoute);

app.get("/doc",async(req,res)=>{
    const buffer = fs.readFileSync("./a.docx")

const base = buffer.toString("base64")

res.status(200).json({
    status:"success",
    data : base
})
})

export { app };
