import React from 'react'
import { Form , Input , Button } from 'semantic-ui-react'

export default function contributeForm(props) {
    return (
        <div>
            <Form onSubmit = {props.onSubmit}>
                <Form.Field>
                    <label>Enter Amount to Contribute!!</label>
                    <Input
                        label='ether'
                        labelPosition='right'
                        placeholder='Enter Amount' 
                        value = {props.amount}
                        onChange = {props.onChange}                       
                    />
                </Form.Field>
                <Button loading = {props.loading} primary type='submit' >Contribute!</Button>
                
            </Form>
        </div>
    )
}
