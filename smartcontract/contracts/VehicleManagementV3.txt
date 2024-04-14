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
    mapping(string => OwnershipRequest[]) public ownershipHistory;

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

    function getOwnershipHistory(
        string memory _number
    ) public view returns (OwnershipRequest[] memory) {
        return ownershipHistory[_number];
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

        OwnershipRequest memory transferRequest = OwnershipRequest({
            number: _number,
            newOwner: _newOwner,
            newOwnerName: _newOwnerName,
            newOwnerContact: _newOwnerContact,
            previousOwnerName: vehicle.ownerName,
            previousOwnerContact: vehicle.contact,
            previousOwnerAddress: vehicle.owner
        });

        ownershipHistory[_number].push(transferRequest);
        vehicles[_number].owner = _newOwner;
        vehicles[_number].ownerName = _newOwnerName;
        vehicles[_number].contact = _newOwnerContact;
    }
}
