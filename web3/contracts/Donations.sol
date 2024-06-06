// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Donations {
    struct Donation {
        address donator;
        string name;
        uint256 amount;
    }

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        Donation[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function multiSenderEqually(
        address payable[] calldata _address
    ) external payable {
        uint16 length = uint16(_address.length);
        uint256 value = msg.value / length;

        for (uint16 i = 0; i < length; i++) {
            (bool sent, ) = payable(_address[i]).call{value: value}("");
            if (!sent) break;
        }
    }

    function multiSenderByValue(
        address[] calldata _address,
        uint256[] calldata _value
    ) external payable {
        uint16 length = uint16(_address.length);

        for (uint16 i = 0; i < length; i++) {
            (bool sent, ) = payable(_address[i]).call{value: _value[i]}("");
            if (!sent) break;
        }
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(
        uint256 _id,
        string calldata _name
    ) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        Donation memory donation = Donation({
            donator: msg.sender,
            name: _name,
            amount: amount
        });

        campaign.donations.push(donation);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(uint256 _id) public view returns (Donation[] memory) {
        return campaigns[_id].donations;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
