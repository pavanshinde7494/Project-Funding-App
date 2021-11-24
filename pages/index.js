import React , {useState , useEffect} from 'react';
import factory from '../ethereum/factory';
import { Card , Button } from 'semantic-ui-react';
import Layout from '../components/Layout'
import ReactDom from 'react-router-dom';
import { useRouter } from 'next/router';
import clg from "../public/walchand.jpg"


const index = ({ campaigns })=>{
    const router = useRouter();
    let items = campaigns.map(address=>{
        return {
            header : address,
            description : <a><div onClick={()=>{
                router.push(`/campaigns/${address}`);
            }}>View Campaign</div></a>,
            fluid : true
        }
    });

    return(
        <>
            <Layout>
                <br/>
                <br/>
                <br/>
            <img src={clg.src}/>
            
            <br/>
            <h1>Purpose</h1>
            <h3>Start a Fundraiser in three simple steps</h3>
            <p>Start a Fundraiser Separator
            Start your fundraiser
            It’ll take only 2 minutes. Just tell us a few details about you and the ones you are raising funds for.</p>
            <h3>Share your fundraiser</h3>
            <p>All you need to do is share the fundraiser with your friends and family. In no time, support will start pouring in.
            Share your fundraiser directly from dashboard on social media.
            Withdraw Funds
            The funds raised can be withdrawn without any hassle directly to your bank account.
            It takes only 5 minutes to withdraw funds on ketto.</p>
            
            <br/>

            <Button  
                content='Login' 
                primary 
                onClick = {()=>{
                    router.replace('/login')
                }}
            />
            <div>
            <b>OR</b>
            </div>
            <Button  
                content='Register' 
                primary 
                onClick = {()=>{
                    router.replace('/register')
                }}
            />
                <div>
                    <h3 style={{marginTop: '30px'}}>Open Projects</h3>
                    
                    <Button  
                        floated='right' 
                        content='Creat Campaign' 
                        icon='plus circle' 
                        labelPosition='left' 
                        primary 
                        onClick = {()=>{
                            router.replace('/campaigns/new')
                        }}
                    />
                     
                    <Card.Group items = {items}/>
                </div>
            </Layout>    
        </>
        
    )
}

index.getInitialProps = async (ctx) => {
    const fetchingCampaigns = await factory.methods.getDeloyedCampaigns().call();
    return { campaigns: fetchingCampaigns }
  }

export default index;
