import React from 'react'
import { Message } from 'semantic-ui-react'

export default function ErrorMsg(props) {
    console.log(props.errorMsg);
    return (
        props.errorMsg && 
        <Message
            error
            negative               
            header={props.errorMsg.header}
            content={props.errorMsg.content}
        />
    )
}
