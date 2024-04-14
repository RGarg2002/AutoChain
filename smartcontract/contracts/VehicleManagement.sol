// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VehicleManagement {
    address public owner;
    uint256 public userCounter;
    uint256 public vehicleCounter;
    string[] registerVehicleCounter;

    enum RequestStatus {
        InProgress,
        Accepted,
        Rejected
    }

    constructor() {
        owner = msg.sender;
    }

    struct User {
        bool registered;
    }

    struct Ownership {
        string newOwnerName;
        string newOwnerContact;
        address owner;
        uint registrationTime;
        uint ownershipEndTime;
    }

    struct VehicleRecord {
        Ownership[] ownershipHistory;
    }

    mapping(string => VehicleRecord) vehiclesRecord;

    struct Vehicle {
        string ownerName;
        string contact;
        string model;
        string color;
        string number;
        string category;
        string chassisNumber;
        address owner;
        RequestStatus status;
    }

    struct OwnershipRequest {
        string number;
        address newOwner;
        string newOwnerName;
        string newOwnerContact;
        string previousOwnerName;
        string previousOwnerContact;
        address previousOwnerAddress;
    }

    mapping(address => User) public users;
    mapping(string => Vehicle) public vehicles;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].registered, "User is not registered");
        _;
    }

    function registerUser() public {
        require(!users[msg.sender].registered, "User is already registered");
        users[msg.sender] = User(true);
        userCounter = userCounter + 1;
    }

    function requestVehicleRegistration(
        string memory _ownerName,
        string memory _contact,
        string memory _number,
        string memory _model,
        string memory _color,
        string memory _category,
        string memory _chassisNumber
    ) public onlyRegisteredUser {
        require(
            vehicles[_number].owner == address(0),
            "Vehicle with this number is already registered"
        );

        Vehicle memory newRequest = Vehicle({
            ownerName: _ownerName,
            contact: _contact,
            number: _number,
            model: _model,
            color: _color,
            category: _category,
            chassisNumber: _chassisNumber,
            owner: msg.sender,
            status: RequestStatus.InProgress
        });
        vehicles[_number] = newRequest;
        vehicleCounter = vehicleCounter + 1;
        registerVehicleCounter.push(_number);
    }

    function approveVehicleRegistration(
        string memory _number
    ) public onlyOwner {
        Vehicle storage request = vehicles[_number];
        require(
            request.owner != address(0),
            "No pending request for this vehicle"
        );

        vehicles[request.number].status = RequestStatus.Accepted;

        Ownership memory newOwnership = Ownership({
            newOwnerName: request.ownerName,
            newOwnerContact: request.contact,
            owner: request.owner,
            registrationTime: block.timestamp,
            ownershipEndTime: 0
        });

        vehiclesRecord[_number].ownershipHistory.push(newOwnership);
    }

    function rejectVehicleRegistration(string memory _number) public onlyOwner {
        vehicles[_number].status = RequestStatus.Rejected;
    }

    function getAllVehicles() public view returns (Vehicle[] memory) {
        Vehicle[] memory allVehicles = new Vehicle[](
            registerVehicleCounter.length
        );

        for (uint256 i = 0; i < registerVehicleCounter.length; i++) {
            string memory requestNumber = registerVehicleCounter[i];
            Vehicle storage vehicle = vehicles[requestNumber];

            allVehicles[i] = vehicle;
        }

        return allVehicles;
    }

    function vehicleOwnershipTransfer(
        string memory _number,
        address _newOwner,
        string memory _newOwnerName,
        string memory _newOwnerContact
    ) public onlyRegisteredUser {
        Vehicle storage vehicle = vehicles[_number];
        require(
            msg.sender == vehicle.owner,
            "Only the current owner can transfer vehicle ownership"
        );

        vehicles[_number].owner = _newOwner;
        vehicles[_number].ownerName = _newOwnerName;
        vehicles[_number].contact = _newOwnerContact;

        vehiclesRecord[_number]
            .ownershipHistory[
                vehiclesRecord[_number].ownershipHistory.length - 1
            ]
            .ownershipEndTime = block.timestamp;

        Ownership memory newOwnership = Ownership({
            newOwnerName: _newOwnerName,
            newOwnerContact: _newOwnerContact,
            owner: _newOwner,
            registrationTime: block.timestamp,
            ownershipEndTime: 0
        });

        vehiclesRecord[_number].ownershipHistory.push(newOwnership);
    }

    function getVehicleDetails(
        string memory _number
    ) external view returns (Ownership[] memory) {
        return vehiclesRecord[_number].ownershipHistory;
    }
}
