# Upload image with Fetch API in JavaScript

## Step-by-Step Video:

[YouTube-Link => Upload image with Fetch API](https://youtu.be/72LyYqo-UjQ)

## Source Code:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Demo - File Upload</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                padding: 0;
                background: #3e3e3e;
                color: #ffffff;
                font-family: Arial, Helvetica, sans-serif;
            }

            .upload-container {
                background: #191919;
                padding: 1rem;
                width: 50%;
                text-align: center;
            }

            .upload-container form {
                margin: 0 auto;
                width: 50%;
            }

            .upload-container form label {
                font-size: 2.5rem;
                cursor: pointer;
            }

            .upload-container form input {
                display: none;
            }
        </style>
    </head>
    <body>
        <div class="upload-container">
            <form>
                <label for="file">Upload File</label>
                <input type="file" id="file" accept="image/*" />
            </form>
        </div>
        <script>
            document
                .getElementById('file')
                .addEventListener('change', event => {
                    const files = event.target.files;
                    const formData = new FormData();
                    formData.append('image', files[0]);

                    fetch('http://api.demo.local/image', {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => response.json())
                        .then(data => {
                            document.body.style.background =
                                "url('" + data.image + "')";
                            document.body.style.backgroundSize = 'cover';
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
        </script>
    </body>
</html>
```
```javascript
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
```
