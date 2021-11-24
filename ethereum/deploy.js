const HDWalletProvider =require('truffle-hdwallet-provider');
const Web3=require('web3');
const compiledfactory =require('./build/CampaignFactory.json');

const provider=new HDWalletProvider(
	'strategy hover solve census amazing lucky ride asset grit rabbit world foam',
    'https://ropsten.infura.io/v3/a5e7731293dd4ac69f778244c2b0a543'
);

const web3=new Web3(provider);

const deploy=async()=>{
	const accounts=await web3.eth.getAccounts();
    console.log(accounts);
	console.log(accounts[0]);

	const result=await new web3.eth.Contract(JSON.parse(compiledfactory.interface))
	.deploy({data:compiledfactory.bytecode})
	.send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

	console.log(compiledfactory.interface);
	console.log('addres == ',result.options.address);
};

deploy();