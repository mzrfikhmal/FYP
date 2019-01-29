import React, { Component } from "react";
import { Form, Button, Table } from "react-bootstrap";
import "./UploadFile.css";
import web3 from "./../web3";
import ipfs from "./../ipfs";
import storehash from "./../storehash";

class UploadFile extends Component {
 
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '',
      recipient: ''
    };
    handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };
 convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    };

onClick = async () => {
try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt
await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
      } //try

    catch(error){
        console.log(error);
      } //catch
  } //onClick
onSubmit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = web3.eth.accounts[0];
      console.log('Default Acc: ' + web3.eth.defaultAccount);
      console.log('Sending from Metamask account: ' + accounts[0]);
    
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});
     await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        this.setState({ ipfsHash:ipfsHash[0].hash });
        
        storehash.methods.sendHash(accounts[0] ,this.state.ipfsHash).send({
          from: accounts[0] 
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //storehash 
      }) //ipfs.add 
    }; //onSubmit

    handlesendMessage = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
     
      console.log('Sending from Metamask account: ' + accounts[0]);
      console.log('Recipient state: ' + this.state.recipient);
      var receiver = this.state.recipient;
      console.log('Receiver address: ' + receiver);
      storehash.methods.sendMessage(this.state.ipfsHash, this.state.transactionHash , this.state.recipient).send({from: accounts[0]
        }).then((values) =>  {console.log(values)}); //storehash 

    };//onSend
    
    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <h1> Upload File To IPFS And Get The Transaction Receipt</h1>
          </header>
          
          <hr />
          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>
            <input 
              type = "file"
              onChange = {this.captureFile}
            />
             <Button 
             bsStyle="primary" 
             type="submit"> 
             Send it 
             </Button>
          </Form>

          <hr/>
 <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
  
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
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>
                  <tr>
                    <td>Tx Hash</td>
                    <td>{this.state.transactionHash}</td>
                  </tr>
                  <tr>
                    <td>Block Number</td>
                    <td>{this.state.blockNumber}</td>
                  </tr>
                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>
                  <tr>
                    <td>View On IPFS</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={`https://ipfs.io/ipfs/${this.state.ipfsHash}`}>IPFS</a></td>
                  </tr>
                  <tr>
                    <td>View Receipt On Etherscan</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={`https://rinkeby.etherscan.io/tx/${this.state.transactionHash}`}>Etherscan</a></td>
                  </tr>
                </tbody>
            </Table> 
            <h4>Send The File To Other User</h4>
            <hr/>
            <Form className="needs-validation" onSubmit={this.handlesendMessage}>
              <h5>IPFS HASH</h5>
              <input type="text" className="form-control" id="ipfsHash" placeholder="IPFS Hash" value={this.state.ipfsHash} required />
              <h5>TX HASH</h5>
              <input type="text" className="form-control" id="transactionHash" placeholder="Transaction Hash" value={this.state.transactionHash} required />
              <h5>RECEIVER ADDRESS</h5>
              <input type="text" className="form-control" id="recipient" placeholder="Address" value={this.state.recipient} onChange={this.handleChange} required />
             <hr/>
              <Button 
             bsStyle="primary" 
             type="submit"> 
             Forward 
             </Button>
            </Form>
            <hr/>
     </div>
      );
    } //render
} //App
export default UploadFile;
