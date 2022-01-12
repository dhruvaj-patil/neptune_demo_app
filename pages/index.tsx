// import { useWeb3React } from '@web3-react/core';
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
// import { injected } from '../utils/connector';
import { Dialog } from '@headlessui/react'


import Web3 from 'web3'
import WalletDetails from '../components/WalletDetails';
import InputBox from '../components/CurrencyInputBox';


declare global {
  interface Window {
    web3: any;
    ethereum?: any;
  }
}

export default function Home() {

  //  Currency conversions
  const [NEP, setNEP] = useState<number>(1)
  const [BUSD, setBUSD] = useState<number>(3)

  // Wallet Details
  const [walletAddress, setWalletAddress] = useState(null)
  const [addressBalance, setAddressBalance] = useState<number>(0)
  const [networkChainId, setChainId] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    if (walletAddress != "" || walletAddress != undefined
      || walletAddress != null || walletAddress.length < 0) {
      const connectWeb3 = async () => {
        if (typeof window !== undefined) {
          if (window.web3) {
            window.web3 = new Web3(window.ethereum);
            await getDetails()
            // await checkWalletDetails()
          }
        }
      }
      connectWeb3()
    }

  }, [walletAddress]);

  const getDetails = async () => {
    console.log("Called getDetails()");
    if (window.web3) {
      if (walletAddress == null) {
        return false
      }

      const web3 = window.web3
      const networkId = await web3.eth.net.getId();
      const myAccount = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(myAccount[0])

      const etherValue: string = Web3.utils.fromWei(String(balance), 'ether');

      setChainId(networkId)
      setAddressBalance(parseInt(etherValue))
      setWalletAddress(walletAddress)

    }
  }



  async function connectToWallet(e: any) {
    console.log("called connectToWallet")
    e.preventDefault();
    setIsOpen(false);
    if (typeof window !== undefined) {
      if (window.web3) {
        window.web3 = new Web3(window.ethereum);

        try {
          await window.ethereum.send("eth_requestAccounts");
          const web3 = window.web3
          const accounts = await web3.eth.getAccounts();
          setWalletAddress(accounts[0])
        } catch (e: any) {
          console.log("Error in connecting to walletAddress: ", walletAddress)
        }
      }
    }
  }


  const disconnectWallet = () => {
    try {

      console.log("called disconnectWallet")
      setWalletAddress(null);
    } catch (ex) {
      console.log(ex)
    }
  }

  const onBUSDValueChange = (event: any) => {
    let busdValue: number = event.target.value
    let nepValue: number = Number((busdValue / 3).toFixed(2));
    setBUSD(busdValue)
    setNEP(nepValue)

  }

  const onNEPValueChange = (event: any) => {
    let nepValue: number = event.target.value
    let busdValue: number = Number((nepValue * 3).toFixed(2));
    setBUSD(busdValue)
    setNEP(nepValue)
  }

  return (
    <div className=" flex-col justify-center align-center text-center">
      <Head>
        <title>Neptune Mutual</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-white opacity-30 p-5 border-r-5" />

          <div className="relative bg-white rounded max-w-sm mx-auto p-5 flex justify-center align-center flex-col shadow-md">
            <Dialog.Title className="text-center my-5">Log into your Wallet</Dialog.Title>

            <div>
              <button className="bg-slate-600 p-5 text-white mx-2" onClick={connectToWallet}>Login</button>
              <button className="bg-slate-600 p-5 text-white mx-2" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Dialog>


      {/* Conversion Logic */}
      <InputBox value={NEP} label="NEP" placeholderValue="0" onChangeHandler={onNEPValueChange} />

      <InputBox value={BUSD} label="BUSD" placeholderValue="0" onChangeHandler={onBUSDValueChange} />


      {!walletAddress && (
        <div className=" p-5 ">
          <button className="bg-slate-600 p-5 text-white" onClick={() => setIsOpen(true)}>Login into Wallet</button>
        </div>
      )}

      {walletAddress && (
        <WalletDetails
          addressBalance={addressBalance}
          walletAddress={walletAddress}
          networkChainId={networkChainId}
          onDisconnectWallet={disconnectWallet}
        />
      )}

    </div>
  )
}
