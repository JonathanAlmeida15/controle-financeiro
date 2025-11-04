const apiKey = "0b65d54184623a7e3ff5e7289c7fed83";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherInfo.innerHTML = "<p>⚠️ Digite o nome de uma cidade.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    if (!response.ok) {
      throw new Error("Cidade não encontrada");
    }

    const data = await response.json();
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${icon}" alt="Ícone do clima">
      <p><strong>🌡 ${data.main.temp.toFixed(1)}°C</strong></p>
      <p>${data.weather[0].description}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>❌ ${error.message}</p>`;
  }
});
