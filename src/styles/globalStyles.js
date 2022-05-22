import styled from "styled-components";

export const Screen = styled.div`
  background-color: #a500ff;
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  
`;

export const Header = styled.div`
    background-color: #5aff00;
    width: 100%;
    min-height: 15vh;
`;


//Exchange

export const MidSection = styled.div`
    
    width: 100%;
    min-height: 70vh;
      align-items: center;
  justify-content: center;
`;

export const Footer = styled.div`
    background-color: #5aff00;
    width: 100%;
    min-height: 15vh;
    text-align: center;

`;

export const FooterText = styled.p`
    font-size: 100%;
    @media (max-width: 720px) {
        font-size: 80%;
    }
    @media (max-width: 620px) {
        font-size: 70%;
    }


`;

export const MintPanel = styled.div`
    background-color: black;
    width: 60%;
    min-height: 70vh;
    margin-left: 20%;
    
    @media (max-width: 1200px) {
        width: 70%;
        margin-left: 15%;
    }
    @media (max-width: 600px) {
        width: 90%;
        margin-left: 5%;
    }
    @media (max-width: 420px) {
        width: 100%;
        margin-left: 0%;
        padding-top: 5vh;
        min-height: 65vh;
    }
`;

export const InnerPanel = styled.div`
    
    width: 50%;
    min-height: 70vh;
    float: left;
    color: white;
    
    @media (max-width: 1200px) {
        width: 100%;
        
    }
    
`;
export const InnerGoodlePanel = styled.div`
    background-color: white;
    width: 50%;
    
    min-height: 70vh;
    float: left;
`;
export const InnerPanelButtonWrapper = styled.div`
    
    width: 100%;
    min-height: 10vh;

    padding-top: 3vh;
    display: flex;
    justify-content: center;
`;
export const InnerPanelPrice = styled.div`
    color: rgb(201, 3, 142);
    width: 100%;
    min-height: 10vh;    
    text-align: center;
`;
export const InnerPanelTextWrapper = styled.div`
    
    width: 100%;
    min-height: 10vh;
    text-align: center;
    @media (orientation: landscape) {
        
        font-size: 75%;
    }
    @media (max-width: 450px) {
        font-size: 90%;
    }

`;
export const InnerPanelMathWrapper = styled.div`
    
    width: 100%;
    min-height: 10vh;
    display: flex;
    justify-content: center;
`;
export const ExchangePanelHeader = styled.div`
    
    width: 100%;
    height: 5vh;
    text-align: center;
    padding-top: 5vh;
    padding-bottom: 0vh;
    @media screen and (orientation:landscape) {
        padding-top: 0vh;
        padding-bottom: 5vh;
     }
`;
export const ExchangePanelBody = styled.div`
    
    width: 100%;
    height: 30vh;
    @media screen and (orientation:landscape) {
        height: 40vh
     }
`;
export const ExchangePanelFooter = styled.div`
    
    width: 100%;
    height: 30vh;
    @media screen and (orientation:landscape) {
        height: 20vh
     }
`;
export const ApproveButton = styled.button`
    border-radius: 10px;
    height: 7vh;
    @media screen and (orientation:landscape) {
        height: 10vh;
    }
`;
export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;


