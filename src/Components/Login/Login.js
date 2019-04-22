import React from 'react';
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import s from './Login.scss';

require('isomorphic-fetch');

class Login extends React.Component{

    componentWillMount(){

    }

    render(){

        //FETCH TEST!
        // const query = `{
        //     user{
        //       user_id
        //       username
        //       email
        //       pass
        //     }
        //   }`;

        // fetch('http://localhost:8080/graphql', {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       query: query,
        //     }),
        //   })
        // .then(res => {
        //     res.json();
        // })
        // .catch(err => console.log(err))
        // .then(res => {
        //     console.log(res.data);
        // })
        // .catch(err => console.log(err));

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