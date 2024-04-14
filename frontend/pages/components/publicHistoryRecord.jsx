import { SMART_CONTRACT_ADDRESS } from "../../lib/constants";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { convertTimestampToTime } from "../../lib/timestampToTime";

export default function PublicHistory({ number }) {
  const { contract } = useContract(SMART_CONTRACT_ADDRESS);
  const { data: getVehicleDetails } = useContractRead(
    contract,
    "getVehicleDetails",
    [number]
  );

  return (
    <>
      <div className="bg-[#14000b] text-white rounded-lg shadow p-4 md:p-5">
        <span className="font-bold mb-0 pb-0">History</span>
        {getVehicleDetails && getVehicleDetails?.length > 0 ? (
          getVehicleDetails.map((item, index) => (
            <div key={index}>
              <button className="group relative">
                <span className="text-xs">{item[2]}</span>
                <span className="hidden text-sm group-hover:inline-block absolute bottom-4 z-10 right-3 bg-white text-black p-2 rounded-md">
                  <p>Owner Name : {item[0]}</p>
                  <p>Contact Number : {item[1]}</p>
                  <p>Start Date : {convertTimestampToTime(String(item[3]))}</p>
                  <p>End Date : {convertTimestampToTime(String(item[4]))}</p>
                </span>
              </button>
            </div>
          ))
        ) : (
          <p className="italic">No history found</p>
        )}
      </div>
    </>
  );
}
