const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying constracts with the account:', deployer.address);

  const token = await hre.ethers.getContractFactory("KenkToken");
  const deployedToken = await token.deploy("KenkToken", "KENK");

  await deployedToken.deployed();

  console.log("Token desployado a: ", deployedToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
