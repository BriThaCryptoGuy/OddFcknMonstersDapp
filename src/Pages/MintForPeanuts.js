import '../styles/Peanuts.css';
import styled from "styled-components";
import "../../node_modules/uikit/dist/css/uikit.css";
import * as s from "../styles/globalStyles";
import {useNavigate} from 'react-router-dom';


function MintForPeanuts() {
  let navigate = useNavigate();

  return (
    <s.Screen>
      <s.Header>
        <button id="homeButton" className='uk-button uk-button-link'
            onClick={() => {
                navigate("/");
            }}></button>
        <button id="connectButton" className='uk-button uk-button-link' 
            onClick={() => {
                navigate("/exchange");
            }}></button>
      </s.Header>
      <s.GoodleBarSmall className='uk-animation-slide-right'>
        <div id="smallGoodleImg" className='uk-card'></div>
      </s.GoodleBarSmall>
      <s.BarContainer>
        <s.TextBar className='uk-animation-slide-left'>
          <div id="textWrapper">
            <div id="textPeanuts" className='uk-card'></div>
            
                <button id="getConnected" className='uk-button uk-button-link'>
                    <a href='https://www.youtube.com/watch?v=8vJXy5SRiRo'>
                    Sage Wisdom 
                    <br />
                    Mint 4 Peanuts
                    </a>
                </button>            
          </div>
        </s.TextBar>
        <s.GoodleBar className='uk-animation-slide-right'>
          <div id="goodleImg" className='uk-card' ></div>
        </s.GoodleBar>
      </s.BarContainer>
      <s.FooterPeanut>
        <div className='uk-flex'>
          
          <div id="linkWrapperSmall" className='uk-hidden@s'>
            <div id="officialLinkSmall" className='uk-card'></div>
            <div id="linkButtonSmall" className='uk-padding-top'>
                <a href='https://opensea.io/collection/goodle-dog-gang-1' id="openseaSmall" className='uk-button uk-button-link'></a>
                <a href='https://twitter.com/GoodleDogGang' id="twitterSmall" className='uk-button uk-button-link'></a>
                <a href='https://discord.com/invite/bbgyE4Qx8Z' id="discordSmall" className='uk-button uk-button-link'></a>
            </div>  
          </div>
          <div id="linkWrapper" className='uk-visible@s'>
            <div id="officialLink" className='uk-card'></div>            
            <div id="linkButton" >
              <button href='https://opensea.io/collection/goodle-dog-gang-1' id="opensea" className='uk-button uk-button-link'></button>
              <button href='https://twitter.com/GoodleDogGang' id="twitter" className='uk-button uk-button-link'></button>
              <button href='https://discord.com/invite/bbgyE4Qx8Z' id="discord" className='uk-button uk-button-link'></button>
            </div>          
          </div>
          <button id="imageFooterWrapperPeanuts" className='uk-button uk-button-link uk-visible@s'
          onClick={() => {
            navigate("/exchange");
          }}></button>
        </div>
      </s.FooterPeanut>
    </s.Screen>
  );
}
export default MintForPeanuts;