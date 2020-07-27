const express = require('express');
const router = express.Router();
const fs = require("fs");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const uuid = require("uuid");

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

router.use(cors());
router.use(fileUpload());
router.use(express.json());
let nextID = 1;

router.post("/file", (request, response) => {
    try {
        const file = request.files.file;
        file.mv("./uploads/" + file.name);
        response.status(200).json();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;