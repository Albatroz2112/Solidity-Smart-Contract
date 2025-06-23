const { ethers } = require("hardhat");

async function main() {
  const SubscriptionPayment = await ethers.getContractFactory("SubscriptionPayment");

  // Sample initial values: 0.01 ETH fee and 30 days subscription
  const feeInWei = ethers.utils.parseEther("0.01");
  const durationInDays = 30;

  const subscription = await SubscriptionPayment.deploy(feeInWei, durationInDays);
  await subscription.deployed();

  console.log("SubscriptionPayment contract deployed to:", subscription.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
