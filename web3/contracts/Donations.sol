// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Donations {
    struct Donation {
        address donator;
        string name;
        uint256 amount;
        bool hasVoted;
    }

    struct Campaign {
        string uuid;
        address owner;
        string name;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        uint256 noOfDonations;
        uint256 noOfRequests;
    }

    struct SpendRequest {
        string description;
        uint256 amount;
        uint256 grantedVotes;
        uint256 totalVotes;
    }

    mapping(string => Campaign) public campaigns;
    mapping(string => Donation[]) public donations;
    mapping(string => SpendRequest[]) public spendRequests;

    uint256 public numberOfCampaigns = 0;

    receive() external payable {}

    fallback() external payable {}

    function createCampaign(
        string calldata _id,
        address _owner,
        string calldata _name,
        string calldata _title,
        string calldata _description,
        uint256 _target,
        uint256 _deadline,
        string calldata _image
    ) public returns (string calldata) {
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );

        Campaign storage campaign = campaigns[_id];
        campaign.uuid = _id;
        campaign.owner = _owner;
        campaign.name = _name;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        return _id;
    }

    function donateToCampaign(
        string calldata _id,
        string calldata _name
    ) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        require(
            block.timestamp < campaign.deadline,
            "Campaign deadline has passed."
        );

        int idx = -1;
        Donation[] memory allDonations = new Donation[](campaign.noOfDonations);
        allDonations = donations[_id];

        for (uint i = 0; i < campaign.noOfDonations; i++) {
            if (allDonations[i].donator == msg.sender) {
                idx = int(i);
                break;
            }
        }

        if (idx == -1) {
            Donation memory donation = Donation({
                donator: msg.sender,
                name: _name,
                amount: amount,
                hasVoted: false
            });
            donations[_id].push(donation);
        } else {
            allDonations[uint(idx)].amount += amount;
        }

        campaign.amountCollected += amount;
    }

    function voteForCampaign(
        string calldata _campaignId,
        uint256 _requestId,
        bool _vote
    ) public {
        SpendRequest storage requests = spendRequests[_campaignId];
        SpendRequest storage req = requests[_requestId];
        require(!campaign.hasVoted[msg.sender], "You have already voted.");

        if (_vote) {
            campaign.trueVotes++;
        } else {
            campaign.falseVotes++;
        }

        campaign.hasVoted[msg.sender] = true;
    }

    function transferFunds(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(
            block.timestamp >= campaign.deadline,
            "Campaign is still ongoing."
        );
        require(
            campaign.trueVotes > campaign.falseVotes,
            "Not enough true votes to transfer funds."
        );
        require(campaign.amountCollected > 0, "No funds to transfer.");

        uint256 amount = campaign.amountCollected;
        campaign.amountCollected = 0;

        (bool success, ) = campaign.owner.call{value: amount}("");
        require(success, "Transfer failed.");
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

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
