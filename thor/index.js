import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8000;
let userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
    const password = req.body.password;
    if (password === "4444") {
      userIsAuthorised = true;
    }
    next();
  }
  app.use(passwordCheck);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    if (userIsAuthorised) {
        res.render("secret.ejs");
      } else {
        res.render(("index.ejs"));
      }

      console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server running successfully on port ${port}`);
});
