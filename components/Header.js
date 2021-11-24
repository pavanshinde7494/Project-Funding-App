import React from 'react'
import { Menu } from 'semantic-ui-react';
import Head from 'next'
import { useRouter } from 'next/router';

function Header() {
    const router = useRouter();
    return (
      <div>
          <Menu style={{marginTop : '10px'}}>
          
            <Menu.Item onClick = {()=>{
              router.replace('/')
            }}>
                CrowdCain
            </Menu.Item>
         

        <Menu.Menu position='right'>

          
            <Menu.Item onClick = {()=>{
              router.replace('/')
            }} >
              Campaign
            </Menu.Item>
        
            <Menu.Item onClick={()=>{
              router.replace('/campaigns/new')
            }}>
              +
            </Menu.Item>
          
        </Menu.Menu>
        </Menu>   
      </div>
       
    )
}


export default Header;