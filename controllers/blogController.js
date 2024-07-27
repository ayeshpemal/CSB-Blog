const { application } = require("express");
const Blog = require("../models/blog");

const blog_index = (req, res) => {
  const perPage = 4;
  const page = req.query.page || 1;

  Blog.countDocuments().then((result) => {
    const count = result;
    const nextPage =
      parseInt(page) < Math.ceil(count / perPage) ? parseInt(page) + 1 : null;
    const prevPage = parseInt(page) > 1 ? parseInt(page) - 1 : null;

    Blog.find()
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then((result) => {
        res.render("blogs.ejs", {
          title: "Blogs",
          blogs: result,
          nextPage,
          prevPage,
          page,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create.ejs", { title: "Create Blog" });
};

const blog_details = (req, res) => {
  const blog_id = req.params.id;
  Blog.findById(blog_id)
    .then((result) => {
      res.render("blog.ejs", { blog: result, title: "Blog" });
    })
    .catch((err) => {
      res.status(404).render("404.ejs", { title: "404" });
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const blog_id = req.params.id;
  Blog.findByIdAndDelete(blog_id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_search_post = (req, res) => {
  const perPage = 4;
  const page = req.query.page || 1;
  const search = req.body.search;

  Blog.countDocuments().then((result) => {
    const count = result;
    const nextPage =
      parseInt(page) < Math.ceil(count / perPage) ? parseInt(page) + 1 : null;
    const prevPage = parseInt(page) > 1 ? parseInt(page) - 1 : null;

    Blog.find({ title: { $regex: search, $options: "i" } })
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then((result) => {
        res.render("search.ejs", {
          title: "Blogs",
          blogs: result,
          nextPage,
          prevPage,
          page,
          search,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
  blog_search_post,
};
