const express = require("express");
const app = express();
const db = require("./db");

app.use(express.static("./public"));

app.use(express.json());

let cities = [
    {
        id: 1,
        name: "Berlin",
        country: "DE",
        flag: "🇩🇪",
    },
    {
        id: 2,
        name: "São Paulo",
        country: "BR",
        flag: "🇧🇷",
    },
    {
        id: 1,
        name: "Guayaquil",
        country: "Ecudor ",
        flag: "🇪🇨",
    },
];

app.get("/cities", (req, res) => {
    console.log(cities);
    res.json(cities);
});

app.get("/images", (req, res) => {
    console.log("Images");
    db.getImages().then(({ rows }) => {
        // console.log(images.rows[0].id);
        res.json(rows);
        // console.log(images);
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
