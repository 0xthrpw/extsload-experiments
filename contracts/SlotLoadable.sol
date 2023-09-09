// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.15;

import { EXTSLOAD } from "./EXTSLOAD.sol";

/**
	@custom:benediction DEVS BENEDICAT ET PROTEGAT CONTRACTVS MEAM
	@title 	SlotLoadable
	@author 0xthrpw

	Contract for testing loading external slots

	@custom:date September 7th, 2023.
*/

contract SlotLoader is EXTSLOAD {

	/// A uint256 that is limited to private visibility.
	uint256 private _version;

	/// A struct of data 
	struct PrivateStruct {
		address sender;
		uint256 number;
	}

	/// An array of structs that is limited to private visibility.
	PrivateStruct[] private _privateStructs;

	/// A mapping that is limited to private visibility.
	mapping ( uint256 => uint256 ) private _privateMapping;

	/**
		
	*/
	constructor ( ) {
		_version = 7;
		// _privateMapping[1] = true;
	}

	function setStructData ( PrivateStruct calldata _structData ) external {
		// _privateStructs.push(PrivateStruct(_structData, 1));
		_privateStructs.push(_structData);
	}

	function getStructData ( 
		uint256 _index 
	) external view returns ( PrivateStruct memory ) {
		return _privateStructs[_index];
	}

	function setMappingData ( uint256 _index, uint256 _data ) external {
		_privateMapping[_index] = _data;
	}
}