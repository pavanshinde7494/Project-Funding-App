import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

let campaign;






function requests({reqs, requestCount , approversCount}) {
    const {Header , Row , HeaderCell,Body} = Table;
    console.log(requestCount)
    const router = useRouter();
    campaign = Campaign(router.query.campaignAdd);


    function renderRows(){
        return reqs.map((request,index)=>{
            return <RequestRow
                key = {index}
                id = {index}
                request = {request}
                address = {router.query.campaignAdd}
                approversCount = {approversCount}
            />
        })
    }

    return (
        <Layout>
            <h3>Pending Requets</h3>

            <Button
                style={{marginBottom : '20px'}} 
                floated='right' 
                primary
                onClick = {()=>{
                    router.push(`/campaigns/${router.query.campaignAdd}/requests/new`)
                }}
            >
                Add Requet!
            </Button>


             <Table>
                 <Header>
                     <Row>
                         <HeaderCell>ID</HeaderCell>
                         <HeaderCell>Description</HeaderCell>
                         <HeaderCell>Amount</HeaderCell>
                         <HeaderCell>Recipient</HeaderCell>
                         <HeaderCell>Approval Count</HeaderCell>
                         <HeaderCell>Approve</HeaderCell>
                         <HeaderCell>Finalize</HeaderCell>
                     </Row>
                 </Header>
                 <Body>
                    {renderRows()}
                </Body>
             </Table>
             <div>
                 Found {requestCount} requests
             </div>
            
        </Layout>
    )
}




requests.getInitialProps = async (ctx)=>{
    campaign = Campaign(ctx.query.campaignAdd);
    let requestCount = await campaign.methods.getRequestsCount().call();

    let reqs = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element , index)=>{
            return campaign.methods.requests(index).call()
        })
    )

    let approversCount = await campaign.methods.approversCount().call();
    return { reqs , requestCount , approversCount};
}


export default requests;