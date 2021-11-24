import React , {useState} from 'react';
import Layout from '../../components/Layout';
import { Form , Button , Input ,Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web from '../../ethereum/web';
import web3 from '../../ethereum/web';
import ErrorMsg from '../../components/ErrorMsg';
import { useRouter } from 'next/router';

function campaignNew()
{
    const router = useRouter();

    const [minContribution, setMinContribution] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
            let accounts = await web3.eth.getAccounts();
            setLoading(true);
            await factory.methods
                .createCampaign(minContribution)
                .send({
                    from : accounts[0]
                });
            router.replace('/');
                
        } catch (error) {
            setTimeout(() => {
                setErrorMsg(null);
            }, 2000);
           
            setErrorMsg({
                header : 'Error',
                content : error.message
            })
        }
        setLoading(false);
        
    }

    return (
        <Layout>
        <ErrorMsg errorMsg = {errorMsg} />
        <div>
           <br/>
           <h3>Create New Campaign</h3>
            <Form onSubmit = {onSubmit}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        type='number'
                        label='wei'
                        labelPosition='right'
                        placeholder='Enter Amount'
                        value = {minContribution}
                        onChange = {(event)=>{setMinContribution(event.target.value);}}
                    />
                </Form.Field>
                <Button loading={loading} primary type='submit' >Create!</Button>
                
            </Form>

            
        </div>
        </Layout>
    )
}

export default campaignNew;