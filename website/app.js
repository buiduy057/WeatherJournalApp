const apiKey = "1bdde1bb5c22e29234c50a06c45d8563";

document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("generate");
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    let zip = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;

    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${apiKey}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        let d = new Date();
        let newDate =
          d.getDate() +
          "/" +
          (Number(d.getMonth()) + 1) +
          "/" +
          d.getFullYear();
        postData("/add", {
          date: newDate,
          temp: data.list[0].main.temp,
          content: feelings,
        });
        updateUI();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  const postData = async (url, data) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const updateUI = async () => {
    const request = await fetch("/all");
    try {
      const data = await request.json();
      document.getElementById("date").innerHTML = `Date : ${data[0].date}`;
      document.getElementById("temp").innerHTML = `Temp : ${data[0].temp}`;
      document.getElementById(
        "content"
      ).innerHTML = `I feel: ${data[0].content}`;
    } catch (error) {}
  };
});
