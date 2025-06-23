// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SubscriptionPayment {
    address public owner;
    uint256 public subscriptionFee;
    uint256 public subscriptionDuration;

    struct Subscriber {
        uint256 expiry;
        bool active;
    }

    mapping(address => Subscriber) public subscribers;

    event Subscribed(address indexed user, uint256 expiry);
    event SubscriptionCancelled(address indexed user);
    event FeeUpdated(uint256 newFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(uint256 _fee, uint256 _durationInDays) {
        owner = msg.sender;
        subscriptionFee = _fee;
        subscriptionDuration = _durationInDays * 1 days;
    }

    function subscribe() external payable {
        require(msg.value == subscriptionFee, "Incorrect payment");
        Subscriber storage user = subscribers[msg.sender];

        if (block.timestamp > user.expiry) {
            user.expiry = block.timestamp + subscriptionDuration;
        } else {
            user.expiry += subscriptionDuration;
        }

        user.active = true;
        emit Subscribed(msg.sender, user.expiry);
    }

    function cancelSubscription() external {
        Subscriber storage user = subscribers[msg.sender];
        require(user.active, "Not subscribed");
        user.active = false;
        emit SubscriptionCancelled(msg.sender);
    }

    function updateSubscriptionFee(uint256 newFee) external onlyOwner {
        subscriptionFee = newFee;
        emit FeeUpdated(newFee);
    }

    function isSubscribed(address user) external view returns (bool) {
        return subscribers[user].active && block.timestamp < subscribers[user].expiry;
    }
}
