import React from 'react'
import { useState } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
  } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
  
export default function login() {
    const router = useRouter()
    const [value, setValue] = useState()
    const handleChange = (e)=>{
        setValue(e.target.value);
    }
    return (
        <div>
            <Layout>
                <br/>
                <br/>
            <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='username'
            placeholder='username'
          />
          
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            type='password'
            label='password'
            placeholder='password'
          />
        </Form.Group>
        
        <Form.Field>
            <Button primary onClick={()=>{
                router.replace('/campaigns/new')
            }}>
                Login
            </Button>
        </Form.Field>
      </Form>
            </Layout>
        </div>
    )
}
