const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogModel);

module.exports = Blog;
