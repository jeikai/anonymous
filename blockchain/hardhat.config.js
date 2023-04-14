// https://eth-goerli.g.alchemy.com/v2/NCQvK307tDqim_HgXe-l52pTpNKXdvjc

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/20NpYKd8F-ISuO1MqP1tHnTAQXgiU4da',
      accounts: ['54bd3803857e624c19fec10cf04496c3a2daab7c8daef58313b2468b6a949215']
    }
  }
}