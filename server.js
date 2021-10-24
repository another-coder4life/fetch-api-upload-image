const express = require('express');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());

app.post('/image', upload.single('image'), function(req, res, next) {
    res.json({
        image: 'uploads/' + req.file.originalname,
    });
});

app.listen(3000);
