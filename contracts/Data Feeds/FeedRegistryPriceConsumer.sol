// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
 * @dev 使用 Feed 注册表中的价格数据
 */

import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";
import "@chainlink/contracts/src/v0.8/Denominations.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract FeedRegistryPriceConsumer {
    FeedRegistryInterface internal registry;

    /**
     * Network: Ethereum Mainnet
     * Feed Registry: 0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf
     */
    constructor(address _registry) {
        registry = FeedRegistryInterface(_registry);
    }

    /**
     * 返回 the ETH / USD price
     */
    function getEthUsdPrice() public view returns (int) {
        // prettier-ignore
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = registry.latestRoundData(Denominations.ETH, Denominations.USD);
        return price;
    }

    /**
     * 返回 the latest price
     */
    function getPrice(address base, address quote) public view returns (int) {
        // prettier-ignore
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = registry.latestRoundData(base, quote);
        return price;
    }
}
