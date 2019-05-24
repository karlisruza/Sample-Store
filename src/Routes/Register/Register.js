import React from 'react';
import { Form, FormGroup, Button, Input } from 'reactstrap';
import './Register.scss';

import Layout from '../../Components/Layout/Layout.js'
require('isomorphic-fetch');


class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: '', name: '', email: '', password: '' };
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const { username, email, password, name } = this.state;
    const mutation = `mutation{
                          addUser(username:"${username}", email:"${email}", password:"${password}", name:"${name}"){
                            user_id
                          }
                      }`
    fetch('http://localhost:8080/graphql', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
      }),
    })
    .then(res => {
      res.json();
    })
    .catch(err => console.log(err))
    .then(res => {
        window.location.replace("/");
     })
    .catch(err => console.log(err));
  }

  handleInputChange = (event) =>{
    console.log(event.target.name);
    if(event.target.name === 'username'){
      this.setState({username: event.target.value});
    }
    else if(event.target.name === 'name'){
      this.setState({name: event.target.value});
    }
    else if(event.target.name === 'email'){
      this.setState({email: event.target.value});
    }
    else if(event.target.name === 'password'){
      this.setState({password: event.target.value});
    }
  }

  render() {
    return (
        <Layout>
              <div className='register__form'>
                <Form className='register__form'>
                    <span>username</span>
                    <Input name="username" onChange={this.handleInputChange}/>
                    <span>Full name or artist name</span>
                    <Input name='name' onChange={this.handleInputChange}/>
                    <span>Email</span>
                    <Input name='email' onChange={this.handleInputChange}/> 
                    <span>Password</span>
                    <Input name="password" type="password" onChange={this.handleInputChange}/>
                    <div className='terms'> 
                      <input type='checkbox' />
                      <span>I agree to the terms and conditions</span>
                    </div>
                    <br />
                    <Button color='primary' name='register' type='button' onClick={this.handleSubmit} className='sign__up'>Sign up!</Button>
                </Form>
              </div>
        </Layout>
    );
  }
}

export default Register;
