import mongoose from "mongoose";
import { app } from "./app.js";
import http from "http";
import dotenv from "dotenv";
import { GridFSBucket } from "mongodb"; // Use GridFSBucket from mongodb

dotenv.config({
    path: "./.env"
});

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected");

        // Set up GridFS after a successful DB connection
        const conn = mongoose.connection;
        const gfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });

        // Make GridFSBucket accessible in app
        app.set("gfsBucket", gfsBucket);
        app.set("db", conn.db); // Also store the database connection if needed
    })
    .catch((err) => {
        console.log("Something went wrong while connecting to the DB.", err);
    });

server.listen(5000, (err) => {
    if (err) {
        console.log("Something went wrong while creating a server", err);
        return;
    }
    console.log("Server started at port no " + 5000);
});
