import express from "express";
import cors from "cors";
import { userRouter } from "./route/userRouter.js";
import fileUpload from "express-fileupload";
import { fileRoute } from "./route/fileRoute.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/user", userRouter);
app.use("/file", fileRoute);

export { app };
