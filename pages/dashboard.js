import React from "react";

import Profile from "../components/Profile";
import Weather from "../components/Weather";
import LiveReport from "../components/LiveReport";

// className={clsx("")}

// const fetcher = (url) => fetch(url).then((res) => res.json());

const Dashboard = () => {
  return (
    <div className="flex gap-14 my-8 flex-col justify-center items-center w-full">
      <Profile />
      <Weather />
      <LiveReport />
      {/* <MonthlyReport data={dataMonthlyReport}></MonthlyReport> */}
    </div>
  );
};

export default Dashboard;
