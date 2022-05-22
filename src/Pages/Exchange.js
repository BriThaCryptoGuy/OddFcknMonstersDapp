import '../styles/Exchange.css';
import '../../node_modules/uikit/dist/css/uikit.css';
import * as s from "../styles/globalStyles";
import Web3 from 'web3';
import Web3Modal from "web3modal";
import Web3EthContract from "web3-eth-contract";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

/* global BigInt */

//Author: BriThaCryptoGuy
//Dapp: Goodle Dog Gang NFTs
//Page: Home/MintForPeanuts

let web3Modal;
let web3;

const price = BigInt(3000000000000000000000);
const mintForPeanutsAddress = "0x62BcEbADeAa025229FF19c1d7530CC864cf2ECfC";
const peanut_address = "0x56C025A10C5F28611fbF6AAfd225Be702B335289";

const peanut_abi = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
          }
      ],
      "name": "decreaseAllowance",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "spender",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "addedValue",
              "type": "uint256"
          }
      ],
      "name": "increaseAllowance",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "sender",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  }
];

let peanuts;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '9aa3d95b3bc440fa88ea12eaa4456161'
    },
    network: "mainnet"
  }
};

function Exchange() {
  
  let navigate = useNavigate(); 

  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);
  //const [web3, setWeb3] = useState();

  async function connect() {
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions, ///required
    })
    try {
      const web3ModalProvider = await web3Modal.connect();
      web3 = new Web3(web3ModalProvider);
      Web3EthContract.setProvider(web3ModalProvider);
      let accounts = await web3.eth.getAccounts();
      peanuts = new Web3EthContract(peanut_abi, peanut_address);

      setApprovedAmount( await peanuts.methods.allowance(accounts[0], mintForPeanutsAddress).call({from: accounts[0]}));
      setBalance(await peanuts.methods.balanceOf(accounts[0]).call({from: accounts[0]}));
      setSigner(accounts[0]);
      setIsConnected(true);

    } catch (e) {
      console.log(e);
    }   

  }

  async function approve_peanuts() {   
    const mintForPeanutsAddress = "0x62BcEbADeAa025229FF19c1d7530CC864cf2ECfC";
    let total_price = BigInt(mintAmount) * price;
    if (((approvedAmount / (100 ** 9)) / 3000) == mintAmount) {
      alert("Already Approved For Desired Amount!");
    } else {
      try {
        //let peanuts = new Web3EthContract(peanut_abi, peanut_address);
        
        const msg = await peanuts.methods.approve(mintForPeanutsAddress, total_price).send({from: signer});
        setApprovedAmount( await peanuts.methods.allowance(signer, mintForPeanutsAddress).call({from: signer}));
        console.log(msg)
        console.log(approvedAmount);
      } catch (e) {
        console.log(e);
      }
    }    
  }

  async function mintForPeanuts() {    
    if (approvedAmount > 0 && ((approvedAmount / (100 ** 9)) / 3000) >= mintAmount) {
      const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "contract IERC20",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "ERC20PaymentReleased",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "goodle_for_peanuts",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "shares",
              "type": "uint256"
            }
          ],
          "name": "PayeeAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "PaymentReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "PaymentReleased",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address payable",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "release",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IERC20",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "release",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IGoodle",
              "name": "_new_goodle",
              "type": "address"
            }
          ],
          "name": "set_goodle",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IERC20",
              "name": "_new_peanuts",
              "type": "address"
            }
          ],
          "name": "set_peanuts",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "payee",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IERC20",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "released",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "released",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "shares",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IERC20",
              "name": "token",
              "type": "address"
            }
          ],
          "name": "totalReleased",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalReleased",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalShares",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
    
      try {
        let mint_peanuts = new Web3EthContract(abi, mintForPeanutsAddress);
        //let peanuts = new Web3EthContract(peanut_abi, peanut_address);
        
        let msg = await mint_peanuts.methods.goodle_for_peanuts(mintAmount).send({from: signer, gasLimit: 3000000});
        setApprovedAmount( await peanuts.methods.allowance(signer, mintForPeanutsAddress).call({from: signer}));
        setBalance(await peanuts.methods.balanceOf(signer).call({from: signer}));
        console.log(msg);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Need to approve peanuts");
    }
    
  }

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 5) {
      newMintAmount = 5;
    }
    setMintAmount(newMintAmount);
  };
  
  return (
        <s.Screen>
            <s.Header>
                <button id="homeButton" className='uk-button uk-button-link'
                onClick={() => {
                    navigate("/");
                }}></button>
                {isConnected ?
                <button id="connectedButton" className='uk-button uk-button-link' ></button>
                :
                <button id="connectButton" className='uk-button uk-button-link uk-animation-shake' onClick={() => connect()}></button>
                }
            </s.Header>
            <s.MidSection>
                <s.ExchangePanel>
                    <s.InnerGoodlePanel className='uk-visible@l'>
                        <div id="goodleImg" className='uk-card uk-animation-kenburns' ></div>
                    </s.InnerGoodlePanel>
                    <s.InnerPanel className='uk-animation-scale-up'>
                        <s.ExchangePanelHeader>
                            <p className="uk-card-title">Exchange for Peanuts</p>
                        </s.ExchangePanelHeader>
                        <s.ExchangePanelBody>
                            <s.InnerPanelButtonWrapper>  
                                {isConnected ? 
                                <s.ApproveButton className="uk-button uk-button-primary uk-width-1-3" onClick={() => approve_peanuts()}> Approve </s.ApproveButton>
                                :
                                <s.ApproveButton className="uk-button uk-button-primary uk-width-1-3" > Approve </s.ApproveButton>
                                }                          
                                                                
                            </s.InnerPanelButtonWrapper>
                            <s.InnerPanelTextWrapper>
                                Price: 3K Peanuts
                                <br />
                                Approved Peanuts: {(approvedAmount / (100 ** 9))}
                                <br />
                                Peanuts Balance: {(Number(Math.round(balance  / (100 ** 9), -1)))}
                            </s.InnerPanelTextWrapper>
                            <s.InnerPanelMathWrapper>
                                <s.StyledRoundButton className="uk-button-primary uk-margin-small-right" onClick={() => decrementMintAmount()}>-</s.StyledRoundButton>
                                {mintAmount}
                                <s.StyledRoundButton className="uk-button-primary uk-margin-small-left" onClick={() => incrementMintAmount()} >+</s.StyledRoundButton>
                            </s.InnerPanelMathWrapper>
                        </s.ExchangePanelBody>
                        <s.ExchangePanelFooter>
                            <button id="imageFooterWrapperSmallExchange" className='uk-button uk-button-link' onClick={() => mintForPeanuts()}></button>
                        </s.ExchangePanelFooter>
                    </s.InnerPanel>
                </s.ExchangePanel>
            </s.MidSection>  
      
    </s.Screen>
  )
}


export default Exchange;