projectData = [];

const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());

app.use(express.static("website"));

app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/all", sendData);

function sendData(req, res) {
  res.send(projectData);
  projectData = [];
}

app.post("/add", addData);

function addData(req, res) {
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  projectData.push(newEntry);
  res.send("");
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
