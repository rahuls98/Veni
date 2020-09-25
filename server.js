const express = require('express');
const avMixer = require('./Routes/avMixer');
const app = express();

const PORT = process.env.PORT || 8000;

app.use('/avMixer', avMixer);

app.get('/', (req, res) => res.send("Welcome home!"));

app.listen(PORT, () => console.log("Server is listening!"));