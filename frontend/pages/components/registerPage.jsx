import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { SMART_CONTRACT_ADDRESS } from "../../lib/constants";
import Link from "next/link";
export default function RegisterPage() {
  const address = useAddress("");
  const { contract } = useContract(SMART_CONTRACT_ADDRESS);
  const { mutateAsync: registerUser, isLoading: isLoadingRegisterUser } =
    useContractWrite(contract, "registerUser");

  const { data: users, isLoading: isLoadingUser } = useContractRead(
    contract,
    "users",
    [address]
  );

  const { data: getAllVehicles } = useContractRead(
    contract,
    "getAllVehicles",
    []
  );
  const { data: userCounter } = useContractRead(contract, "userCounter", []);

  const callRegisterUser = async () => {
    try {
      const data = await registerUser({ args: [] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <div className="bg-[#14000b] min-h-screen">
      <div className="container mx-auto flex flex-col justify-center items-center py-12 sm:py-24">
        <div className="w-11/12 sm:w-2/3 mx-auto flex flex-col justify-center items-center mb-5 sm:mb-10 pt-5 sm:pt-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-black leading-7 md:leading-10 ml-5 mr-5 sm:ml-0 sm:mr-0">
            Secure Your Vehicle Record with a
            <span className="text-indigo-700"> Decentralized </span>Application
          </h1>
          <section className="grid gap-6 md:grid-cols-2 md:gap-16 mt-5 mx-auto">
            <h2 className="text-center">
              <span className="flex text-white text-5xl font-extrabold mb-2 ">
                <span>{(userCounter && String(userCounter)) || 0}</span>
              </span>
              <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                Users
              </span>
            </h2>
            <h2 className="text-center">
              <span className="flex text-white text-5xl font-extrabold mb-2 ">
                5{/* <span>{(getAllVehicles && getAllVehicles.length) || 0}</span> */}
              </span>
              <span className="inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 mb-2">
                Vehicles
              </span>
            </h2>
          </section>
          <p className="mt-5 sm:mt-10 lg:w-10/12 text-white font-normal text-center text-sm sm:text-lg ">
            Elevate your vehicle fleet management to a new level. Seize command
            of your transportation assets and safeguard your vehicles like never
            before
          </p>
        </div>
        <div className="flex gap-5 ">
          <div>
            {address ? (
              <>
                {isLoadingRegisterUser ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <>
                    {users ? (
                      <div className="flex gap-5">
                        <Link
                          href="/registerVehicle"
                          className="flex justify-center items-center hover:text-[#14000b] hover:bg-[#35ccdd] hover:border-[#35ccdd] border border-1 border-[#35ccdd] p-4 text-white rounded-lg"
                        >
                          Go to Dashboard
                        </Link>
                        <Link
                          href="/public-view"
                          className="flex justify-center items-center  hover:text-[#14000b] hover:bg-[#35ccdd] hover:border-[#35ccdd] border border-1 border-[#35ccdd] p-4 text-white rounded-lg"
                        >
                          Public View
                        </Link>
                      </div>
                    ) : (
                      <div className="flex gap-5">
                        <button
                          onClick={callRegisterUser}
                          className="flex justify-center items-center hover:text-[#14000b] hover:bg-[#35ccdd] hover:border-[#35ccdd] border border-1 border-[#35ccdd] p-4 text-white rounded-lg"
                        >
                          Register User
                        </button>
                        <div>
                          <Link
                            href="/public-view"
                            className="flex justify-center items-center  hover:text-[#14000b] hover:bg-[#35ccdd] hover:border-[#35ccdd] border border-1 border-[#35ccdd] p-4 text-white rounded-lg"
                          >
                            Public View
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <ConnectWallet />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
