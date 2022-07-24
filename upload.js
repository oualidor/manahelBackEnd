const express = require('express');
const multer = require('multer');
const path = require('path');





app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {

});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));