

import React, { useEffect } from 'react'


interface IWalletDetailsProps {
    networkChainId: number;
    addressBalance: number;
    walletAddress: string;
    onDisconnectWallet: () => void
}

const WalletDetails = ({
    networkChainId,
    addressBalance,
    walletAddress,
    onDisconnectWallet 
    }:
    IWalletDetailsProps) => {
    return (
        <div className="flex justify-center align-center flex-col">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-2 text-center">NetworkChainId</th>
                        <th className="px-2 text-center">Balance</th>
                        <th className="px-2 text-center">Account Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td className="px-2 text-center">{networkChainId}</td>
                        <td className="px-2 text-center">{addressBalance}</td>
                        <td className="px-2 text-center">{walletAddress}</td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-center align-center my-5">

                <button className="bg-slate-600 p-5 text-white w-52" onClick={onDisconnectWallet}>Disconnet</button>
            </div>
        </div>
    )
}

export default WalletDetails
