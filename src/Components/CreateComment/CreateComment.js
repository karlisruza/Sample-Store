import React from 'react';
import { Form, Input, Button } from 'reactstrap';

import Rating from '../StarRating/StarRating'
import './CreateComment.scss';



class CreateComment extends React.Component{
    constructor(props){
        super(props);
         this.state = {}
    }

    handleSubmit = (e) =>{ 
        e.preventDefault();
        const user_id = "ea7e866f-6005-46a6-9fa1-3a751a3de40c";
        const { title, body } = this.state;
        const rating = 7;
        const { pack_id } = this.props;
        const mutation = `mutation{
            addComment(title: "${title}", body: "${body}", rating: ${rating} , user_id:"${user_id}", pack_id:"${pack_id}"){
                comment_id
                user_id{
                    name
                    img_path
                }
                title
                body
                rating
                created_on
            }
        }`;
        
        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: mutation,
            }),
          })
          .then( response => response.json() )
          .then( response => {
              const { comment_id, user_id, title, body, rating, created_on } = response.data.addComment;
              const newComment = {
                    comment_id,
                    user_id,
                    title,
                    body,
                    rating,
                    created_on
                }
              this.props.callback(newComment);
            });
        }


    handleInputChange = (event) =>{
        console.log(event.target.name);
        if(event.target.name === 'title'){
            this.setState({title: event.target.value});
        }
        else if(event.target.name === 'body'){
            this.setState({body: event.target.value});
        }
    }

    render(){

        return(
            <Form className='comment__form' onSubmit={this.handleSubmit}>
                <h3>Rate & comment</h3>
                <Rating rating={5} />
                <Input placeholder='Add a title...'className='input__title' name='title' onChange={this.handleInputChange}/>
                <Input placeholder='Say something constructive!' className='input__body' name='body' onChange={this.handleInputChange}/>
                <Button color='primary' type="submit" className='submit__btn'>Submit</Button>
            </Form>
        );
    }
}

export default CreateComment;