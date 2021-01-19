var express = require("express");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// =============================================================================
// Config
// =============================================================================
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// =============================================================================
// Server
// =============================================================================
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log("{name: ", req.file.originalname, "type: ", req.file.mimetype, "size:", req.file.size, "}");
  return !req.file
    ? res.send("No file attached.")
    : res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
