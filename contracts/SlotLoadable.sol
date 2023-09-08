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

contract SlotLoadable is EXTSLOAD {

	/// A uint256 that is limited to private visibility.
	uint256 private _version;

	/// A mapping that is limited to private visibility.
	mapping ( uint256 => bool ) private _privateMapping;

	/// A struct of data 
	struct PrivateStruct {
		address sender;
		uint256 number;
	}

	/// An array of structs that is limited to private visibility.
	PrivateStruct[] private _privateStructs;

	/**
		
	*/
	constructor ( ) {
		_version = 888;
		_privateMapping[0] = true;
	}

	function setStructData ( PrivateStruct calldata _structData ) external {
		_privateStructs.push(_structData);
	}

	function setMappingData ( uint256 _index, bool _data ) external {
		_privateMapping[_index] = _data;
	}
}