import { uploadFile } from "./uploader/s3.js";

import express from "express";
import multer from "multer";
import os from "os";

import bluebird from "bluebird";

const app = express();

// Set up the multer middleware
const upload = multer({ dest: os.tmpdir() });

// Set up the file upload route
app.post('/upload', upload.array('file'), async (req, res) => {
    // req.file is the file object
    const files = req.files;

    // uploading my file from local directory
    // instead of custom name i can use file.filename
    const results = await bluebird.Promise.map(files, async (file) => {
        const uploadedFileUrl = await uploadFile(file.path, file.originalname);

        return uploadedFileUrl;
    })

    res.send(`upload finish: ${results}`);
});

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});