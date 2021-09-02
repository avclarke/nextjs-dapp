const TestToken = artifacts.require("TestToken");
const YieldToken = artifacts.require("YieldToken");

module.exports = async function (deployer, network, accounts) {
  // Deploy Test token
  await deployer.deploy(TestToken);
  const testToken = await TestToken.deployed();

  // Deploy Yield Token
  await deployer.deploy(YieldToken, testToken.address);
  const yieldToken = await YieldToken.deployed();
};
