const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');


let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async()=>{
    accounts = await new web3.eth.getAccounts();
    
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data : compiledFactory.bytecode })
        .send(
            { 
                from : accounts[0] , 
                gas : '1000000' 
            }
        );

    await factory.methods.createCampaign('100')
    .send(
        {
            from : accounts[0] ,gas : '1000000' 
        }
    );

    [campaignAddress] = await factory.methods.getDeloyedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface) ,
        campaignAddress 
    );

});

describe('Campaigns',()=>{

    it('deploys factory and campaign',()=>{
        assert.ok(campaign.options.address);
        assert.ok(factory.options.address);
    })

    it('validates manager', async()=>{
        let manager = await campaign.methods.manager().call();
        assert.equal(manager , accounts[0]);
    })

    it('allows people to contribute money and marks as approver',async()=>{

        await campaign.methods.contribute().send({
            from : accounts[1],
            value : '101'
        });
        
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        let approversCount = await campaign.methods.approversCount().call();

        assert.ok(isContributor);
        assert.equal(approversCount , 1);
    })
    
    it('requires a minimum contribution',async()=>{

        try {
            await campaign.methods.contribute().send({
                from : accounts[1],
                value : '99'
            }); 
            assert(false);
        } catch (error) {
            assert(error);
        }
    })
    it('allows manager to make payment req',async()=>{
        await campaign.methods.createRequest('Buying Products','100',accounts[1]).send({
            from : accounts[0],
            gas : '1000000'
        });
        let request = await campaign.methods.requests(0).call();
        assert.equal('Buying Products',request.description);
    })

    it('processes request',async()=>{
        
        await campaign.methods.contribute().send({
            from : accounts[0],
            value : web3.utils.toWei('10','ether')
        });

        await campaign.methods.createRequest('Buying Products', web3.utils.toWei('5','ether'),accounts[1]).send({
            from : accounts[0],
            gas : '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from : accounts[0],
            gas :'1000000'
        })

        await campaign.methods.finalizeRequest(0).send({
            from : accounts[0],
            gas : '1000000'
        })

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);
        assert(balance >= 104.9);
    })
})