import '../styles/Home.css';

import "../../node_modules/uikit/dist/css/uikit.css";
import * as s from "../styles/globalStyles";
import {useNavigate} from 'react-router-dom';

function Home() {
  let navigate = useNavigate();

  return (
    <s.Screen>
      <s.Header>
        <button id="homeButton" className='uk-button uk-button-link'></button>
        <button id="connectButton" className='uk-button uk-button-link' 
            onClick={() => {
                navigate("/mint");
            }}></button>
      </s.Header>
      <s.GoodleBarSmall className='uk-animation-slide-right'>
        <div id="smallGoodleHomeImg" className='uk-card'></div>
      </s.GoodleBarSmall>
      <s.BarContainer>
        <s.TextBar className='uk-animation-slide-left'>
          <div id="textWrapper">
            <div id="textPeanuts" className='uk-card'></div>
            <button id="getConnected" className='uk-button uk-button-link'>
                <a href='https://www.youtube.com/watch?v=K324qFi5jUo'>
                    Sage Wisdom 
                    <br />
                    ETH to Matic
                </a>
            </button>
          </div>
          <a id="imageFooterWrapperSmallHome" href="https://linkmix.co/9413866" className='uk-card uk-hidden@s'></a>
          <button id="imageFooterWrapperHome" className='uk-button uk-button-link uk-hidden@s'
            onClick={() => {
                navigate("/mintforpeanuts");
            }}></button>
          
        </s.TextBar>
        <s.GoodleBar className='uk-animation-slide-right'>
          <div id="goodleHomeImg" className='uk-card' ></div>
        </s.GoodleBar>
        
      </s.BarContainer>
      <s.Footer>
      
        <div className='uk-flex'>
          
          <div id="linkWrapperSmall" className='uk-hidden@s'>
          <a href="https://linkmix.co/9428589"><div id="imageFooterWrapperSmallHome" className='uk-card uk-hidden@s'></div></a>
            <div id="officialLinkSmall" className='uk-card'></div>
            <div id="linkButtonSmall" className='uk-padding-top'>
                <a href='https://opensea.io/collection/goodle-dog-gang-1' id="openseaSmall" className='uk-button uk-button-link'></a>
                <a href='https://twitter.com/GoodleDogGang' id="twitterSmall" className='uk-button uk-button-link'></a>
                <a href='https://discord.com/invite/bbgyE4Qx8Z' id="discordSmall" className='uk-button uk-button-link'></a>
            </div>  

          </div>
          <div id="linkWrapper" className='uk-visible@s'>
            <button id="imageWrapperGoodle" className='uk-button uk-button-link uk-visible@s'
            onClick={() => {
                navigate("/mintforpeanuts");
            }}></button>            
            <div id="officialLink" className='uk-card'></div>            
            <div id="linkButton" >

              
              <a href='https://opensea.io/collection/goodle-dog-gang-1' id="opensea" className='uk-button uk-button-link'></a>
            
              <a href='https://twitter.com/GoodleDogGang' id="twitter" className='uk-button uk-button-link'></a>
              <a href='https://discord.com/invite/bbgyE4Qx8Z' id="discord" className='uk-button uk-button-link'></a>
            </div>          
          </div>
          <a id="imageFooterWrapper" href='https://linkmix.co/9428589' className='uk-card uk-visible@s'
          ></a>
          
          
        </div>
      </s.Footer>
    </s.Screen>
  );
}

export default Home;