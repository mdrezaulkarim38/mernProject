const express = require('express');
const router = express.Router();
const multer = require('multer');
const API = require('../controllers/api');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

let upload = multer({
    storage: storage
}).single('image')

router.get("/api/post",API.fetchAllPost);
router.get("/api/post/:id",API.fetchPostByID);
router.post("/api/post",upload,API.createPost);
router.patch("/api/post/:id",upload,API.updatePost);
router.delete("/api/post/:id", API.deletePost);

module.exports = router;