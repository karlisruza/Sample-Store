import React from 'react';
import { Row } from 'reactstrap';

import PlayButton from '../Audio/PlayButton/PlayButton.js';
import s from './PackCard.scss';

const user_id = "ea7e866f-6005-46a6-9fa1-3a751a3de40c";

class PackCard extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: false,
      }
    }

    componentDidMount = () =>{
        const query=`{
            packlikes(user_id:"${user_id}", pack_id:"${this.props.pack_id}"){
                like_id
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
          .then( response => this.setState({queryResults: response.data, liked:response.data.packlikes[0]} ) );
    }

    handlePlayClick = () =>{
        const { isPlaying } = this.state;
        this.setState({isPlaying: !isPlaying});
    }

    handleLikeClick = () => {
        this.setState({liked: !this.state.liked});
        let mutation;
        if(!this.state.liked){
            mutation = `mutation{
                            addPackLike(user_id:"${user_id}", pack_id:"${this.props.pack_id}"){
                                like_id
                            }
                        }`;
        }
        else{
            mutation = `mutation{
                deletePackLike(user_id:"${user_id}", pack_id:"${this.props.pack_id}"){
                    like_id
                }
            }`;            
        }
        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: mutation,
            }),
          })
          .then( response => response.json() )
    }

    render(){
        if(!this.props.pack_id || !this.state.queryResults) return null;

        let rating
        let stars = [];
        if(!rating){
            stars.push(<span className='pack__title'>No rating yet</span>)
        }
        else{
            for(let i = 0; i < rating; i++){
                if(i%2 !== 0) stars.push(<i className="star icon large icon__color" />);
                else if(i%2 === 0 && i === rating-1) stars.push(<i className="star half icon large icon__color" />);
            }
        }

        let playpause;
        if(this.state.isPlaying === true){
            playpause =   (<div>
                <i className="pause circle icon huge icon__color" onClick={this.handlePlayClick}></i>
                <iframe src={this.props.demo_path} allow="autoplay" style={{display: 'none'}} title="iframeAudio"></iframe> 
            </div>);
            console.log('demopath', this.props.demo_path);
        } 
        else{
            playpause=<i className="play circle icon huge icon__color" onClick={this.handlePlayClick}></i>;
        }
        const link = `/pack/${this.props.pack_id}`;

        let heart;
        const { liked } = this.state;
        if(liked) heart = <i className="heart icon liked large" onClick={this.handleLikeClick}></i>;
        else heart = <i className="heart outline icon large" onClick={this.handleLikeClick}></i>;

        return(
           <div className="pack__card">
                <img src={this.props.img} className='pack__image' />
                <div className='overlay'>
                        <div className='background__color'>
                            <h5 className='pack__title'>{this.props.name}</h5>
                            {heart}
                            <h5 className='pack__title'>{this.props.username}</h5>
                            {playpause}
                            {stars}
                            <div className='icon__color'>{this.props.price} coins</div>
                            <a href={link}><h3 className='to__pack'><b>View pack</b></h3></a>
                        </div>
                </div>
           </div> 
        );
    }
}

export default PackCard;