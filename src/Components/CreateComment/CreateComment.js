import React from 'react';
import { Form, Input, Button } from 'reactstrap';

import './CreateComment.scss';

class CreateComment extends React.Component{
    render(){
        return(
            <Form className='comment__form'>
                <h3>Rate & comment</h3>
                <span> Rating starts </span>
                <Input placeholder='Add a title...'className='input__title'/>
                <Input placeholder='Say something constructive!' className='input__body' />
                <Button color='primary' type="submit" className='submit__btn'>Submit</Button>
            </Form>
        );
    }
}

export default CreateComment;