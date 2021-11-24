pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KenkToken is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
      _mint(msg.sender, 100 * (10 ** 18));
    }

    function farmTokens(address recipient) external {
      _mint(recipient, 100);
    }
}

