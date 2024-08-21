const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const coockieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
require("dotenv").config();

const app = express();

/* //password encoding
const pass = "Ayesha#1234";
const encodedPass = encodeURIComponent(pass); */
mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

//register view engine
app.set("view-engine", "ejs");
app.set("views", "component");

//middleware & static files
app.use(express.static("resource"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(coockieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
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
