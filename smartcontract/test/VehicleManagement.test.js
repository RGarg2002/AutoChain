const { ethers } = require("hardhat");

describe("VehicleManagement Smart Contract", function () {
  let vehicleManagement, owner, a1, a2, a3, a4, a5, a6, a7;

  before(async function () {
    [owner, a1, a2, a3, a4, a5, a6, a7] = await ethers.getSigners();

    const VehicleManagement = await ethers.getContractFactory(
      "VehicleManagement"
    );
    vehicleManagement = await VehicleManagement.deploy(a7.getAddress());
    await vehicleManagement.waitForDeployment();
  });

  it("registerUser", async function () {
    await vehicleManagement.connect(a1).registerUser();
  });
  it("registerUser", async function () {
    await vehicleManagement.connect(a2).registerUser();
  });
  it("registerUser", async function () {
    await vehicleManagement.connect(a3).registerUser();
  });
  it("registerUser", async function () {
    await vehicleManagement.connect(a4).registerUser();
  });

  it("requestVehicleRegistration", async function () {
    await vehicleManagement
      .connect(a1)
      .requestVehicleRegistration(
        "Zeeshan Nawaz",
        "0300xx",
        "8030",
        "2000",
        "black",
        "bike",
        "12345678"
      );
  });
  it("approveVehicleRegistration", async function () {
    await vehicleManagement.connect(owner).approveVehicleRegistration("8030");
  });

  it("requestVehicleRegistration", async function () {
    await vehicleManagement
      .connect(a1)
      .requestVehicleRegistration(
        "Arsalan Nawaz",
        "0310xx",
        "8040",
        "2000",
        "black",
        "bike",
        "12345678"
      );
  });

  it("approveVehicleRegistration", async function () {
    await vehicleManagement.connect(owner).approveVehicleRegistration("8040");
  });

  // it("getAllVehicles", async function () {
  //   console.log(await vehicleManagement.connect(a1).getAllVehicles());
  // });
  it("vehicleOwnershipTransfer", async function () {
    await vehicleManagement
      .connect(a1)
      .vehicleOwnershipTransfer("8030", a2.getAddress(), "Haris", "0900");
  });
  it("vehicleOwnershipTransfer", async function () {
    await vehicleManagement
      .connect(a2)
      .vehicleOwnershipTransfer("8030", a3.getAddress(), "Sohail", "9113");
  });
  it("vehicleOwnershipTransfer", async function () {
    await vehicleManagement
      .connect(a3)
      .vehicleOwnershipTransfer("8030", a4.getAddress(), "Sohail", "9113");
  });
  it("getVehicleDetails", async function () {
    console.log(
      "a1",
      a1.getAddress(),
      "a2",
      a2.getAddress(),
      "a3",
      a3.getAddress(),
      "a4",
      a4.getAddress()
    );
    console.log(await vehicleManagement.connect(a1).getVehicleDetails("8030"));
  });
});
