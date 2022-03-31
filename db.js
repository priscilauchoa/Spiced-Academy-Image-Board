const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/image`
);

exports.getImages = () => {
    return db.query(`SELECT * FROM images ORDER BY id DESC`);
};
exports.getImageById = (id) => {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
};

exports.saveImage = (title, description, username, url) => {
    return db.query(
        `INSERT INTO images (title, description, username, url) VALUES ($1, $2, $3, $4)
            RETURNING id, title, description, username, url`,
        [title, description, username, url]
    );
};

// INSERT INTO signatures (user_id, signature) VALUES ($1, $2)
//         RETURNING id
