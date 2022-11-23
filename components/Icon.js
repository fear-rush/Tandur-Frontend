import React from "react";
import clsx from "clsx";
import Image from "next/image";

// className={clsx("")}
const Icon = ({ icon }) => {
  return (
    <div
      className={clsx(
        "h-12 w-12 rounded-md  flex justify-center items-center bg-emerald-500"
      )}
    >
      <div className="icon relative h-6 w-6">
        <Image src={icon} alt="profile image" height={100} width={100}></Image>
      </div>
    </div>
  );
};

export default Icon;
