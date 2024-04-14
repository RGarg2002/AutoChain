import React, { useState } from "react";
import { SMART_CONTRACT_ADDRESS } from "../../lib/constants";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import PublicHistory from "./publicHistoryRecord";

export default function PublicView() {
  const [inputVehicleNum, setInputVehicleNum] = useState();
  const { contract } = useContract(SMART_CONTRACT_ADDRESS);
  const { data: getAllVehicles } = useContractRead(
    contract,
    "getAllVehicles",
    []
  );

  const filterVehicleRecord = getAllVehicles?.filter((item) => {
    return item.number === inputVehicleNum && item.status === 1;
  });

  return (
    <>
      <div className="bg-[#14000b] min-h-screen w-full flex items-center justify-center mx-auto">
        <div className="bg-[#30292c] shadow rounded-2xl w-full mx-4 lg:w-96 md:mx-10">
          <div className="m-5 mb-2">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  setInputVehicleNum(e.target.value);
                }}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                placeholder="Enter vehicle number..."
              />
            </div>
          </div>
          <div className="px-5 md:px-10 pb-10">
            <div className="mt-5">
              <div className="text-center mb-5 flex flex-row items-center justify-between">
                <h2 className="mb-3 xl:mb-0 xl:mr-4 text-2xl text-white font-medium tracking-normal">
                  {filterVehicleRecord && filterVehicleRecord.length > 0 ? (
                    filterVehicleRecord[0]?.chassisNumber
                  ) : (
                    <>000</>
                  )}
                </h2>
                <div className="text-sm bg-green-700 text-white px-5 lg:me-20 py-1 mb-4 sm:mb-0 font-normal rounded-full">
                  Verified
                </div>
              </div>
              <p className="text-start mt-2 text-xs sm:text-sm tracking-normal text-white leading-5">
                {filterVehicleRecord && filterVehicleRecord.length > 0 ? (
                  filterVehicleRecord[0]?.owner
                ) : (
                  <>0x00000....</>
                )}
              </p>
            </div>
            <div className="w-full py-3 md:py-5 flex flex-row items-start justify-center">
              <div className="mr-2 md:mr-6 xl:mr-10">
                <h2 className="text-white font-bold text-md md:text-xl leading-6 mb-2 text-center">
                  {filterVehicleRecord && filterVehicleRecord.length > 0 ? (
                    filterVehicleRecord[0]?.color
                  ) : (
                    <>.......</>
                  )}
                </h2>
                <p className="text-white text-sm md:text-md leading-5">Color</p>
              </div>
              <div className="mr-2 md:mr-6 xl:mr-10">
                <h2 className="text-white font-bold text-md md:text-xl leading-6 mb-2 text-center">
                  {filterVehicleRecord && filterVehicleRecord.length > 0 ? (
                    filterVehicleRecord[0]?.model
                  ) : (
                    <>0000</>
                  )}
                </h2>
                <p className="text-white text-sm md:text-md leading-5">Model</p>
              </div>
              <div>
                <h2 className="text-white font-bold text-md md:text-xl leading-6 mb-2 text-center">
                  {filterVehicleRecord && filterVehicleRecord.length > 0 ? (
                    filterVehicleRecord[0]?.number
                  ) : (
                    <>00000</>
                  )}
                </h2>
                <p className="text-white text-sm md:text-md leading-5">
                  Number
                </p>
              </div>
            </div>
            <div className="w-full flex-col justify-center flex">
              {filterVehicleRecord && filterVehicleRecord.length > 0 ? (
                <PublicHistory number={filterVehicleRecord[0]?.number} />
              ) : (
                <div className="relative bg-[#14000b] text-white rounded-lg shadow">
                  <div className="p-3 md:p-5 space-y-4">No record found</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
