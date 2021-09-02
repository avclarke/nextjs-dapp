const TestToken = artifacts.require("TestToken");
const YieldToken = artifacts.require("YieldToken");

module.exports = async function (callback) {
  testToken = await TestToken.deployed();
  yieldToken = await YieldToken.deployed();
  balance = await testToken.balanceOf(yieldToken.address);
  console.log(web3.utils.fromWei(balance.toString()));
  callback();
};
