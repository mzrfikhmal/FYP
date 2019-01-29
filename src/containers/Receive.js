import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import "./Receive.css";
import web3 from "./../web3";
import storehash from "./../storehash";

class Receive extends Component {
 
    state = {
      ipfsHash: '',
      hash:''  
    };

    
handlereadMessage = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
     
      console.log('Metamask account: ' + accounts[0]);
        
        storehash.methods.readMessage(accounts[0]).call({from: accounts[0]}, {from: accounts[1]}).then((values) => {
          console.log(values);
          this.setState({
            ipfsHash: values[0],
            hash: values[1]
          })
        })
    };//readMsg
    
    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <h1> Receive File From Lecturer</h1>
          </header>
          
       
          <hr/>
          <Button onClick = {this.handlereadMessage}> Get Value</Button>
          <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Tx Hash</td>
                    <td>{this.state.hash}</td>
                  </tr>
                  <tr>
                    <td>View On IPFS</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={`https://ipfs.io/ipfs/${this.state.ipfsHash}`}>IPFS</a></td>
                  </tr>
                  <tr>
                    <td>View Receipt On Etherscan</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={`https://rinkeby.etherscan.io/tx/${this.state.hash}`}>Etherscan</a></td>
                  </tr>
                </tbody>
            </Table>

     </div>
      );
    } //render
} //App
export default Receive;
