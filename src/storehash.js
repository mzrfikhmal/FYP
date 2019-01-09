import web3 from "./web3";
//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x74e865fffb70ce476a117bdde5c97309862d7fab';
//use the ABI from your contract
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "name": "sendHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      },
      {
        "name": "y",
        "type": "string"
      },
      {
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "y",
        "type": "string"
      }
    ],
    "name": "sendTxHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getHash",
    "outputs": [
      {
        "name": "x",
        "type": "string"
      },
      {
        "name": "y",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "readMessage",
    "outputs": [
      {
        "name": "b",
        "type": "string"
      },
      {
        "name": "a",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
export default new web3.eth.Contract(abi, address);