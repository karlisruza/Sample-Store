import React from 'react';
import { Row, Button } from 'reactstrap';

import './Pack.scss';
import Layout from '../../Components/Layout/Layout.js';
import SampleContainer from '../../Components/SampleContainer/SampleContainer.js';
import SampleCard from '../../Components/SampleCard/SampleCard.js';
import PackCard from '../../Components/PackCard/PackCard.js';
import Comment from '../../Components/Comment/Comment.js';
import CreateComment from '../../Components/CreateComment/CreateComment.js'


class Pack extends React.Component{
    constructor(props){
        super(props);
        this.state = {queryResults: null};
    }
    
    componentDidMount = () =>{
        const pack_id = this.props.match.params.id;
        const query = `
        {
            samples(id: "${pack_id}"){
            sample_id
            name
            user_id{
                name
            }
            pack_id{
                name
            }
            price
            sample_path
            key
            bpm
            }
            comments(pack_id: "${pack_id}"){
                comment_id
                user_id{
                    user_id
                    name
                    img_path
                }
                title
                body
                rating
                created_on
            }
            pack(id:"${pack_id}"){
                pack_id
                img_path
                description
                rating
                price
            }
        }`;
        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: query,
            }),
          })
          .then( response => response.json() )
          .then( response => this.setState({queryResults: response.data} ) );
    }

     //ensures that created comment is added w/o refresh
    commentCallback = (newComment) =>{
        let newQueryResults = this.state.queryResults;
        newQueryResults.comments.push(newComment);
        this.setState({queryResults: newQueryResults});
    }

    //ensures that deleted comment is removed w/o refresh
    deleteCommentCallback = (deletedComment_id) =>{
        const { comments } = this.state.queryResults;
        let newQueryResults = this.state.queryResults;

        for(let i = 0; i < comments.length; i++){
            if(comments[i].comment_id === deletedComment_id){
                comments.splice(i, 1);
                this.setState({})
                newQueryResults.comments = comments;
                this.setState({queryResults: newQueryResults});
            }
        }
    }

    render(){
        let samples, sampleList, comments, commentList, pack, content;

        if(!this.state.queryResults) return null;
        if(this.state){
            samples = this.state.queryResults.samples;
            comments = this.state.queryResults.comments;
            pack = this.state.queryResults.pack;
        }
        console.log(pack);
        
        if(samples){
            sampleList = samples.map(sample =>
                <SampleCard 
                    key={sample.sample_id}
                    sample_id={sample.sample_id} 
                    title={sample.name}  
                    bpm={sample.bpm} 
                    rootKey={sample.Key} 
                    price={sample.price} 
                    sample_path={sample.sample_path}
                />
            );
            commentList = comments.map(comment =>
                <Comment 
                    key={comment.comment_id}
                    comment_id={comment.comment_id}
                    img={comment.user_id.img_path}
                    user_id={comment.user_id.user_id}
                    user={comment.user_id.name}
                    title={comment.title} 
                    body={comment.body} 
                    rating={comment.rating} 
                    created={comment.created_on}
                    callback={this.deleteCommentCallback}
                />
            );
            content = (
            <div>
                <Row className='sidebar'>
                    <PackCard img={pack.img_path} pack_id={pack.pack_id} rating={pack.rating} price={pack.price}/>
                    <br />
                    <Button color='primary' className='Btn'>Download</Button>
                    <p>{pack.description}</p>
                    <CreateComment 
                        className='comment__form' 
                        callback={this.commentCallback} 
                        pack_id={pack.pack_id}
                    />
                </Row>
                <SampleContainer>
                    {sampleList}
                    <h3>Comments</h3>
                    <Row>
                        {commentList}
                    </Row>
                </SampleContainer>
            </div>
            );
        }

        return(
            <Layout>
                {content}
            </Layout>
        );
    }
}

export default Pack;

