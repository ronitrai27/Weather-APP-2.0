import { useState } from "react";
import axios from "axios";
import Sunny from "../assets/sunny.png";
import wind from "../assets/wind.png";
import thunderstorm from "../assets/thunderstorm.png";
import clouds from "../assets/clouds.png";
import ghost from "../assets/ghost.png";
import rainy from "../assets/rainy.png";
import snow from "../assets/snow.png";
import haze from "../assets/haze.png";
import thermo from "../assets/thermometer.png";
import equator from "../assets/equator.png";
import humidity from "../assets/humidity-icon.png";
import longitude from "../assets/longitude.png";
import wind_icon from "../assets/wind-icon.png";
import afternoon from "../assets/afternoon.png";
import Maps from "./Maps";
import MainChart from "./Charts";

function WeatherBoxes() {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState();
  const [loading, setLoading] = useState(false);
  const [news, setnews] = useState([]);
  const [lat, setlat] = useState(null);
  const [lon, setlon] = useState(null);
  const [fiveDayAverage, setFiveDayAverage] = useState([]);

  const citysearch = (e) => {
    setcity(e.target.value);
  };

  const calculateFiveDayAverage = (forecastData) => {
    const dailyTemps = {};

    forecastData.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
      if (!dailyTemps[date]) {
        dailyTemps[date] = [];
      }
      dailyTemps[date].push(entry.main.temp); // Add temperature to the respective day
    });

    // Calculate average temperature for each day
    const dailyAverages = Object.entries(dailyTemps).map(([date, temps]) => {
      const averageTemp =
        temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
      return { date, average: parseFloat(averageTemp.toFixed(2)) }; // Format to 2 decimal places
    });

    console.log("5-Day Average Temperatures:", dailyAverages);
    setFiveDayAverage(dailyAverages);
  };

  // Main function to get all the API-data
  const getweather = async () => {
    if (!city) {
      console.warn("City name is required.");
      return;
    }
    setLoading(true);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1022a725c2ffc2f52caef15f7329d765`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1022a725c2ffc2f52caef15f7329d765&units=metric`;
      const newsUrl = `https://newsapi.org/v2/everything?q=${city}&language=en&sortBy=popularity&apiKey=e0048cfda3cd45cebdbbd8078f2cb6e7`;

      // fetchin weather, forecast and newsapi
      const [weatherResponse, forecastResponse, newsResponse] =
        await Promise.all([
          axios.get(weatherUrl),
          axios.get(forecastUrl),
          axios.get(newsUrl),
        ]);

      setweather(weatherResponse.data);
      console.log("Weather data:", weatherResponse.data);

      // Geting lat and lon from weather data
      const { lat, lon } = weatherResponse.data.coord;
      setlat(lat);
      setlon(lon);

      // display top 3 news includes city name
      const filteredNews = newsResponse.data.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(city.toLowerCase()) ||
          (article.description &&
            article.description.toLowerCase().includes(city.toLowerCase()))
      );
      setnews(filteredNews.slice(0, 3));
      console.log("News data:", newsResponse.data);

      // Process forecast data for previous 5 days' average temperature
      const forecastData = forecastResponse.data.list;
      console.log("Forecast data:", forecastData);
      calculateFiveDayAverage(forecastData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setweather(null);
      setnews([]);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherImage = () => {
    const description = weather.weather[0].description.toLowerCase();
    if (description.includes("cloud")) {
      return clouds;
    } else if (description.includes("rain")) {
      return rainy;
    } else if (description.includes("sun") || description.includes("clear")) {
      return Sunny;
    } else if (description.includes("thunderstorm")) return thunderstorm;
    else if (description.includes("haze")) {
      return haze;
    } else if (description.includes("drizzle")) {
      return wind;
    } else if (description.includes("snow")) {
      return snow;
    } else return wind;
  };

  return (
    <div>
      {/* Header */}
      <div className="header flex justify-center gap-x-5 items-center mx-auto select-none border-2 p-5 border-gray-700/20 ">
        <input
          type="search"
          name="search"
          value={city}
          onChange={citysearch}
          class="input shadow-lg border-gray-500 text-gray-200 bg-gray-700/45 px-[12px] py-[6px] rounded-xl w-40 transition-all focus:w-48 outline-none "
          placeholder="Search..."
        />

        <button
          type="submit"
          onClick={getweather}
          class=" flex justify-center gap-2 items-center  shadow-xl text-sm bg-gray-100 select-none backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-violet-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-130 before:hover:duration-700 relative z-10 px-[7px] py-[3px] overflow-hidden border-2 rounded-full group"
        >
          Explore
          <svg
            class="w-6 h-6 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-[5px] rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              class="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
      </div>

      {/* BOXES  */}
      <div className="py-4 px-10 flex gap-x-16  ">
        {/* boxes group 1 */}
        <div className="flex flex-col gap-y-2 items-center">
          {/* BOX-1 */}
          <div className=" backdrop-filter backdrop-blur-xl bg-gray-50/10 w-[14rem] h-[15rem] rounded-t-xl rounded-b-xl p-3 text-center select-none border-2 border-violet-500/25  overflow-hidden ">
            {/* loader */}
            {loading && (
              <div class="w-full gap-x-2 flex justify-center items-center mt-28">
                <div class="w-3 bg-[#d991c2] animate-pulse h-3 rounded-full "></div>
                <div class="w-3 animate-pulse h-3 bg-[#9869b8] rounded-full "></div>
                <div class="w-3 h-3 animate-pulse bg-[#6756cc] rounded-full"></div>
              </div>
            )}
            {!loading &&
              (weather ? (
                <div>
                  <h1 className="text-gray-200 font-semibold font-subhead text-2xl">
                    {weather.name}
                  </h1>
                  <img
                    src={getWeatherImage()}
                    alt="Weather illustration"
                    className="w-1/2 h-auto mx-auto my-2"
                  />
                  <h2 className="text-2xl font-head text-gray-300">
                    {(weather.main.temp - 273.15).toFixed(2)} °C
                  </h2>
                  {/* to handle long text */}
                  <h3
                    className={`${
                      weather.weather[0].description.length > 18
                        ? "text-[1rem]"
                        : "text-2xl"
                    } font-semibold font-head text-gray-200/55`}
                  >
                    {weather.weather[0].description}
                  </h3>
                </div>
              ) : (
                <div>
                  <img src={ghost} alt="" className="w-1/2 h-auto  mx-auto" />
                  <p className="text-center mt-8 text-lg text-gray-300/20 font-head font-semibold">
                    Weather not found
                  </p>
                  <p className="text-center mt-2 text-md text-gray-300/20 font-head font-semibold">
                    Try searching For any City
                  </p>
                </div>
              ))}
          </div>
          {/* BOX-2 */}
          <div className=" backdrop-filter backdrop-blur-xlg bg-gray-50/10 w-[13rem] h-[10.2rem] rounded-xl  px-2 py-3 select-none border-2 border-violet-500/15 hover:border-violet-500/25">
            {!loading &&
              (weather ? (
                <div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-x-2">
                      <img src={humidity} alt="" className="w-[1.5rem]" />
                      <h2 className="text-[.85rem] font-semibold text-gray-400">
                        Humidity: {weather.main.humidity}%
                      </h2>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <img src={wind_icon} alt="" className="w-[1.2rem]" />
                      <h2 className="text-[.85rem] font-semibold text-gray-400">
                        Wind: {weather.wind.speed} m/s
                      </h2>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <img src={equator} alt="" className="w-[1.2rem]" />
                      <h2 className="text-[.85rem] font-semibold text-gray-400">
                        Lat: {weather.coord.lat}
                      </h2>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <img src={longitude} alt="" className="w-[1.2rem]" />
                      <h2 className="text-[.85rem] font-semibold text-gray-400">
                        Lon: {weather.coord.lon}
                      </h2>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <img src={thermo} alt="" className="w-[1.1rem]" />
                      <h2 className="text-[.85rem] font-semibold text-gray-400">
                        Pressure: {weather.main.pressure}
                      </h2>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center mt-16 text-xl text-gray-300/20 font-head font-semibold">
                  City Data
                </p>
              ))}
          </div>
        </div>
        {/* boxes group 2 */}
        <div className="flex items-center gap-x-4">
          <div className="flex flex-col space-y-3 items-center">
            <div
              className=" backdrop-filter backdrop-blur-2xl bg-gray-50/10 w-[13rem] h-[12.4rem] rounded-xl  px-2 py-3 select-none border-2 border-violet-500/15  overflow-x-auto  hover:border-violet-500/25
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-gray-50/10
  [&::-webkit-scrollbar-thumb]:bg-gray-50/20
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              {!loading ? (
                weather ? (
                  <div>
                    <h2 className="text-xl mb-2 font-semibold leading-tight tracking-tighter text-gray-300 font-head text-center">
                      5-D Average:
                    </h2>
                    <ul className="space-y-3 ml-3 mt-3">
                      {fiveDayAverage.map((day) => (
                        <li
                          key={day.date}
                          className="flex items-center gap-x-4 flex-wrap text-gray-300 font-head text-sm"
                        >
                          <img
                            src={afternoon}
                            alt="Weather Icon"
                            className="w-[38px] "
                          />
                          {day.average}°C
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="p-2 mt-16 text-center text-xl font-head font-semibold text-gray-300/20">
                    5-D Temperature
                  </p>
                )
              ) : (
                <p className="mt-16 text-center text-xl font-head font-semibold text-gray-300/20">
                  loading ...
                </p>
              )}
            </div>
            <div
              className=" backdrop-filter backdrop-blur-lg bg-gray-50/10 w-[13rem] h-[12.4rem] rounded-xl p-2 select-none border-2 border-violet-500/15 flex flex-col gap-x-1  overflow-x-auto max-h-[400px]  hover:border-violet-500/25
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-gray-50/10
  [&::-webkit-scrollbar-thumb]:bg-gray-50/20
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              {weather ? (
                <h1 className="text-center text-gray-300 font-semibold text-[.8rem] font-subhead mb-2">
                  Top News
                </h1>
              ) : (
                <h1 className="text-center text-gray-300/20 text-[1.2rem] font-subhead mt-16 font-semibold">
                  Top News
                </h1>
              )}

              {!loading &&
                news.map((article, index) => (
                  <div key={index}>
                    <p className="text-[.86rem] leading-tight tracking-tighter mb-4 text-gray-300/40 font-subhead">
                      {article.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          {/* Boxes group - 3 */}
          <div className="flex flex-col space-y-3 items-center">
            <div className=" backdrop-filter backdrop-blur-lg bg-gray-50/10 w-[21rem] h-[11rem] rounded-xl  p-1 select-none border-2 border-violet-500/15 overflow-hidden  hover:border-violet-500/25">
              {!loading ? (
                weather ? (
                  <MainChart />
                ) : (
                  <p className="text-center mt-16 text-2xl font-subhead font-semibold text-gray-300/20">
                    5-D Forecast{" "}
                  </p>
                )
              ) : (
                <p className="text-center text-xl text-gray-300/20 font-head mt-16">
                  Loading Charts ...
                </p>
              )}
            </div>

            <div className=" backdrop-filter backdrop-blur-lg bg-gray-50/10 w-[19rem] h-[14rem] rounded-xl p-1 select-none border-2 border-violet-500/15  hover:border-violet-500/25">
              {!loading &&
                (lat && lon ? (
                  <Maps lat={lat} lon={lon} city={city} />
                ) : (
                  <p className="text-center text-lg text-gray-300/20 mt-24 font-semibold font-subhead">
                    Interactive Map !
                  </p>
                ))}
            </div>
          </div>
        </div>
        {/* Ends.. */}
      </div>
    </div>
  );
}

export default WeatherBoxes;
