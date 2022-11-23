import React from "react";
import clsx from "clsx";

const Table = ({ data }) => {
  // console.log(`ini data table ${JSON.stringify(data)}`);
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-blue-100 ">
        <thead className="text-xs text-gray-900 uppercase bg-gray-100 ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Waktu
            </th>
            <th scope="col" className="py-3 px-6">
              Kelembapan Tanah (%)
            </th>
            <th scope="col" className="py-3 px-6">
              Penggunaan Air (ml)
            </th>
            <th scope="col" className="py-3 px-6">
              Status Pompa
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((content, i) => {
            console.log(data)
            return (
              <tr
              className={clsx(
                "bg-white border-b  border-gray-200 ",
                i > data.length - 2 && "hidden"
              )}
              key={i}
            >
                <th
                  scope="row"
                  className="py-4 px-6  font-medium  text-gray-500 whitespace-nowrap "
                >
                  {content.timestampData}
                </th>
                <td className="py-4 px-6  text-gray-500">
                  {content.soilMoisture}
                </td>

                <td className="py-4 px-6 text-gray-500">  {i == data.length 
                    ? Math.abs(data[i].waterFlow)
                    : Math.abs(data[i].waterFlow - data[i + 1]?.waterFlow)}
               </td>
                <td className="py-4 px-6 text-gray-500">{content.pumpState}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
