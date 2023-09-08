// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.15;

/**
	@custom:benediction DEVS BENEDICAT ET PROTEGAT CONTRACTVS MEAM
	@title 	EXTSLOAD
	@author 0xthrpw

	Contract for loading external slots

	@custom:date September 7th, 2023.
*/

abstract contract EXTSLOAD {

	function extsload ( 
		bytes32 _slot 
	) external view returns ( 
		bytes32 
	) {
		assembly {
			mstore( 0x00, sload( _slot ) )
			return( 0x00, 0x20 )
		}
	}

	function extsloadMulti ( 
		bytes32[] memory _slots 
	) external view returns ( 
		bytes32[] memory 
	) {
        for (uint256 i; i < _slots.length; i++) {
            bytes32 slot = _slots[i];
            bytes32 val;
            assembly {
                val := sload(slot)
            }
            _slots[i] = val;
        }
        return _slots;
	}

}