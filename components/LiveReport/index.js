import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Alert from "../Alert";
import CardBase from "../CardBase";
import Table from "../Table";
import HeaderSection from "../HeaderSection";
import io from "socket.io-client";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../config/firebaseconfig";

// Set fetchURL based on environment
const env = process.env.NODE_ENV;
let fetchUrl;
if (env == "development") {
  // fetchUrl = "http://localhost:4000";
  fetchUrl = "https://tandur-server.up.railway.app";
} else if (env == "production") {
  fetchUrl = "https://tandur-server.up.railway.app";
}

const LiveReport = ({ data }) => {
  const [liveDataLoading, setLiveDataLoading] = useState(true);
  const [liveAntaresData, setLiveAntaresData] = useState([]);
  const [monthlyTemp, setMonthlyTemp] = useState({
    monthlyTempMax: 0,
    monthlyTempMin: 0,
  });
  // const [dailyTemp, setDailyTemp] = useState({
  //   dailyTempMax: 0,
  //   dailyTempMin: 0,
  // });

  const [solarData, setSolarData] = useState({
    dailyExtraTerrestrial: 0,
    dailyTempMax: 0,
    dailyTempMin: 0,
  });
  const [userProfile, setUserProfile] = useState({});
  const [estimatedWater, setEstimatedWater] = useState();

  const dataFetchedRef = useRef(false);
  const { user } = useAuth();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const todayDate = todayStr.replace(/-/g, "");

  // Format date to DD MMMM YYYY hh mm ss. example: 20 November 2022 12:34:42
  const dateFormat = (time) => {
    const date = moment(time, "YYYYMMDDThhmmss");
    const formattedDate = date.format("YYYY MMMM DD hh mm ss");
    const splitString = formattedDate.split(" ");
    const finalDate = `${splitString[2]} ${splitString[1]} ${splitString[0]} ${splitString[3]}:${splitString[4]}:${splitString[5]}`;
    return finalDate;
  };

  const hargreavesFunction = () => {
    const constant = 0.0023;
    const tempAccumulativeConstant = 17.8;
    const areaCovered = 70;
    // const Ra = solarData.dailyExtraTerrestrial * 0.03521;
    // const delta = Math.sqrt(solarData.dailyTempMax - solarData.dailyTempMin);
    // const tempConstant =
    (solarData.dailyTempMax + solarData.dailyTempMin) / 2 + 17.8;
    const ET0 =
      constant *
      (solarData.dailyExtraTerrestrial * 0.03521) *
      Math.sqrt(solarData.dailyTempMax - solarData.dailyTempMin) *
      ((solarData.dailyTempMax + solarData.dailyTempMin) / 2 +
        tempAccumulativeConstant);
    const ETp = ET0 * userProfile.plantType;
    const ETpc = ETp * (0.1 * Math.sqrt(areaCovered));
    const waterPerDay = ETpc * 0.01 * 900 * 0.01 * 1000;
    return `${waterPerDay.toFixed(0)} ml`;
  };

  useEffect(() => {
    // useEffect debouncer to prevent data inserted twice
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    //socketIO listening on testdata identifier and receive timestamp and sensorDataObj
    const socket = io(fetchUrl, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.emit("login", user.uid);
    socket.on("antaresdata", ({ timestamp, sensorDataObj }) => {
      const sensorData = sensorDataObj.data;
      const soilMoistureData = sensorData.split("-")[0];
      const waterFlowData = sensorData.split("-")[1];
      const pumpStateData = sensorData.split("-")[2];
      setLiveAntaresData((liveData) => [
        {
          timestampData: dateFormat(timestamp),
          soilMoisture: soilMoistureData,
          waterFlow: waterFlowData,
          pumpState: pumpStateData,
        },
        ...liveData,
      ]);
      // console.log(`ini post data ${sensorData}`);
    });

    socket.on("historicaldata", (historicData) => {
      // console.log(historicData);
      const dailyHistoricalData = historicData.at(-1).sensorData;
      dailyHistoricalData.map((data) => {
        // const liveDataResponse = data["m2m:cin"];
        const { ct: timestamp, con: sensorDataObj } = data;
        const sensorData = JSON.parse(sensorDataObj);
        const soilMoistureData = sensorData.data.split("-")[0];
        const waterFlowData = sensorData.data.split("-")[1];
        const pumpStateData = sensorData.data.split("-")[2];
        setLiveAntaresData((liveData) => [
          {
            timestampData: dateFormat(timestamp),
            soilMoisture: soilMoistureData,
            waterFlow: waterFlowData,
            pumpState: pumpStateData,
          },
          ...liveData,
        ]);
      });

      const getMonthlyTemperature = async () => {
        const month = today.getMonth() + 1;
        console.log(`ini month ${month}`);
        const monthlyTemperatureResponse = await fetch(
          `https://history.openweathermap.org/data/2.5/aggregated/month?month=${month}&lat=-7.797068&lon=110.370529&appid=624f5da0ebac0863771207732b77aaa2`
        );
        const monthlyResponse = await monthlyTemperatureResponse.json();
        const monthlyTempMaxData = monthlyResponse.result.temp.record_max;
        const monthlyTempMinData = monthlyResponse.result.temp.record_min;

        setMonthlyTemp({
          monthlyTempMax: monthlyTempMaxData - 273,
          monthlyTempMin: monthlyTempMinData - 273,
        });
      };


      const getSolarData = async () => {
        const extraTerrestrialResponse = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Yogyakarta?unitGroup=metric&elements=tempmax%2Ctempmin%2Csolarradiation&include=days&key=${process.env.VISUALCROSSING_KEY}&contentType=json`
        );
        const solarResponse = await extraTerrestrialResponse.json();
        const solarResponseData = solarResponse.days[0];
        setSolarData({
          dailyExtraTerrestrial: solarResponseData.solarradiation,
          dailyTempMax: solarResponseData.tempmax,
          dailyTempMin: solarResponseData.tempmin,
        });
      };

      const userDocRef = doc(db, "user", user.uid);
      const getUserData = async () => {
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserProfile(userData);
            setUserLoading(false);
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (err) {
          throw `${err}`;
        }
      };

      getUserData();
      getMonthlyTemperature();
      getSolarData();
      hargreavesFunction();
      setLiveDataLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex-col gap-4 flex">
      <HeaderSection header="Laporan Langsung">
        <div className={clsx("flex flex-row")}>
          <p
            className={clsx(
              " items-center justify-center text-sm text-gray-500"
            )}
          >
            {!liveDataLoading && liveAntaresData[0]?.timestampData
              ? liveAntaresData[0].timestampData
              : Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(Date.now())}
          </p>
        </div>
      </HeaderSection>

      <div
        className={clsx("w-full gap-5 container flex-col flex justify-between")}
      >
        <div
          className={clsx(
            "w-full flex mb-4 flex-row overflow-hidden shadow-md  border border-solid border-gray-200 rounded-md "
          )}
        >
          <CardBase
            value={
              liveAntaresData.length === 0 ? (
                `0`
              ) : liveAntaresData[0]?.soilMoisture ? (
                `${liveAntaresData[0].soilMoisture} %`
              ) : (
                <Skeleton height={20} width={100}></Skeleton>
              )
            }
            newValue={
              !liveDataLoading && liveAntaresData[1]?.soilMoisture
                ? liveAntaresData[1].soilMoisture
                : `0`
            }
            pastValue={
              !liveDataLoading && liveAntaresData[0]?.soilMoisture
                ? liveAntaresData[0].soilMoisture
                : `0`
            }
            name="Kelembapan Tanah"
          ></CardBase>
          <CardBase
            value={
              liveAntaresData.length === 0 ? (
                `0`
              ) : liveAntaresData[0]?.waterFlow ? (
                `${liveAntaresData[0].waterFlow} ml`
              ) : (
                <Skeleton height={20} width={100}></Skeleton>
              )
            }
            newValue={
              !liveDataLoading && liveAntaresData[0]?.waterFlow
                ? liveAntaresData[0].waterFlow
                : `0`
            }
            pastValue={
              !liveDataLoading && liveAntaresData[1]?.waterFlow
                ? liveAntaresData[1].waterFlow
                : `0`
            }
            name="Penggunaan Air"
          ></CardBase>
          <CardBase
            value={
              hargreavesFunction() ? (
                hargreavesFunction()
              ) : (
                <Skeleton height={20} width={100}></Skeleton>
              )
            }
            name="Estimasi Kebutuhan Air"
          ></CardBase>
          <CardBase
            value={
              liveAntaresData.length === 0 ? (
                `-`
              ) : liveAntaresData[0]?.pumpState ? (
                `${liveAntaresData[0].pumpState}`
              ) : (
                <Skeleton height={20} width={100}></Skeleton>
              )
            }
            name="Status Pompa"
          ></CardBase>
        </div>

        <div className="Table">
          <Table data={liveAntaresData}></Table>
        </div>
      </div>
    </div>
  );
};

export default LiveReport;
