const express = require('express');
const av_mixer = require('./routes/av_mixer');
const app = express();

const PORT = process.env.PORT || 8000;

app.use('/av_mixer', av_mixer);

app.get('/', (req, res) => res.send("<h1>Veni Server!</h1>"));

app.listen(PORT, () => console.log("Server is listening!"));