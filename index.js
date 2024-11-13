const express = require("express");
const app = express(); //running instance of express

// configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const mysql = require("mysql2");

const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testDB",
});

DB.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

// route handlers - get, post, delete, put (CRUD)
app.get("/", (req, res) => {
  // res.send("Well received")
  // res.json({ username: 'Flavio' })
  res.render("index", { title: "FIRE CONFERENCE" });
});

app.post("/", (req, res) => {
  // console.log(req.body)
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  //validations
  if (!name) {
  }
  if (!email) {
  }
  if (!password) {
  }
  if (password.length < 8) {
  }

  //insert into database
  // const table = "members";
  let sql = `INSERT INTO members VALUES ("${name}","${email}", "${password}");`;

  DB.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("1 record inserted");
    }
  });

  return res.redirect("/");
});

app.get("/members", (req, res) => {
  let sql = `select * from members;`;
  DB.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //   console.log(result);
      return res.render("members", { data: result });
    }
  });
});

app.get("/members/:id", (req, res) => {
  const id = req.params.id;

  let sql = `select * from members where id = ${id};`;
  DB.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result[0]);
      return res.render("member", { data: result[0] });
    }
  });
});

app.get("/search", function (req, res) {
  console.log(req.query);
  res.end(JSON.stringify(req.query) + "\r\n");
});

/// Error handlers
// Development error handler
// Will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}
// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server running on port ${port}. Click http://localhost:${port} to view`
  )
);
