import React , {useState} from 'react'
import Layout from '../../../../components/Layout'
import Campaign from '../../../../ethereum/campaign'
import { useRouter } from 'next/router'
import { Form , Button , Input } from 'semantic-ui-react'
import web3 from '../../../../ethereum/web';
import ErrorMsg from '../../../../components/ErrorMsg';

let campaign;

export default function New() {

    const router = useRouter();
    campaign = Campaign(router.query.campaignAdd);

    const [des, setDes] = useState('')
    const [val, setVal] = useState('')
    const [res, setRes] = useState('')
    const [loading,setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const onDesChange = (event)=>{
        setDes(event.target.value);
    } 
    const onValChange = (event)=>{
        setVal(event.target.value);
    } 
    const onResChange = (event)=>{
        setRes(event.target.value);
    } 

    const onSubmit = async (event)=>{

        event.preventDefault();
        setLoading(true);
        try {
            let accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                des, 
                web3.utils.toWei(val,'ether') ,
                res)
                .send({
                    from : accounts[0]
                });

            setLoading(false);
            router.replace(`/campaigns/${router.query.campaignAdd}/requests`);
        } catch (error) {
            setInterval(() => {
                setErrorMsg(null);
            }, 2000);

            setErrorMsg({
                header : 'Error',
                content : error.message
            })
            setLoading(false);
        }
            
    }

    return (
        <Layout>
            
            
            <a onClick = {()=>{
                router.push(`/campaigns/${router.query.campaignAdd}/requests`)
            }}>
                <div style={{marginTop : '20px'}} >
                    Back
                </div>    
            </a>
            
         

            <ErrorMsg errorMsg = {errorMsg}/>
           <h3>Create a Request</h3>
            <Form onSubmit = {onSubmit}>
                <Form.Field>
                    <label>
                        Description
                    </label>
                    <Input
                        value = {des}
                        onChange = {onDesChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>
                        Value in Ether
                    </label>
                    <Input
                        value = {val}
                        onChange = {onValChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>
                        Recipient
                    </label>
                    <Input
                        value = {res}
                        onChange = {onResChange}
                    />
                </Form.Field>
                
                <Button loading = {loading} primary>Create!</Button>
            </Form>
        </Layout>
    )
}
