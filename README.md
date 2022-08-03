# my-first-substrate-project-series-III-part-6

### This project is part of a series and includes a video.

See [Here](https://github.com/elicorrales/blockchain-tutorials/blob/main/README.md) for the overall document that
refers to all the series.  
  

# Verify You are Indeed Calling Deployed(Uploaded) and Instantiated Contract Methods  
  
We assume you have participated in [Series III - Substrate Blockchain Tutorial](https://github.com/elicorrales/blockchain-tutorials/blob/main/README.md#series-iii---substrate-blockchain-tutorial), [Part 5](https://github.com/elicorrales/my-first-substrate-project-series-III-part-5/blob/main/README.md) of this series and you know how to ```upload```, ```instantiate```, and ```call``` your contract.  
  
 
Let's edit our smart-contract (lib.rs), and add a second method to it.  
Copy-paste the ```sayhello()``` method completely, including the ```#[ink(message)]```.  
  
Rename the second method to any other name - how about ```saybye```.  
  
```
        #[ink(message)]
        pub fn saybye(&mut self) {
            panic!("\n\nPanicking at saybye()\n\n");
        }
```
  
Notice we added something the body:  a ```panic!(....)```.  
  
What is that?  
  
```Macro std::panic```:  
> Panics the current thread.
> This allows a program to terminate immediately and provide feedback to the caller of the program.  
  
Now, build it, then start up your local contracts node in one terminal and upload and instantiate your contract in another terminal.  
  
Then call the ```sayhello```, and then the ```saybye```.  
  
Notice there are no issues with ```sayhello```, but there **is** with ```saybye```.  
  
**But** - there's no noticeably related output in the contracts node terminal.  
  
Why not?  Why didn't we see the actual panic message?  
  
To answer that question, we will shift over to enhancing our Javascript ```client.js```.  
  
Up to now, our ```client.js``` has only interact with the contracts node itself, but **not** with a contract on the node.  
  
The only way we have interacted (briefly) with the contract was via the command-line and using ```cargo contract call```.  
  
However, that way of doing things isn't very useful.  Not only do we not see any related output on the running node, but how do we retrieve anything that might be returned by calling a method on the contract?  
  

# A Better (More Necessary) Way to Setup Our Client Sub-project  
  
## Let's Prep Our Javascript Client

Up to now the client has only required one package:  
  
```
const { WsProvider, ApiPromise, Keyring } = require('@polkadot/api');
```
  
The above is what we used to interact withour local substrate-contracts-node.  
  
But now we want to more easily interact directly with our deployed/uploaded contract.  
  
Now we need another package:  
  
```
const { ContractPromise } = require('@polkadot/api-contract');
```
  
In order to simplify our lives with NPM packages, it's better to have:  
  
A ```package.json``` in the same directory as our ```client.js```:  
```
{
  "name": "my-first-client",
  "version": "1.0.0",
  "description": "",
  "main": "client.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@polkadot/api": "^9.0.1",
    "@polkadot/api-contract": "^9.0.1"
  }
}
```
  
And remove what we had (or at least what I had) been doing, which was creating a symbolic link from the global ```node_modules```, and instead just run ```npm install``` in our client directory.   
  
Make sure you're in the client sub-project directory:  
```
$ tree
.
├── client.js
└── package.json
```
  
Do ```npm ls```.
```
$ npm ls
my-first-client@1.0.0 /home/IamDeveloper/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/my-first-substrate-projects/my-first-project-prep-lesson/my-first-client
├── UNMET DEPENDENCY @polkadot/api-contract@^9.0.1
└── UNMET DEPENDENCY @polkadot/api@^9.0.1

npm ERR! code ELSPROBLEMS
npm ERR! missing: @polkadot/api-contract@^9.0.1, required by my-first-client@1.0.0
npm ERR! missing: @polkadot/api@^9.0.1, required by my-first-client@1.0.0

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/IamDeveloper/.npm/_logs/2022-08-03T22_32_48_711Z-debug-0.log
```
  

Now run ```npm install```.  
```
$ npm install

added 86 packages, and audited 87 packages in 5s

6 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
  
Now do ```npm ls```.
```
$ npm ls
my-first-client@1.0.0 /home/IamDeveloper/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/my-first-substrate-projects/my-first-project-prep-lesson/my-first-client
├── @polkadot/api-contract@9.0.1
└── @polkadot/api@9.0.1
```
  
Do ```tree -L 1```.
```
$ tree -L 1
.
├── client.js
├── node_modules
├── package-lock.json
└── package.json

1 directory, 3 files
```
  
Say your ```client.js`` has the following:  
```
const wsUrl = 'ws://localhost:9944';
const { WsProvider, ApiPromise } = require('@polkadot/api');
const { ContractPromise } = require('@polkadot/api-contract');
(async () => {
    let ws = new WsProvider(wsUrl);
    let wApi = await ApiPromise.create({ provider: ws });
    console.log(await wApi.tx);
    wApi.disconnect();
})();
```
  
Run your substrate-contracts-node.  
  
Now run your client.  Do ```node client.js```.
```
 node client.js
2022-08-03 18:38:01        RPC-CORE: subscribeRuntimeVersion(): RuntimeVersion:: disconnected from ws://localhost:9944: 1000:: Normal connection closure
2022-08-03 18:38:01             DRR: disconnected from ws://localhost:9944: 1000:: Normal connection closure
2022-08-03 18:38:01        RPC-CORE: subscribeRuntimeVersion(): RuntimeVersion:: disconnected from ws://localhost:9944: 1000:: Normal connection closure
```
  
Ok, we should be ready to go now, and expand on how to interact with a contract.  
  

