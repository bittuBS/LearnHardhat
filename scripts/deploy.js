//const hre = require ("hardhat")
//console.log(hre);
// async function main(){
//     const currentTimestampInSeconds =Math.round(Data.now()/ 1000);
//     const ONE_YEARS_IN_SECONDS =356*24*60*60;
//     const unlockedTime = currentTimestampInSeconds +ONE_YEARS_IN_SECONDS;
//     console.log(currentTimestampInSeconds);
//     console.log(ONE_YEARS_IN_SECONDS);
// console.log(unlockedTime);
// }
// main().catch((error)=>{
// console.log(error);
// process.exitCode = 1;
// });
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const MyTest = await hre.ethers.getContractFactory("MyTest");
  const myTest = await MyTest.deploy(unlockTime, { value: lockedAmount });

  await myTest.deployed();
  

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${myTest.address}`
    
  );
  console.log(myTest);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});