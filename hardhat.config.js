//const { task } = require('hardhat/config')

require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        blockNumber: 17000000
      }
    },
    live: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [ process.env.DEPLOYER ]
    },
	local: {
		url: `http://localhost:8545`,
		accounts: [ process.env.DEPLOYER ]
	},
	base: {
		url: `https://mainnet.base.org`,
		accounts: [ process.env.DEPLOYER ]
	},
	bsc: {
		chainId: 56,
		url: `https://bsc-dataseed1.binance.org/`,
		accounts: [ process.env.DEPLOYER ]
	},
	goerli: {
		chainId: 5,
		url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
		accounts: [ process.env.DEPLOYER ]
	},
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      },
    ]
  }
}
