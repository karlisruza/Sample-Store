import React from 'react';
import { Row } from 'reactstrap';

import PlayButton from '../Audio/PlayButton/PlayButton.js';
import s from './PackCard.scss';


class PackCard extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: false
      }
    }

    handleClick = () =>{
        const { isPlaying } = this.state;
        this.setState({isPlaying: !isPlaying});
    }

    render(){
        if(!this.props.pack_id) return null;
        console.log()

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
        if(this.state.isPlaying === true) playpause =   <i className="pause circle icon huge icon__color" onClick={this.handleClick}></i>;
        else{
            playpause=<i className="play circle icon huge icon__color"></i>;
        }
        const link = `/pack/${this.props.pack_id}`;

        return(
           <div className="pack__card">
                <img src={this.props.img} className='pack__image' />
                <div className='overlay' onClick={this.handleClick}>
                        <div className='background__color'>
                            <h5 className='pack__title'>{this.props.name}</h5>
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