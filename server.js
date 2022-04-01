const express = require("express");
const app = express();
const db = require("./db");
const { uploader } = require("./upload");
const s3 = require("./s3");
app.use(express.static("./public"));
app.use(express.json());

app.get("/images", (req, res) => {
    // console.log("Images");
    db.getImages().then(({ rows }) => {
        // console.log(images.rows[0].id);
        res.json({ rows });
        // console.log(images);
    });
});

app.get("/images/more", (req, res) => {
    db.getMoreImages(1).then(({ rows }) => {
        res.json({ rows });
    });
});

app.get("/modal/:id", (req, res) => {
    console.log("req.params.id --->", req.params.id);
    db.getImageById(req.params.id).then(({ rows }) => {
        res.json({ rows });
    });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const { title, description, username } = req.body;

        let url = `https://s3.amazonaws.com/priscilasbucket/${req.file.filename}`;

        // console.log(title, description, username, url);
        db.saveImage(title, description, username, url).then(({ rows }) => {
            res.json(rows);
        });
    } else {
        return res.sendStatus(500);
    }
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
