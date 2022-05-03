import { ethers, Wallet } from 'ethers';

async function main() {
  const MAX_GAS_LIMIT = 1000000000;
  const options = {
    // gasPrice,
    gasLimit: MAX_GAS_LIMIT,
    nonce: 45,
  };

  const _provider = ethers.providers.getDefaultProvider(
    'http://54.255.212.178:8545',
    options,
  );
  

  let signer = new Wallet('e8b805a8cf9394ff77d37db3f05d0219e90b84d569ae0096d2e7d5ca8975c633');
  let contract_address = "0x000000000000000000000000000000000000f000";

  const owner = signer.connect(_provider);

  let abi = [
    "function distributeBlockReward()",
    "function stake(address validator) external payable returns(bool)",
    "function getActiveValidators() public view returns (address[] memory)",
    "function withdrawProfits(address validator) external returns (bool)",
    "function getTotalStakeOfActiveValidators()",
  ]

  const Contract = new ethers.Contract(contract_address, abi, _provider);

  let address_validator = "d562c895c835f6769fd023684c94c3eb7f1e43ac";
//   let tx = await Contract.connect(owner).stake('0x0xf3f313ea2059418b56b10426a335f381d16c332d',[{
//     gasLimit: MAX_GAS_LIMIT,
//     gasPrice: 1000000000
//     // value: 5000000
//   }]);

  let list_validator = await Contract.connect(owner).getActiveValidators();
  // await tx.wait();
  console.log("list_validators: ", list_validator);

    // let balance =  await _provider.getBalance("0x000000000000000000000000000000000000f000");
    // console.log(ethers.utils.formatEther(balance));

    let withdrawProfits = await Contract.connect(owner).withdrawProfits(signer.address, {
      gasLimit: MAX_GAS_LIMIT,
      gasPrice: '1000000000'
    });
    await withdrawProfits.wait();
    console.log("withdrawProfits: ", withdrawProfits.hash);


  // stake
  //   let tx = await Contract.connect(owner).stake('0xf3f313ea2059418b56b10426a335f381d16c332d', {
  //     value: '100000000000000000000',
  //     gasLimit: MAX_GAS_LIMIT,
  //     gasPrice: '1000000000'
  //   });
  //   await tx.wait();
  //   console.log("tx: ", tx);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
