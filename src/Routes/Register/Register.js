import React from 'react';
import { Form, FormGroup, Button, Input } from 'reactstrap';
import './Register.scss';

import Layout from '../../Components/Layout/Layout.js'


class Register extends React.Component {
  render() {
    return (
        <Layout>
              <div className='register__form'>
                <Form className='register__form'>
                    <span>username</span>
                    <Input name="username" />
                    <span>Full name or artist name</span>
                    <Input name='name' />
                    <span>Email</span>
                    <Input name='email'/> 
                    <span>Password</span>
                    <Input name="password" />
                    <div className='terms'> 
                      <input type='checkbox' />
                      <span>I agree to the terms and conditions</span>
                    </div>
                    <br />
                    <Button color='primary' name='register' type='submit' className='sign__up'>Sign up!</Button>
                </Form>
              </div>
        </Layout>
    );
  }
}

export default Register;
