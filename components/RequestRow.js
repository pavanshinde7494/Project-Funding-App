import React , {useState} from 'react'
import { Table , Button } from 'semantic-ui-react'
import web3 from '../ethereum/web';
import Campaign from '../ethereum/campaign';
import ErrorMsg from './ErrorMsg'
import { useRouter } from 'next/router';

export default function RequestRow(props) {

    const router = useRouter()
    const {Row,Cell} = Table;

    const [approveLoading, setApproveLoading] = useState(false)
    const [finalizeLoading, setFinalizeLoading] = useState(false)

    const readyToFinalize = props.request.approvalCount >= props.approversCount/2;

    const onApprove = async()=>{
        setApproveLoading(true)
        try {
            let campaign = Campaign(props.address);
            let accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(props.id).send({
                from : accounts[0]
            })
            setApproveLoading(false)
            router.replace(`/campaigns/${router.query.campaignAdd}/requests`);
        } catch (error) {
            console.log(error);
            setApproveLoading(false)
        }    
    }

    const onFinalize = async()=>{
        setFinalizeLoading(true)
        try {
            let campaign = Campaign(props.address);
            let accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(props.id).send({
                from : accounts[0]
            })
            setFinalizeLoading(false);
            router.replace(`/campaigns/${router.query.campaignAdd}/requests`);
        } catch (error) {
            console.log(error);
            setFinalizeLoading(false);
        }
    }

    return (
        <Row disabled = {props.request.complete} positive = {readyToFinalize && !props.request.complete}>
            <Cell>{props.id}</Cell>
            <Cell>{props.request.description}</Cell>
            <Cell>{web3.utils.fromWei(props.request.value,'ether')} ether</Cell>
            <Cell>{props.request.recipient}</Cell>
            <Cell>{props.request.approvalCount} / {props.approversCount}</Cell>
            <Cell>
                {
                    props.request.complete ? null :   
                   ( 
                    <Button loading = {approveLoading} color='green' basic onClick = {onApprove}>
                        Approve
                    </Button>
                    )
                }
            </Cell>
            <Cell>{
                    props.request.complete ? null :
                    (<Button loading = {finalizeLoading} color='teal' basic onClick = {onFinalize}>
                        Finalize
                    </Button>)
                    }       
            </Cell>
        </Row>
    )
}
