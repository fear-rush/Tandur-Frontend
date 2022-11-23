import React from "react";
import clsx from "clsx";
import HeaderSection from "../HeaderSection";
import CardBase from "../CardBase";
import Table from "../Table";

const MonthlyReport = ({ data }) => {
  return (
    <div className="w-full flex-col gap-4 flex">
      <HeaderSection header="Laporan Bulanan">
        <div className={clsx("flex flex-row")}>
          <p
            className={clsx(
              " items-center justify-center text-sm text-gray-500"
            )}
          >
            {" "}
            Bulan ke-
            {data[0].date}
          </p>
        </div>
      </HeaderSection>

      <div
        className={clsx("w-full gap-5 container flex-col flex justify-between")}
      >
        <div
          className={clsx(
            "w-full flex flex-row mb-4 overflow-hidden shadow-md  border border-solid border-gray-200 rounded-md "
          )}
        >
          {/* <CardBase type="temperatur" data={data[0].data[0]} name="Temperatur"></CardBase>
          <CardBase type="humadity" data={data[0].data[1]} name="Kelembapan"></CardBase>
          <CardBase type="water" data={data[0].data[2]} name="Penggunaan Air"></CardBase> */}
        </div>

        <div className="Table">
          {/* <Table data={data[0]}></Table> */}
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
