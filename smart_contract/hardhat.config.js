// https://eth-goerli.alchemyapi.io/v2/Y4JAz8QHzZkSfFEEc4__m3o8bkO41jnw

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/Y4JAz8QHzZkSfFEEc4__m3o8bkO41jnw',
      accounts: [ '29e4ecebe9b8a93df93c056e55c0999c44a1cd66aadcfd5bad6b802780009184' ]
    }
  }
}