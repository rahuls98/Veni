const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("AV Mixer");
});

router.post('/uploadVideo', (req, res) => {
    if(req.files.file === null) {
        return res.status(400).json({ msg: "No file provided!" });
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/assets/video/${file.name}`, err => {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }
    });
});

module.exports = router;