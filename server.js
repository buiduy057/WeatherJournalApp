const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

const { sexagesimalToDecimal } = require("geolib");

app.use(cors());

app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/all", async (req, res) => {
  const zip = req.body.zip;
  if (zip) {
    const apiKey = "1bdde1bb5c22e29234c50a06c45d8563";
    let arrZip = zip.split(" ");
    var latitude = sexagesimalToDecimal(arrZip[0]).toFixed(4);
    var longitude = sexagesimalToDecimal(arrZip[1]).toFixed(4);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const date = new Date(data.list[0].dt * 1000);
        const temp = Math.round(data.list[0].main.temp - 273.15);
        const content = data.list[0].weather[0].description;
        res.send({ date, temp, content });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
