import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { SMART_CONTRACT_ADDRESS } from "../../lib/constants";
import { useState } from "react";
import { Tooltip } from '@mui/material';
import Image from "next/image";

export default function RegisterVehicle() {
  const [contactNumber, setContactNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  
  const [vehicleData, setVehicleData] = useState({
    ownerName: "",
    contactNumber: "",
    number: "",
    model: "",
    color: "",
    category: "",
    chassisNumber: "",
  });
  const { contract } = useContract(SMART_CONTRACT_ADDRESS);
  const {
    mutateAsync: requestVehicleRegistration,
    isLoading: isLoadingRequestVehicleRegistration,
  } = useContractWrite(contract, "requestVehicleRegistration");

  const callRequestVehicleRegistration = async () => {
    try {
      const data = await requestVehicleRegistration({
        args: [
          vehicleData.ownerName,
          vehicleData.contactNumber,
          vehicleData.number,
          vehicleData.model,
          vehicleData.color,
          vehicleData.category,
          vehicleData.chassisNumber,
        ],
      });
      console.info("contract call successs", data);
      alert("please wait while owner is viewing your register request");
    } catch (err) {
      console.error("contract call failure", err.reason);
      alert(err.reason);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange_contact = (e) => {
    const { name, value } = e.target;
    const isValidIndianPhoneNumber = /^[6-9]\d{9}$/.test(value);
    setContactNumber(value);
    setError1(!isValidIndianPhoneNumber);

    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange_chassis = (e) => {
    const { name, value } = e.target;
    const isValidChassisNumber = /^[a-zA-Z0-9][a-zA-Z]{4}\d{5}[a-zA-Z]\d{6}$/.test(value);
    setChassisNumber(value);
    setError2(!isValidChassisNumber);

    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
    {/* "bg-gradient-to-br from-[#14000b] to-[#1f1b1d] min-h-screen py-10" */}
    <div className="bg-cover bg-no-repeat bg-center bg-fixed bg-top min-h-screen py-10" style={{backgroundImage: "url('/images/cybertruck_orig.jpg')"}}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center ">
            {/* <div className="w-full lg:w-1/2 mb-8 lg:mb-0 hidden lg:flex">
              <Image
                src="/images/cybertruck.jpg"
                alt="Side Image"
                width={10000}
                height={60000}
                className="object-cover w-full h-full rounded-lg"
              />
            </div> */}
            <div className="w-full lg:w-1/2">
              <div className="mt-10 px-6">
                <p className="text-2xl font-extrabold leading-tight text-white">
                  Vehicle Registration
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-base font-medium leading-none text-white">
                      Name
                    </p>
                    <input
                      placeholder="Enter your name..."
                      name="ownerName"
                      onChange={handleInputChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-none text-white">
                      Contact Number
                    </p>
                    <Tooltip
                      open={error1}
                      title="Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9."
                      placement="right"
                    >
                      <input
                        placeholder="Enter your Indian contact number"
                        name="contactNumber"
                        value={contactNumber}
                        onChange={handleInputChange_contact}
                        className={`w-full p-3 mt-2 border ${error1 ? 'border-red-500' : 'border-gray-300'} rounded outline-none focus:bg-gray-50`}
                      />
                    </Tooltip>

                  </div>
                  <div>
                    <p className="text-base font-medium leading-none text-white">
                      Vehicle Number
                    </p>
                    <input
                      placeholder="Enter vehicle number"
                      name="number"
                      onChange={handleInputChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-none text-white">
                      Vehicle Model
                    </p>
                    <input
                      placeholder="Enter vehicle model"
                      name="model"
                      onChange={handleInputChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-none text-white">
                      Vehicle Color
                    </p>
                    <input
                      placeholder="Enter vehicle color"
                      name="color"
                      onChange={handleInputChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-none text-white">
                      Vehicle Category
                    </p>
                    <input
                      placeholder="Enter vehicle category"
                      name="category"
                      onChange={handleInputChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded outline-none focus:bg-gray-50"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium leading-none text-white">
                      Vehicle Chassis Number
                    </p>
                    <Tooltip
                      open={error2}
                      title="Please enter a valid 17-digit chassis number. Character 1 can be a letter or a numeric value. Characters 2-5 can be a letter only. Characters 6-10 can be numeric only. Character 11 can be a letter only. Characters 12-17 can be a numeric only."
                      placement="right"
                    >
                      <input
                        placeholder="Enter vehicle chassis number"
                        name="chassisNumber"
                        value={chassisNumber}
                        onChange={handleInputChange_chassis}
                        className={`w-full p-3 mt-2 border ${error2 ? 'border-red-500' : 'border-gray-300'} rounded outline-none focus:bg-gray-50`}
                      />
                    </Tooltip>
                  </div>
                  <div>
                    {isLoadingRequestVehicleRegistration ? (
                      <button
                        type="button"
                        className="bg-indigo-700 inline-flex items-center justify-center whitespace-nowrap lg:mt-6 w-full rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white "
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
                        onClick={callRequestVehicleRegistration}
                        className="bg-indigo-700 whitespace-nowrap lg:mt-6 w-full rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white "
                      >
                        Register Vehicle
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
