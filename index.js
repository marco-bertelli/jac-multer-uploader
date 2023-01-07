import { uploadFile } from "./uploader/s3.js";

import express from "express";
import multer from "multer";
import os from "os";

const app = express();

// Set up the multer middleware
const upload = multer({ dest: os.tmpdir() });

// Set up the file upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    // req.file is the file object
    const file = req.file;

    // uploading my file from local directory
    // instead of custom name i can use file.filename
    const uploadedFileUrl = await uploadFile(file.path, 'marco_test_multer.png')

    res.send(`upload finish: ${uploadedFileUrl.Location}`);
});

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});