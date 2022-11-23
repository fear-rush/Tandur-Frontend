import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";

const Cardbase = ({ value, name, pastValue, newValue }) => {
  const [isIncrease, setIsIncrease] = useState(true);

  useEffect(() => {
    if (pastValue > newValue) {
      setIsIncrease(false);
    } else if (pastValue < newValue) {
      setIsIncrease(true);
    }
    // console.log(isIncrease);
  }, [pastValue]);

  return (
    <div
      className={clsx(
        "flex    border-r border-solid border-gray-200  ",
        " w-full flex-row px-6 py-6 h-full"
      )}
    >
      <div
        className={clsx(
          "weather-information ml-5 flex flex-col justify-center"
        )}
      >
        <h1 className={clsx("text-gray-900 text-base")}>{name}</h1>
        <div className={clsx("flex-row flex gap-5  items-end")}>
          <h1 className={clsx(" text-indigo-600  font-bold text-2xl")}>
            {value}
          </h1>
          {pastValue && (
            <>
              <span
                className={clsx(
                  "bg-red-100 text-red-800 flex  justify-center items-center flex-row text-sm font-medium mr-2 px-2.5 py-1 rounded dark:bg-red-200 dark:text-red-900",
                  isIncrease && "!bg-green-100 !text-green-800"
                )}
              >
                <div
                  className={clsx(
                    "icon relative flex mr-2 justify-center items-center h-4  w-4 ",
                    !isIncrease && "rotate-180"
                  )}
                >
                  <Image
                    src="/img/icon/arrow.svg"
                    alt="profile image"
                    height={10}
                    width={10}
                  ></Image>
                </div>
                {Math.abs(newValue - pastValue)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cardbase;
