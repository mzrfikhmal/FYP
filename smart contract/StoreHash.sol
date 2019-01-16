pragma solidity ^0.4.24;

contract Contract {
 struct File {
 string ipfsHash;
 string fo;
 string foo;
 }
 
 mapping (address => File) files;

event hashInfo(
        string ipfsHash     
    );
 
 function sendHash(address _address,string _ipfsHash) public {
     var file = files[_address];
   file.ipfsHash = _ipfsHash;
   
   emit hashInfo(_ipfsHash);
 }
 
function getHash(address _address) view public returns (string) {
   return (files[_address].ipfsHash);
 }
 
 mapping (address => address) recipient;
 
 function sendMessage(string msg1, string msg2, address _recipient) public {
    files[_recipient].fo = msg1;
    files[_recipient].foo = msg2;
  }
  function readMessage(address _address) public view returns (string , string) {
    return (files[_address].fo, files[_address].foo);
  }
}
