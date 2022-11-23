import React from "react";
import clsx from "clsx";

const HeaderSection = ({ header, children }) => {
  return (
    <div className={clsx("w-full  flex justify-between items-center ")}>
      <h1 className={clsx("text-gray-900 text-lg font-bold")}>{header}</h1>
      {children}
    </div>
  );
};

export default HeaderSection;
