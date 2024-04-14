export const SMART_CONTRACT_ADDRESS =
  "0x0d29965E4bE65A73fd7B1B68DEEb206B3bc59973";
export const SMART_CONTRACT_ABI = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approveVehicleRegistration",
    inputs: [
      {
        type: "string",
        name: "_number",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllVehicles",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "string",
            name: "ownerName",
            internalType: "string",
          },
          {
            type: "string",
            name: "contact",
            internalType: "string",
          },
          {
            type: "string",
            name: "model",
            internalType: "string",
          },
          {
            type: "string",
            name: "color",
            internalType: "string",
          },
          {
            type: "string",
            name: "number",
            internalType: "string",
          },
          {
            type: "string",
            name: "category",
            internalType: "string",
          },
          {
            type: "string",
            name: "chassisNumber",
            internalType: "string",
          },
          {
            type: "address",
            name: "owner",
            internalType: "address",
          },
          {
            type: "uint8",
            name: "status",
            internalType: "enum VehicleManagement.RequestStatus",
          },
        ],
        internalType: "struct VehicleManagement.Vehicle[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVehicleDetails",
    inputs: [
      {
        type: "string",
        name: "_number",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {
            type: "string",
            name: "newOwnerName",
            internalType: "string",
          },
          {
            type: "string",
            name: "newOwnerContact",
            internalType: "string",
          },
          {
            type: "address",
            name: "owner",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "registrationTime",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "ownershipEndTime",
            internalType: "uint256",
          },
        ],
        internalType: "struct VehicleManagement.Ownership[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerUser",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rejectVehicleRegistration",
    inputs: [
      {
        type: "string",
        name: "_number",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestVehicleRegistration",
    inputs: [
      {
        type: "string",
        name: "_ownerName",
        internalType: "string",
      },
      {
        type: "string",
        name: "_contact",
        internalType: "string",
      },
      {
        type: "string",
        name: "_number",
        internalType: "string",
      },
      {
        type: "string",
        name: "_model",
        internalType: "string",
      },
      {
        type: "string",
        name: "_color",
        internalType: "string",
      },
      {
        type: "string",
        name: "_category",
        internalType: "string",
      },
      {
        type: "string",
        name: "_chassisNumber",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userCounter",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "users",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "bool",
        name: "registered",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vehicleCounter",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vehicleOwnershipTransfer",
    inputs: [
      {
        type: "string",
        name: "_number",
        internalType: "string",
      },
      {
        type: "address",
        name: "_newOwner",
        internalType: "address",
      },
      {
        type: "string",
        name: "_newOwnerName",
        internalType: "string",
      },
      {
        type: "string",
        name: "_newOwnerContact",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vehicles",
    inputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "ownerName",
        internalType: "string",
      },
      {
        type: "string",
        name: "contact",
        internalType: "string",
      },
      {
        type: "string",
        name: "model",
        internalType: "string",
      },
      {
        type: "string",
        name: "color",
        internalType: "string",
      },
      {
        type: "string",
        name: "number",
        internalType: "string",
      },
      {
        type: "string",
        name: "category",
        internalType: "string",
      },
      {
        type: "string",
        name: "chassisNumber",
        internalType: "string",
      },
      {
        type: "address",
        name: "owner",
        internalType: "address",
      },
      {
        type: "uint8",
        name: "status",
        internalType: "enum VehicleManagement.RequestStatus",
      },
    ],
    stateMutability: "view",
  },
];
