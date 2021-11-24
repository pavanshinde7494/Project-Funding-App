import React , {useState} from 'react'
import { Card , Button,Input ,Grid  } from 'semantic-ui-react'
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign';
import { useRouter } from 'next/router'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import web3 from '../../ethereum/web';
import ContributeForm from '../../components/contributeForm';
import ErrorMsg from '../../components/ErrorMsg'



let campaign ;

export default function campaignAdd({campaignInfo}) {

    const router = useRouter();
    campaign = Campaign(router.query.campaignAdd);


    const [loading, setLoading] = useState(false);
    const [amount,setAmount] = useState(0);
    const [errorMsg,setErrorMsg] = useState(null);

    const onChange = (event)=>{
        setAmount(event.target.value);
    }

    const onSubmit = async()=>{
      event.preventDefault();
      setLoading(true);
      try {
        let accounts = await web3.eth.getAccounts();
        await campaign.methods.contribute().send({
          from : accounts[0],
          value : web3.utils.toWei(amount,'ether')
        });
        setLoading(false);   
        router.replace(`/campaigns/${router.query.campaignAdd}`);
      } catch (error) {

        setInterval(() => {
          setErrorMsg(null);
        }, 2000);
        
        setErrorMsg({header : 'Error' , content : error.message})
        setLoading(false);
      }
    }

    const {
        minimumContribution,
        balance ,
        requests ,
        approversCount ,
        manager 
    } = campaignInfo;

    let items = [
        {
          header: manager,
          description:'The manager created this campaign and can create request to withdraw money',
          meta: 'Manager of Campaign',
          style : { overflowWrap : 'break-word' }
        },
        {
          header: minimumContribution,
          description: 'You must contribute at least this much wei to become a approver',
          meta: 'Minimum contribution (wei)'
        },
        {
          header: requests,
          description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
          meta: 'Number of Requets',
        },
        {
          header: approversCount,
          description:'Number of people who have already donated to this campaign',
          meta: 'Number of approvers',
        },
        {
            header: web3.utils.fromWei(balance,'ether'),
            description: 'The balance is how much money this campaign has to spend',
             meta: 'Campaign Balance (ether)',
          }
      ]

    return (
        <Layout>
            <div >
                <h3 style={{marginTop:'30px'}}>Campaign Details</h3>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <Card.Group  items={items} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <ErrorMsg errorMsg = {errorMsg} />
                      <ContributeForm onSubmit = {onSubmit} onChange = {onChange} amount = {amount} loading = {loading} />
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Button 
                          primary 
                          style = {{marginLeft : '20px'}}
                          onClick = {()=>{
                            router.push(`/campaigns/${router.query.campaignAdd}/requests`);
                          }}
                        >
                          View Requests
                      </Button>
                    </Grid.Row>
                </Grid>
                
            </div>
        </Layout>
    )
}

campaignAdd.getInitialProps = async(ctx)=>{
    campaign = Campaign(ctx.query.campaignAdd);
    let summary = await campaign.methods.getSummary().call();


    let campaignInfo = {
        minimumContribution : summary[0],
        balance : summary[1],
        requests : summary[2],
        approversCount : summary[3],
        manager : summary[4]
    }
    return {campaignInfo }
}






