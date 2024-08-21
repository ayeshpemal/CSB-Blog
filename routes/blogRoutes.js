const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/post/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

router.post("/search", blogController.blog_search_post);

router.get("/search", blogController.blog_search_post);

module.exports = router;
