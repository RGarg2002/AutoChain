import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { SMART_CONTRACT_ADDRESS } from "../../lib/constants";
import { useState } from "react";
import Image from "next/image";

export default function Transfer() {
  const { contract } = useContract(SMART_CONTRACT_ADDRESS);
  const address = useAddress();

  const [transferOwnerShipData, setTransferOwnerShipData] = useState({
    number: "",
    newOwner: "",
    newOwnerName: "",
    newOwnerContactNumber: "",
  });

  const { data: getAllVehicles } = useContractRead(
    contract,
    "getAllVehicles",
    []
  );

  const filterVehicle = getAllVehicles?.filter((item) => {
    return item.owner === address && item.status === 1;
  });

  const {
    mutateAsync: vehicleOwnershipTransfer,
    isLoading: isLoadingVehicleOwnershipTransfer,
  } = useContractWrite(contract, "vehicleOwnershipTransfer");

  const callVehicleOwnershipTransfer = async () => {
    if (
      transferOwnerShipData.number === "" ||
      transferOwnerShipData.newOwner === "" ||
      transferOwnerShipData.newOwnerName === "" ||
      transferOwnerShipData.newOwnerContactNumber === ""
    ) {
      return alert("field is empty");
    } else {
      try {
        const data = await vehicleOwnershipTransfer({
          args: [
            transferOwnerShipData.number,
            transferOwnerShipData.newOwner,
            transferOwnerShipData.newOwnerName,
            transferOwnerShipData.newOwnerContactNumber,
          ],
        });
        transferOwnerShipData.number === "";
        transferOwnerShipData.newOwner === "";
        transferOwnerShipData.newOwnerName === "";
        transferOwnerShipData.newOwnerContactNumber === "";
        console.info("contract call successs", data);
      } catch (err) {
        console.error("contract call failure", err.reason);
        alert(err.reason);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferOwnerShipData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="bg-cover bg-no-repeat bg-center bg-fixed bg-top min-h-screen py-10" style={{backgroundImage: "url('/images/cybertruck_orig.jpg')"}}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center ">
          <div className="w-full lg:w-1/2">
            <div className="mt-10 px-6 w-full">
              <p className="text-2xl font-extrabold leading-6 text-white">
                Transfer Vehicle Ownership
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="mt-2">
                  <label
                    htmlFor="vehicleNumber"
                    className="text-base font-medium leading-none text-white"
                  >
                    Vehicle Number
                  </label>
                  <select
                    id="vehicleNumber"
                    onChange={handleInputChange}
                    name="number"
                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                  >
                    <option value="" selected disabled>
                      Select a vehicle number
                    </option>

                    {filterVehicle &&
                      filterVehicle.map((item, index) => {
                        return (
                          <option key={index} value={item.number}>
                            {item.number}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="mt-2">
                  <p className="text-base font-medium leading-none text-white">
                    New Owner Address
                  </p>
                  <input
                    placeholder="Enter transfer address"
                    onChange={handleInputChange}
                    name="newOwner"
                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-base font-medium leading-none text-white">
                    New Owner Name
                  </p>
                  <input
                    placeholder="Enter transfer owner name"
                    onChange={handleInputChange}
                    name="newOwnerName"
                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-base font-medium leading-none text-white">
                    New Owner Contact
                  </p>
                  <input
                    placeholder="Enter transsfer owner contact"
                    onChange={handleInputChange}
                    name="newOwnerContactNumber"
                    className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                  />
                </div>
                <div className="mt-2">
                  {isLoadingVehicleOwnershipTransfer ? (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center bg-indigo-700 whitespace-nowrap rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white  w-full "
                      disabled=""
                    >
                      <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button
                      onClick={callVehicleOwnershipTransfer}
                      className=" text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                    >
                      Transfer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 hidden lg:flex">
            {/* <Image
              src="/images/transfer.png"
              alt="Side Image"
              width={1000}
              height={60000}
              className="object-cover w-full h-full rounded-lg"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
