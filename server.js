const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

const app = express();

/* //password encoding
const pass = "Ayesha#1234";
const encodedPass = encodeURIComponent(pass); */
const dbString = process.env.MONGO_URL;
mongoose
  .connect(dbString)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

//register view engine
app.set("view-engine", "ejs");
app.set("views", "component");

//middleware & static files
app.use(express.static("resource"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/about", (req, res) => {
  res.render("about.ejs", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { title: "Contact" });
});

//blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "404" });
});
