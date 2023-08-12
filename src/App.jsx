import { useState } from 'react'
import './App.css'
import { ethers } from 'ethers'

function App() {
  const [response, setResponse] = useState("Aún nada")


  var provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
  
  var privateKey="0xc38ecca0ce20f1eeaa4c1ade81b48a383476a15400a44975550f1b031808ff31";
  
  var signer = new ethers.Wallet(privateKey,provider);


  const domain = {
    name: 'MinimalForwarder',
    version: '0.0.1',
    chainId: 80001,
    verifyingContract: '0x1676581A4b3Ec2593b5F2023f95a806460cbB1f4'
  };
  
  const newTypes = {
    ForwardRequest: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'gas', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'data', type: 'bytes' }
    ]
  };  

  const message = {
    value: 0,
    gas: 1000000,
    nonce: '27',
    to: '0xb2506A8e2B186ad20FD1A2980b9cfA1A1764cDD6',
    from: '0x9a4C4Ac4fcbF7c3b32b47809aA03d47bA28Ad579',
    data: '0x13501ae0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000000000000000004555344430000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035357460000000000000000000000000000000000000000000000000000000000'
  };  

  var result = {
    signature: '0x667c6b898abc0234e0047b300291808543e95332642d8bf25fc8fd7805f129f75d1c9f9e3d29d597e2a436a5488ab7dad3218bae4cb70c9f4b2bbedebf5701481c',
    request: {
      value: 0,
      gas: 1000000,
      nonce: '27',
      to: '0xb2506A8e2B186ad20FD1A2980b9cfA1A1764cDD6',
      from: '0x9a4C4Ac4fcbF7c3b32b47809aA03d47bA28Ad579',
      data: '0x13501ae0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000000000000000004555344430000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035357460000000000000000000000000000000000000000000000000000000000'
    }
  }
  

  async function firmar() {
    const resp= await signer._signTypedData(domain, newTypes, message);
    setResponse(resp);
  }

  return (
    <>
      Esperado = <br></br>{result.signature}<br></br>
      <button onClick={firmar}>Firmar</button><br></br>
      Obtenido =<br></br> {response}
    </>
  )
}

export default App
