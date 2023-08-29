const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 3500;

//Custom middleware logger
app.use(logger);

//Cross origin resource sharing
app.use(cors(corsOptions));

//built in midleware to handle form data
app.use(express.urlencoded({ extended: false }));

//built in widleware for json
app.use(express.json());

//server static files(e.g. images)
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.use("/register", require("./routes/register"));

app.use("/login", require("./routes/login"));

app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
