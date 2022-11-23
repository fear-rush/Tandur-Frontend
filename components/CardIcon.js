import React from "react";
import clsx from "clsx";
import Icon from "./Icon";

// className={clsx("")}

const CardIcon = ({ type, value, name }) => {
  // console.log(type);
  return (
    <div
      className={clsx(
        "flex rounded-md border border-solid border-gray-200  ",
        "shadow-md w-full flex-row px-6 py-6"
      )}
    >
      <Icon
        icon={
          type == "temperatur"
            ? "/img/icon/thermometer.svg"
            : type == "humadity"
            ? "/img/icon/circle.svg"
            : type == "sun-radiation"
            ? "/img/icon/sun.svg"
            : ""
        }
      ></Icon>
      <div
        className={clsx(
          "weather-information ml-5 flex flex-col justify-center"
        )}
      >
        <h1 className={clsx("text-gray-500 text-sm")}>{name}</h1>
        <div className={clsx("flex-row flex  items-center")}>
          <h1 className={clsx("text-gray-900  font-bold text-2xl")}>
            {" "}
            {value}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CardIcon;
