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

app.post("/image/delete/:id", (req, res) => {
    db.deleteCommentsByImageId(req.params.id)
        .then(() => db.deleteImage(req.params.id))
        .then(({ rows }) => {
            res.send(200);
        })
        .catch((err) => {
            console.log("error delete image", err);
            res.send(500);
        });
});

app.get("/modal/:id", (req, res) => {
    console.log("req.params.id --->", req.params.id);
    db.getImageById(req.params.id).then(({ rows }) => {
        if (rows.length) res.json(rows[0]);
        else res.status(404).send();
    });
});

app.get("/images/:lowest", (req, res) => {
    db.getMoreImages(req.params.lowest).then(({ rows }) => {
        console.log("ROWS--->", rows);
        res.json({ rows });
    });
});

app.get("/comments/:imageid", (req, res) => {
    db.getComments(req.params.imageid).then(({ rows }) => {
        res.json(rows);
    });
});

app.post("/comments/:imageId", (req, res) => {
    console.log(
        "ROWS--->",
        req.params.imageId,
        req.body.username,
        req.body.comment
    );
    db.insertComments(req.params.imageId, req.body.username, req.body.comment)
        .then(({ rows }) => {
            console.log("ROWS--->", rows);
            res.json(rows);
        })
        .catch(() => res.sendStatus(500));
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    if (req.file) {
        const { title, description, username } = req.body;

        let url = `https://s3.amazonaws.com/priscilasbucket/${req.file.filename}`;

        // console.log(title, description, username, url);
        db.saveImage(title, description, username, url).then(({ rows }) => {
            // console.log("ROWS2--->", rows);
            res.json(rows);
        });
    } else {
        return res.sendStatus(500);
    }
});

app.get("/image/:before", (req, res) => {
    db.getIdBefore(req.params.imageId).then(({ rows }) => {
        console.log("image before", rows);
        res.json({ rows });
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
