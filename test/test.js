const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("MyTest", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearMyTestFixture() {
      const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
      const ONE_GWEI = 1_000_000_000;
  
      const MyTestedAmount = ONE_GWEI;
      const unMyTestTime = (await time.latest()) + ONE_YEAR_IN_SECS;
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const MyTest = await ethers.getContractFactory("MyTest");
      const myTest = await MyTest.deploy(unMyTestTime, { value: MyTestedAmount });
  
      return { myTest, unMyTestTime, MyTestedAmount, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should set the right unMyTestTime", async function () {
        const { myTest, unMyTestTime } = await loadFixture(deployOneYearMyTestFixture);
  
        expect(await myTest.unlockedTime()).to.equal(unMyTestTime);
      });
  
      it("Should set the right owner", async function () {
        const { myTest, owner } = await loadFixture(deployOneYearMyTestFixture);
  
        expect(await myTest.owner()).to.equal(owner.address);
      });
  
      it("Should receive and store the funds to MyTest", async function () {
        const { myTest, MyTestedAmount } = await loadFixture(
          deployOneYearMyTestFixture
        ); 
  
        expect(await ethers.provider.getBalance(myTest.address)).to.equal(
          MyTestedAmount
        );
      });
  
    });
  
});