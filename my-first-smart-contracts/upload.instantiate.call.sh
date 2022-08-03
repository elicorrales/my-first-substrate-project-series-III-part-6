#!/usr/bin/bash

projectdir=$1;
methodname1=$2;
methodname2=$3;

if [ "$projectdir" = "" ];
then
  echo;
  echo "ERROR projectdir";
  echo;
  exit 1;
fi;

if [ "$methodname1" = "" ];
then
  echo;
  echo "WARNING: no methodname1";
  echo;
fi;


if [ "$methodname2" = "" ];
then
  echo;
  echo "WARNING: no methodname2";
  echo;
fi;


cd ~/MySoftwareProjects/blockchain/rust/rust-substrate-blockchain-projects/my-first-substrate-projects/my-first-project-prep-lesson/my-first-smart-contracts;

cd $projectdir; # which rust smart contract project;

rm -f upload.log instantiate.log 2>&1;

echo;echo;echo "cargo update......";echo;echo;
cargo update;

echo;echo;echo "cargo contract build......";echo;echo;
cargo +nightly contract build --release;
#cargo +nightly contract build ;
if [ $? -ne 0 ];
then
  echo;
  echo "ERROR building";
  echo;
  exit 1;
fi;

echo;echo;echo "cargo contract upload......";echo;echo;
cargo contract upload --suri //Alice 2>&1 | tee upload.log;
code_hash=$(cat upload.log | tail -2 | grep "Code hash" | sed -e 's/^.*Code hash *//');
if [ "$code_hash" = "" ];
then
  echo;
  echo "ERROR uploading";
  echo;
  exit 1;
fi;

echo;echo;echo "cargo contract instantiate......";echo;echo;
cargo contract instantiate \
  --gas 500000000000 \
  --constructor new \
  --suri //Alice \
  --code-hash $code_hash 2>&1| tee instantiate.log;

Contract=$(cat instantiate.log | tail -2 | grep "Contract"|sed -e 's/^.*Contract *//');
echo $Contract;
if [ "$Contract" = "" ];
then
  echo;
  echo "ERROR instantiating";
  echo;
  exit 1;
fi;


if [ "$methodname1" != "" ];
then
  echo;echo;echo "cargo contract call $methodname1......";echo;echo;
  cargo contract call \
    --gas 500000000000 \
    --message $methodname1 \
    --suri //Alice \
    --contract $Contract
fi;



if [ "$methodname1" != "" ];
then
  echo;echo;echo "cargo contract call $methodname2......";echo;echo;
  cargo contract call \
    --gas 500000000000 \
    --message $methodname2 \
    --suri //Alice \
    --verbose \
    --contract $Contract
fi;



echo;
echo $code_hash;
echo;
echo $Contract;
echo;
