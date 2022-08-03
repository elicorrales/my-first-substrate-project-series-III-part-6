/*
//This info was obtained by running "substrate-contracts-node key inspect //Alice"
//on the command line
Secret Key URI `//Alice` is account:
  Public key (hex):  0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  Account ID:        0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  Public key (SS58): 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
  SS58 Address:      5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
*/



const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');
const { ContractPromise } = require('@polkadot/api-contract');

const wsUrl = 'ws://localhost:9944';
const httpUrl = 'http://localhost:9933';

/*
if (process.argv.length < 4) {
  console.log('\n\nNEED SMART-CONTRACT BASE DIR');
  console.log('NEED INSTANTIATED CONTRACT ADDRESS/ID');
  return;
}
*/

//Get the project root dir cmd-line param so we can navigate
//to where we need to, while being flexible
//for any Rust smart-contract project
let projectBaseDir = process.argv[2];
//let projectBaseDir = 'helloworld';


//Get the contract id cmd-line param so we can run this client
//any time the contract id changes (the contract is re-uploaded)
let contractAddress = process.argv[3];
//let contractAddress = '5DBNy9WWfgyR7JmrT3d7eHNfz8KbDJZgvXTstCnZknWhMEED';

//path to navigate to the metadata
let metadataPath = '../my-first-smart-contracts/' + projectBaseDir + '/target/ink/metadata.json';

//convert the metadata file constants into local variable
const metadata = require(metadataPath);
//console.log(metadata);


(async () => {

  //connect to our local substrate node
  let ws = new WsProvider(wsUrl);
  let wsApi = await ApiPromise.create({ provider: ws });

  const contract = new ContractPromise(wsApi, metadata, contractAddress);

  //Web3 accounts
  //You will need a Substrate account to sign messages.
  //Check the docs section on Keyring in order to get access 
  //to dev accounts (Alice, Bob, Charlie, ..etc.)
  const keyring = new Keyring({ type: 'sr25519' });
  const alicePair = keyring.addFromUri('//Alice', { name: 'Alice default' });
  //console.log(alice.address);
  //The above will just print the same info as (see top of this file)
  //SS58 Address:      5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
  //
  // If you do a "new Keyring()" with no type, you get a different address

  const gasLimit = -1; //3000n * 1000000n;
  const storageDepositLimit = null
  const value = 0;

  /*
    So we can call any read-only function by using query.<methodName>
    Its format is always of the form 
    .methodName(<account address to use>, <value>, <gasLimit>, <…additional params>)
  */

  // (We perform the send from an account, here using Alice's address)
  let query = await contract.query;  //.get.call([contract.abi.messages[0].method]);//({ gasLimit: 50000000000000 });

  //this gives an object listing each contract method, and its meta
  //console.log(query);


  const { gasRequired, storageDeposit, result, output } =
    await contract.query.sayhello(alicePair.address, { gasLimit, });

  console.log('gas:', gasRequired, ',  dep:', storageDeposit.toHuman(), ',  out:', output != undefined ? output.toHuman() : null);
  console.log(result.toHuman());


  wsApi.disconnect();

})();
