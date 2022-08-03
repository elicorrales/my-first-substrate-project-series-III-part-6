# my-first-substrate-project-series-III-part-6

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
  
Now, build it, then start up your local contracts node in one terminal and upload and instantiate your contract in another terminal.  
  
Then call the ```sayhello```, and then the ```saybye```.  
  
Notice there are no issues with ```sayhello```, but there **is** with ```saybye```.  
  

  
