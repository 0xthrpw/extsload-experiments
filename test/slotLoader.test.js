const { ethers } = require('hardhat');
const chalk = require('chalk');

describe("/ETXSLG/ External Slot Loading General", () => {

	let admin, alice, rost, tim;
	let slotLoader;

	before( async () => {

		// get signers
		[ admin, alice, rost, tim ] = await ethers.getSigners();

		const SlotLoader = await ethers.getContractFactory("SlotLoader");

		slotLoader = await SlotLoader.deploy();
		await slotLoader.deployed();

	})

	describe("Set a bunch of private variables and then read them from storage", () => {
		it("Setup", async () => {})

		it("Set some data", async () => {
				console.log(`	 Operating from:`, chalk.yellow(admin.address));
				console.log(`	 `);

			await slotLoader.setStructData(
				{
					sender: admin.address,
					number: 888
				}
			);
				console.log(
					'	 ',
					`set first struct as { sender:${admin.address}, number:888 }` 
				);


			await slotLoader.setStructData(
				{
					sender: alice.address,
					number: 777
				}
			);
				console.log(
					'	 ',
					`set second struct as { sender:${alice.address}, number:777 }` 
				);

			await slotLoader.setMappingData(
				1,
				666
			);
				console.log(
					'	 ',
					`set mapping index 1 as 666` 
				);

			await slotLoader.setMappingData(
				22,
				143
			);
				console.log(
					'	 ',
					`set mapping index 22 as 143` 
				);
				console.log('	 ');
		})

		it("Read some Data", async () => {
			/* 
				Read the _version variable first.  This is in slot zero and has
				determinate length so we can read it by requesting the data 
				stored in slot '0'			
			*/
			let zeroHex = ethers.utils.hexZeroPad(0, 32);
			let firstSlot = await slotLoader.extsload(zeroHex);
			
				console.log(`	 _version:`);
				console.log(
					'	 ', 
					'slot:', 
					chalk.yellow(zeroHex), 
					'value:', 
					chalk.yellow(firstSlot)
				);
				console.log(`	 `);

			/* 
				Now we'll read the _privateStructs array.  Because this variable 
				is an array it has indeterminate length, which means the length 
				of array is stored at slot 1 and the actual data can be found at 
				keccak(1). Subsequent elements in this array are stored at 
				keccak(slot) + 1, keccak(slot) + 2 and so forth
			*/
			let paddedIndex = ethers.utils.hexZeroPad(1, 32);
			
			// get the data at slot index 1
			let arrayLength = await slotLoader.extsload(paddedIndex);

				console.log(`	 _privateStructs length:`);
				console.log(
					'	 ', 
					'slot:', 
					chalk.yellow(paddedIndex), 
					'value:', 
					chalk.yellow(arrayLength)
				);
				console.log(`	 `);

			// get the first element in the array at slot keccak(0x000...0001)
			let hashedPaddedIndex = ethers.utils.keccak256(paddedIndex)

			let firstPrivateStruct = await slotLoader.extsload(hashedPaddedIndex);
			
				console.log(`	 _privateStructs first element:`);
				console.log(
					'	 ', 
					'slot:', 
					chalk.yellow(hashedPaddedIndex), 
					'value:', 
					chalk.yellow(firstPrivateStruct)
				);
				console.log(`	 `);

			// or loop the length of the array and increment across all slots
			let numberOfSlotsPerStruct = 2;  //address, uint256
			let slots = [];
			for( let i = 0; i < arrayLength * numberOfSlotsPerStruct; i++ ){
				let incrementedSlot = ethers.BigNumber.from(hashedPaddedIndex).add(i);
				slots.push(incrementedSlot);
			}

			let batchedSlots = await slotLoader.extsloadMulti(slots);

				console.log(`	 _privateStructs all elements:`);
			
			for(let e = 0; e < batchedSlots.length; e++){
				console.log(
					'	 ', 
					'slot:', 
					chalk.yellow(slots[e].toHexString()), 
					'value:', 
					chalk.yellow(batchedSlots[e])
				);
			}
				console.log(`	 `);

			/* 
				To read mapping data we have to concatenate the index of the 
				mapping and the slot number.  Because this mapping is keyed on a
				uint256, our index will be a zero padded number. In this case,
				the fourth slot.
			*/
			let mappingIndex = 22;
			let slot = 2;
			let paddedMappingIndex = ethers.utils.hexZeroPad(mappingIndex, 32);
			let paddedSlot = ethers.utils.hexZeroPad(slot, 32);
			let concatenated = ethers.utils.concat([paddedMappingIndex, paddedSlot]);
			let hash = ethers.utils.keccak256(concatenated);
			let mappingSlot = await slotLoader.extsload(hash);

				console.log(`	 _privateMapping first element:`);
				console.log(
					'	 ', 
					'slot:', 
					chalk.yellow(hash), 
					'value:', 
					chalk.yellow(mappingSlot)
				);
				console.log(`	 `);

		})

	});
});