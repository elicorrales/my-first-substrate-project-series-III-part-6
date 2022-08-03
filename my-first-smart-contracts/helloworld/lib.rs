#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod hello_world {

    #[ink(storage)]
    pub struct HelloWorld {}

    impl HelloWorld {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {}
        }

        //see https://ink.substrate.io/faq/  re debug node console messages
        //substrate-contracts-node --dev -lerror,runtime::contracts=debug
        //https://rustrepo.com/repo/paritytech-substrate-contracts-node
        //https://ink.substrate.io/faq/#how-do-i-print-something-to-the-console-from-the-runtime

        #[ink(message)]
        pub fn sayhello(&mut self) {
        }

        #[ink(message)]
        pub fn saybye(&mut self) {
            panic!("\n\nPanicking at saybye()\n\n");
        }
    }
}
