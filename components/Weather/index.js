import React, { useEffect, useState } from "react";
import CardIcon from "../CardIcon";
import clsx from "clsx";
import HeaderSection from "../HeaderSection";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: "",
    humidity: "",
    maxTemperature: "",
    solarRadiation: "",
  });
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Set default solar radiation based on solcast data whenever limit api rate exceed
  const defautSolarRadiation = () => {
    let constant;
    switch (new Date().getHours()) {
      case 7:
        constant = 2.8872;
        break;
      case 8:
        constant = 6.549;
        break;
      case 9:
        constant = 10.739;
        break;
      case 10:
        constant = 19.6823;
        break;
      case 11:
        constant = 31.2312;
        break;
      case 12:
        constant = 31.7242;
        break;
      case 13:
        constant = 29.4;
        break;
      case 14:
        constant = 23.3;
        break;
      case 15:
        constant = 15.774;
        break;
      case 16:
        constant = 8.4856;
        break;
      case 17:
        constant = 2.7463;
        break;
      default:
        constant = '0';
        break;
    }
    // console.log(constant);
    return constant;
  };


  useEffect(() => {
    // get Weather data from openweather and get solar radiation data from solcast
    const getWeatherData = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=-7.797068&lon=110.370529&appid=${process.env.OPENWEATHER_KEY}&units=metric`
        );
        const solarRadiationResponse = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.solcast.com.au/world_radiation/estimated_actuals?latitude=-7.7705583&longitude=110.388051&hours=5`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.SOLCAST_KEY}`,
            },
          }
        );
        const weatherDataResponse = await weatherResponse.json();

        // Handler if limit rate exceed and set solar radiation data from defaultSolarRadiation()
        if (!solarRadiationResponse.ok) {
          console.log(`Failed to fetch from solcast because of api limit rate`);

          setWeatherData({
            city: weatherDataResponse.name,
            temperature: weatherDataResponse.main.temp,
            humidity: weatherDataResponse.main.humidity,
            maxTemperature: weatherDataResponse.main.temp_max,
            solarRadiation: defautSolarRadiation(),
          });
        } else {
          const solarRadiationDataResponse =
            await solarRadiationResponse.json();
          setWeatherData({
            city: weatherDataResponse.name,
            temperature: weatherDataResponse.main.temp,
            humidity: weatherDataResponse.main.humidity,
            maxTemperature: weatherDataResponse.main.temp_max,
            solarRadiation: solarRadiationDataResponse.estimated_actuals[0].dhi,
          });
        }
        setWeatherLoading(false);
      } catch (err) {
        throw `${err}`;
      }
    };

    getWeatherData();
  }, []);

  return (
    <div className="w-full flex-col gap-4 flex">
      <HeaderSection header="Laporan Cuaca">
        <div className={clsx("flex flex-row")}>
          <p
            className={clsx(
              " items-center justify-center text-sm text-gray-500"
            )}
          >
            {Date.now() ? (
              Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(Date.now())
            ) : (
              <Skeleton></Skeleton>
            )}
            |{" "}
            <span>
              {" "}
              {weatherData.city ? weatherData.city : <Skeleton></Skeleton>}
            </span>
          </p>
          <div className="icon relative h-5 w-4 ml-2">
            <Image
              src="/img/icon/location.svg"
              alt="profile image"
              height={5}
              width={4}
            ></Image>
          </div>
        </div>
      </HeaderSection>

      <div
        className={clsx(
          "w-full gap-5 container flex-row flex justify-between  "
        )}
      >
        <CardIcon
          type="temperatur"
          value={
            weatherData.temperature ? (
              `${weatherData.temperature} C`
            ) : (
              <Skeleton height={20} width={100}></Skeleton>
            )
          }
          name="Temperatur"
        ></CardIcon>
        <CardIcon
          type="humadity"
          value={
            weatherData.humidity ? (
              `${weatherData.humidity} %`
            ) : (
              <Skeleton height={20} width={100}></Skeleton>
            )
          }
          name="Kelembapan Udara"
        ></CardIcon>
        <CardIcon
          type="sun-radiation"
          value={
            weatherData.solarRadiation ? (
              `${weatherData.solarRadiation} mm/day`
            ) : (
              <Skeleton height={20} width={100}></Skeleton>
            )
          }
          name="Radiasi matahari"
        ></CardIcon>
      </div>
    </div>
  );
};

export default Weather;
