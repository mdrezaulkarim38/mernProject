const express = require('express');
const router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cd)
    {
        cd(null, './uploads');
    },
    filename: function(req, file, cd)
    {
        cd(null, file.fieldname+"_"+Date.now() +"_"+file.originalname);
    },
})
let upload = multer({
    storage: storage
}).single('image')

router.get("/api/post");
router.get("/api/post/:id");
router.post("/api/post");
router.patch("/api/post/:id");
router.delete("/api/post/:id");

module.exports = router;