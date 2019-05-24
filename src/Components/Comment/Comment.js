import React from 'react';

import './Comment.scss';

class Comment extends React.Component{

    deleteComment = () =>{
        const mutation=`mutation{
            deleteComment(comment_id: "${this.props.comment_id}"){
                comment_id
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
              this.props.callback(this.props.comment_id);
            });
        }
    
    render(){
        const { img, user, title, body, rating, created} = this.props;
        const user_link = `/user/`+this.props.user_id;

        return(
            <div className='comment'>
                <div className='left__side'>
                    <img className="comment__img" src={img} alt="Picture goes here" />
                    <a href={user_link}>By {user}</a>
                    <br />
                    <span className='created__at'>Created at {created}</span>
                </div>
                <div className='comment__content'>
                    <h5 className='title'>{title}</h5>
                    <span className='rating'>{rating}</span>
                    <br />
                    <br />
                    <p className='body'>{body}</p>
                </div>
                <i class="trash alternate icon" onClick={this.deleteComment}></i>
            </div>
        );
    }
}

export default Comment;