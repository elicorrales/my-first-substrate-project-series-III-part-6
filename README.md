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
  
 
  
