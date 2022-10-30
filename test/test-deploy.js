const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        //use expect and assert to check values
        //expect and assert are imprted from chai
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("should update when we call store", async function () {
        const expectedValue = "89"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("should add person when we call addPerson", async function () {
        const expectedName = "reeshav"
        const expectedFavoriteNumber = "69"
        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedFavoriteNumber
        )
        await transactionResponse.wait(1)
        const currentName = "reeshav"
        const currentFavoriteNumber = "69"
        assert.equal(currentName, expectedName)
        assert.equal(currentFavoriteNumber, expectedFavoriteNumber)
    })
})
