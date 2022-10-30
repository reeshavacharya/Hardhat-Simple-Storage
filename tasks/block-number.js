const { task } = require("hardhat/config")
task("block-number", "prints the current block number").setAction(
    async (TaskArgs, hre) => {
        //hre= hardhat runtime environment
        //hre is the same as require("hardhat") in deploy.js
        // the code below is same as: async function blockTask() {}
        //the way we define the function below is known as anonymous function

        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`current block number: ${blockNumber}`)
    }
)
module.exports = {}
