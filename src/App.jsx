import { useState } from 'react'
import './App.css'
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

function App() {
  const [solAmount, setSolAmount] = useState(0);
  const [solanaPublicKey, setSolanaPublicKey] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const onclickhandler=async(solAmount, solanaPublicKey)=>{

    try{
      setError("");
      const connection = new Connection("https://api.devnet.solana.com");
      const publicKeyObject = new PublicKey(solanaPublicKey);
    
      let transactionHash = await connection.requestAirdrop(publicKeyObject,solAmount*1e9);
      setTransactionHash(transactionHash);
      console.log(`transactionHash: ${transactionHash}`);
  
    }catch(error){
      setTransactionHash(""); // Clear previous transaction hash
      if(error.response && error.response.error && error.response.error.message){
        setError(`Error requesting airdrop: ${error.response.error.message}`)
      }else if(error.message){
        setError(`Error requesting airdrop: ${error.message}`)
      }else{
        setError("An unknown error occured")
      }
      console.error('Error requesting airdrop:', error);
    }
  
  }

  return (
    <div className='bg-slate-950 text-slate-50 h-screen flex flex-col justify-center'>
      <div className='flex flex-col items-center'>
      <div className='text-6xl font-bold'>Airdrop Sol</div>
      <div className='text-3xl'>on devnet</div>
      <div className='flex w-full justify-center mt-28'>
      <input 
        type="number" 
        className='h-8 text-black p-2 mr-4' 
        placeholder='Amount of SOL' 
        onChange={(e)=>{
          setSolAmount(Number(e.target.value))
        }} />

      <input 
        type="text" 
        className='w-1/2 h-8 text-black p-2' 
        placeholder='Public Key of your wallet' 
        onChange={(e)=>{
          setSolanaPublicKey(e.target.value)
        }}/>

      </div>
      <button className='mt-5 border rounded-lg p-2 bg-black hover:bg-slate-800 active:bg-slate-600' 
      onClick={()=>{
          onclickhandler(solAmount, solanaPublicKey)
        }}>Airdrop</button>
        {transactionHash && (
          <div className='mt-5 flex flex-col'>
            <p>Successfully airdropped {solAmount} SOL in your wallet!</p>
            <p>Transaction Hash: {transactionHash}</p>
          </div>
        )}
        {error && (
          <div className='mt-5 text-red-500 w-2/3'>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}



export default App
