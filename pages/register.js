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
    const router = useRouter();
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
            label='First name'
            placeholder='First name'
          />
          <Form.Field
            control={Input}
            label='Last name'
            placeholder='Last name'
          />
          <Form.Field
            control={Select}
            label='Gender'
            options={options}
            placeholder='Gender'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Username'
            placeholder='Username'
          />
          <Form.Field
            control={Input}
            type='password'
            label='Password'
            placeholder='Password'
          />
          <Form.Field
            control={Input}
            type='password'
            label='confirm password'
            placeholder='confirm password'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='College Name'
            placeholder='College Name'
          />
          <Form.Field
            control={Input}
            label='Adhaar Number'
            placeholder='Adhaar Number'
          />
          <Form.Field
            control={Input}
            label='Class'
            placeholder='Class'
          />
        </Form.Group>
        
        <Form.Field
          control={TextArea}
          label='About'
          placeholder='Tell us more about you...'
        />
        <Form.Field
          control={Checkbox}
          label='I agree to the Terms and Conditions'
        />
        <Form.Field>
            <Button primary onClick={()=>{
                router.replace('/campaigns/new')
            }}>
                Register
            </Button>
        </Form.Field>
        </Form>
            </Layout>
        </div>
    )
}
