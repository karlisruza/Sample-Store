import React from 'react';
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import s from './Login.scss';

class Login extends React.Component{
    render(){
        return(
                <Row className='form_row'>
                    <Form id='form'>
                        <FormGroup>
                            <Label for="examplePassword">Email</Label>
                            <Input type="email" name="email" id="Email" placeholder="youremail@sample.com" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="password" />
                        </FormGroup>
                        <Button className='submit_btn' color='primary'>Submit</Button>
                        <a href='/register'>Not registered? click here</a>
                    </Form>
                </Row>
        );
    }
}

export default Login;