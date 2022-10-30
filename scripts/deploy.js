//import dependencies
const { ethers, run, network } = require("hardhat")
//async main function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deployig contract...")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()
    console.log(`deployed to: ${SimpleStorage.address}`)
    if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for transaction blocks...")
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }
    const currentValue = await SimpleStorage.retrieve()
    console.log(`current value is: ${currentValue}`)
    const transactionResponse = await SimpleStorage.store(69)
    await transactionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`updated value is: ${updatedValue}`)
}
//functino to verify
async function verify(contractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguements: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified!!")
        } else {
            console.log(e)
        }
    }
}

//execute main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
