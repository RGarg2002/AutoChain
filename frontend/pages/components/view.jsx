import { SMART_CONTRACT_ADDRESS } from "../../lib/constants";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import History from "../model/history";

export default function View() {
  const address = useAddress();
  const { contract } = useContract(SMART_CONTRACT_ADDRESS);
  const { data: getAllVehicles } = useContractRead(
    contract,
    "getAllVehicles",
    []
  );

  const filterVehicle = getAllVehicles?.filter((item) => {
    return item.owner === address;
  });

  return (
    <>
      <div className="bg-cover bg-no-repeat bg-center bg-fixed bg-top min-h-screen py-10" style={{backgroundImage: "url('/images/cybertruck_orig.jpg')"}}>
        <div className="shadow px-4 lg:mt-0 md:mt-10 mt-20 sm:mt-0 md:px-10 lg:pt-0 md:pt-0 pb-5 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-white">
                <th className="font-normal text-left pl-4">S No.</th>
                <th className="font-normal text-left pl-12">Number</th>
                <th className="font-normal text-left pl-12">Modal</th>
                <th className="font-normal text-left pl-12">Color</th>
                <th className="font-normal text-left pl-20">Category</th>
                <th className="font-normal text-left pl-20">ChassisNumber</th>
                <th className="font-normal text-left pl-20">Status</th>
                <th className="font-normal text-left pl-16">History</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filterVehicle &&
                filterVehicle.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="h-20 text-sm leading-none text-white  hover:bg-[#3a3136]"
                    >
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="">
                            <p className="font-medium">{index + 1}</p>
                          </div>
                        </div>
                      </td>

                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-white">
                          {item.number}
                        </p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{item.model}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{item.color}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{item.category}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{item.chassisNumber}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">
                          {item.status === 0 ? (
                            <p className="text-yellow-500">In Process</p>
                          ) : item.status === 1 ? (
                            <p className="text-green-500">Accept</p>
                          ) : (
                            <p className="text-red-500">Reject</p>
                          )}
                        </p>
                      </td>
                      <td className="pl-16">
                        {item.status === 1 ? (
                          <History number={item.number} />
                        ) : (
                          <p>No history</p>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
