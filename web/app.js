document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("generate");
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    let zip = document.getElementById("zip");
    document.getElementById("date").textContent = "";
    document.getElementById("temp").textContent = "";
    document.getElementById("content").textContent = "";

    fetch("http://localhost:3000/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zip: zip.value }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById("date").textContent = data.date;
        document.getElementById("temp").textContent = data.temp;
        document.getElementById("content").textContent = data.content;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});
