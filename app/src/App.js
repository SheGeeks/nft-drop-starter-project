import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_HANDLE2 = "corvida";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_LINK2 = `https://twitter.com/${TWITTER_HANDLE2}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  // Check for Phantom Wallet extension injection of solana object
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log("Phantom wallet found!");
        /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "Connected with Public Key:",
          response.publicKey.toString()
        );

        /* Set the user's publicKey in state to be used later! */
        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* Define method */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /* Render this UI when the user hasn't connected their wallet yet. */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <div className="content-box">
            <p className="header">WFFLZ</p>
            <p className="sub-text">are better than pancakes</p>
            {!walletAddress && renderNotConnectedContainer()}
          </div>
          {/* Check for walletAddress and then pass in walletAddress */}
          {walletAddress && <CandyMachine walletAddress={window.solana} />}
        </div>
        <div className="feat-img"></div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >
            {`built on @${TWITTER_HANDLE}`}{" "}
          </a>{" "}
          <a
            className="footer-text"
            href={TWITTER_LINK2}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {` coded by @${TWITTER_HANDLE2}`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
