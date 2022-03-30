const express = require("express");
const app = express();
const db = require("./db");
const { uploader } = require("./upload");

app.use(express.static("./public"));
app.use(express.json());

app.get("/images", (req, res) => {
    console.log("Images");
    db.getImages().then(({ rows }) => {
        // console.log(images.rows[0].id);
        res.json(rows);
        // console.log(images);
    });
});

app.post("/upload", uploader.single("file"), (req, res) => {
    console.log(req.body);
    //store web url of aws image in database
    //send back to browser to display on screen
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
