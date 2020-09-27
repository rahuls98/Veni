const express = require('express');
const router = express.Router();
const path = require('path');

const HOME = path.join(__dirname, '..');

router.get('/', (req, res) => {
    res.send("AV Mixer");
});

router.post('/uploadVideo', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: "No file provided!" });
    }

    const file = req.files.file;
    file.mv(`${HOME}/client/assets/video/Upload.mov`, err => {
        if(err) {
            console.log("DEBUG LOG: err", err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/assets/video/${file.name}` });
    });
});



module.exports = router;