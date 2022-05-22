import '../styles/Home.css';
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
//Page: Mint

let web3Modal;
let web3;


let cost = BigInt(30000000000000000);


const odd_address = "0x65B1CE926Fd31c0db3A16bFE0960d2A87B0482F0";





const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '9aa3d95b3bc440fa88ea12eaa4456161'
    },
    network: "mainnet"
  }
};

function Mint() {
  
  let navigate = useNavigate(); 

  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();
  const [mintAmount, setMintAmount] = useState(1);
  

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
      

      setSigner(accounts[0]);
      setIsConnected(true);

    } catch (e) {
      console.log(e);
    }   

  }

  

  async function mintNFT() {    
    
      const abi = [
        {
            "inputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"constructor"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"owner",
                    "type":"address"
                },
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"approved",
                    "type":"address"
                },
                {
                    "indexed":true,
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"Approval",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"owner",
                    "type":"address"
                },
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"operator",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"bool",
                    "name":"approved",
                    "type":"bool"
                }
            ],
            "name":"ApprovalForAll",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":true,
                    "internalType":"contract IERC20",
                    "name":"token",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"uint256",
                    "name":"amount",
                    "type":"uint256"
                }
            ],
            "name":"ERC20PaymentReleased",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"previousOwner",
                    "type":"address"
                },
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"newOwner",
                    "type":"address"
                }
            ],
            "name":"OwnershipTransferred",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"uint256",
                    "name":"shares",
                    "type":"uint256"
                }
            ],
            "name":"PayeeAdded",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"from",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"uint256",
                    "name":"amount",
                    "type":"uint256"
                }
            ],
            "name":"PaymentReceived",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":false,
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "indexed":false,
                    "internalType":"uint256",
                    "name":"amount",
                    "type":"uint256"
                }
            ],
            "name":"PaymentReleased",
            "type":"event"
        },
        {
            "anonymous":false,
            "inputs":[
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"from",
                    "type":"address"
                },
                {
                    "indexed":true,
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "indexed":true,
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"Transfer",
            "type":"event"
        },
        {
            "stateMutability":"payable",
            "type":"fallback"
        },
        {
            "inputs":[
                
            ],
            "name":"MAX_ORDER",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"MAX_SUPPLY",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"PRICE",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"approve",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"owner",
                    "type":"address"
                }
            ],
            "name":"balanceOf",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"getApproved",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"isActive",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"",
                    "type":"bool"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"owner",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"operator",
                    "type":"address"
                }
            ],
            "name":"isApprovedForAll",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"",
                    "type":"bool"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"addr",
                    "type":"address"
                }
            ],
            "name":"isDelegate",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"",
                    "type":"bool"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                },
                {
                    "internalType":"uint256[]",
                    "name":"tokenIds",
                    "type":"uint256[]"
                }
            ],
            "name":"isOwnerOf",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"",
                    "type":"bool"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"quantity",
                    "type":"uint256"
                }
            ],
            "name":"mint",
            "outputs":[
                
            ],
            "stateMutability":"payable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256[]",
                    "name":"quantity",
                    "type":"uint256[]"
                },
                {
                    "internalType":"address[]",
                    "name":"recipient",
                    "type":"address[]"
                }
            ],
            "name":"mintTo",
            "outputs":[
                
            ],
            "stateMutability":"payable",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"name",
            "outputs":[
                {
                    "internalType":"string",
                    "name":"",
                    "type":"string"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"next",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"owner",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"ownerOf",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"index",
                    "type":"uint256"
                }
            ],
            "name":"payee",
            "outputs":[
                {
                    "internalType":"address",
                    "name":"",
                    "type":"address"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address payable",
                    "name":"account",
                    "type":"address"
                }
            ],
            "name":"release",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"contract IERC20",
                    "name":"token",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                }
            ],
            "name":"release",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"contract IERC20",
                    "name":"token",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                }
            ],
            "name":"released",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                }
            ],
            "name":"released",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"renounceOwnership",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"from",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"safeTransferFrom",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"from",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                },
                {
                    "internalType":"bytes",
                    "name":"_data",
                    "type":"bytes"
                }
            ],
            "name":"safeTransferFrom",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"bool",
                    "name":"isActive_",
                    "type":"bool"
                }
            ],
            "name":"setActive",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"operator",
                    "type":"address"
                },
                {
                    "internalType":"bool",
                    "name":"approved",
                    "type":"bool"
                }
            ],
            "name":"setApprovalForAll",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"string",
                    "name":"_newBaseURI",
                    "type":"string"
                },
                {
                    "internalType":"string",
                    "name":"_newSuffix",
                    "type":"string"
                }
            ],
            "name":"setBaseURI",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"addr",
                    "type":"address"
                },
                {
                    "internalType":"bool",
                    "name":"isDelegate_",
                    "type":"bool"
                }
            ],
            "name":"setDelegate",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"maxOrder",
                    "type":"uint256"
                }
            ],
            "name":"setMaxOrder",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"maxSupply",
                    "type":"uint256"
                }
            ],
            "name":"setMaxSupply",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"price",
                    "type":"uint256"
                }
            ],
            "name":"setPrice",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                }
            ],
            "name":"shares",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"bytes4",
                    "name":"interfaceId",
                    "type":"bytes4"
                }
            ],
            "name":"supportsInterface",
            "outputs":[
                {
                    "internalType":"bool",
                    "name":"",
                    "type":"bool"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"symbol",
            "outputs":[
                {
                    "internalType":"string",
                    "name":"",
                    "type":"string"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"index",
                    "type":"uint256"
                }
            ],
            "name":"tokenByIndex",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"owner",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"index",
                    "type":"uint256"
                }
            ],
            "name":"tokenOfOwnerByIndex",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"tokenURI",
            "outputs":[
                {
                    "internalType":"string",
                    "name":"",
                    "type":"string"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"contract IERC20",
                    "name":"token",
                    "type":"address"
                }
            ],
            "name":"totalReleased",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"totalReleased",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"totalShares",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                
            ],
            "name":"totalSupply",
            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"from",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "internalType":"uint256[]",
                    "name":"tokenIds",
                    "type":"uint256[]"
                },
                {
                    "internalType":"bytes",
                    "name":"data",
                    "type":"bytes"
                }
            ],
            "name":"transferBatch",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"from",
                    "type":"address"
                },
                {
                    "internalType":"address",
                    "name":"to",
                    "type":"address"
                },
                {
                    "internalType":"uint256",
                    "name":"tokenId",
                    "type":"uint256"
                }
            ],
            "name":"transferFrom",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"newOwner",
                    "type":"address"
                }
            ],
            "name":"transferOwnership",
            "outputs":[
                
            ],
            "stateMutability":"nonpayable",
            "type":"function"
        },
        {
            "inputs":[
                {
                    "internalType":"address",
                    "name":"account",
                    "type":"address"
                }
            ],
            "name":"walletOfOwner",
            "outputs":[
                {
                    "internalType":"uint256[]",
                    "name":"",
                    "type":"uint256[]"
                }
            ],
            "stateMutability":"view",
            "type":"function"
        },
        {
            "stateMutability":"payable",
            "type":"receive"
        }
    ]
    
      try {
        let mint_goodle = new Web3EthContract(abi, odd_address);
        let gasLimit = 70000;
        let total_cost = String(BigInt(mintAmount) * cost);
        let odd_gas = mintAmount * gasLimit;
        
        let msg = await mint_goodle.methods
            .mint(mintAmount)
            .send({from: signer, value: total_cost, gasLimit: odd_gas});
        
        console.log(msg);
      } catch (e) {
        console.log(e);
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

  const displayConnect = () => {
      alert("Connect Wallet To Mint!");
  };
  
  return (
        <s.Screen id="homeScreen">
            <s.Header>
                <div className='uk-grid' data-uk-grid>
                    <div className='uk-container uk-width-1-2'>
                        <div className='uk-card uk-card-body uk-width-1-1 uk-align-center' id='logo'></div>
                    </div>
                    <div className='uk-container uk-width-1-2'>
                        {isConnected ?
                            <button id="connectedButton" className='uk-button uk-button-primary uk-float-right' >Connected</button> 
                        :
                         <button id="connectedButton" className='uk-button uk-button-primary uk-float-right' onClick={() => connect()}>Connect</button> 
                        }
                        
                    </div>
                </div>
                {/**
                <button id="homeButton" className='uk-button uk-button-link'
                onClick={() => {
                    navigate("/");
                }}></button>
                {isConnected ?
                <button id="connectedButton" className='uk-button uk-button-link' ></button>
                :
                <button id="connectButton" className='uk-button uk-button-link uk-animation-shake' onClick={() => connect()}></button>
                }
                 */}
            </s.Header>
            <s.MidSection>
                 <s.MintPanel>
                     <s.InnerGoodlePanel id="monsterGif" className='uk-visible@l'>

                     </s.InnerGoodlePanel>
                     <s.InnerPanel className='uk-animation-scale-up'>
                        <s.ExchangePanelHeader>
                            <p className="uk-card-title">Mint Your Odd Fckn Monsters</p>
                        </s.ExchangePanelHeader>
                        <s.ExchangePanelBody>
                
                            <s.InnerPanelTextWrapper>
                                <p>With every purchase comes a physical based NFT.<br />
                                Visit merch store to pay with fiat or other coinbase <br /> cryptocurriencies including Doge and Bitcoin.</p>
                                Blockchain: Ethereum <br />
                                Price: 0.03 ETH <br />
                                Max Supply: 5K <br />

                                

                                <br />
                                
                            </s.InnerPanelTextWrapper>
                            <s.InnerPanelMathWrapper>
                                <s.StyledRoundButton className="uk-button-primary uk-margin-small-right" onClick={() => decrementMintAmount()}>-</s.StyledRoundButton>
                                {mintAmount}
                                <s.StyledRoundButton className="uk-button-primary uk-margin-small-left" onClick={() => incrementMintAmount()} >+</s.StyledRoundButton>
                            </s.InnerPanelMathWrapper>
                            <div className='uk-container uk-width-1-1'>
                                {isConnected ?
                                 <s.ApproveButton className="uk-button uk-button-primary uk-align-center" onClick={() => mintNFT()}> Mint </s.ApproveButton>
                                : 
                                <s.ApproveButton className="uk-button uk-button-primary uk-align-center" onClick={() => connect()}> Connect </s.ApproveButton>
                                }
                                
                            </div>
                            
                        </s.ExchangePanelBody>
                        
                    </s.InnerPanel>
                    
                 </s.MintPanel>
            </s.MidSection>
            <s.Footer>
            <p>Please head to our <a href="https://t.co/yyGtgi0LVU">Discord</a> to claim keychain!</p>
            <p>Copyright &copy; 2022. All Rights Reserved.</p>
                 {/**<s.FooterText className='uk-text-center'>Please verify in our <a href=''>Discord</a> to recieve your physical NFT after purchasing from the EThereum mainnet. <br /> To purchase using other coinbase cryptocurriencies and credit/debit cards visit our <a>Merch Site</a> <br /> Copyright &copy; 2022. All Rights Reserved.</s.FooterText>*/}            
            </s.Footer>
    
    </s.Screen>
  )
}


export default Mint;