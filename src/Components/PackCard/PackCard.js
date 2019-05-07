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
        const { img } = this.props;
        
        const rating = 7;
        let stars = [];
        for(let i = 0; i < rating; i++){
            if(i%2 !== 0) stars.push(<i className="star icon large icon__color" />);
            else if(i%2 === 0 && i === rating-1) stars.push(<i className="star half icon large icon__color" />);
        }
        const price = <div className='icon__color'>9.99$</div>
        let playpause;
        if(this.state.isPlaying === true) playpause =   <i className="pause circle icon huge icon__color" onClick={this.handleClick}></i>;
        else{
            playpause=<i className="play circle icon huge icon__color"></i>;
        }

        return(
           <div className="pack__card">
                <img src={img} className='pack__image' />
                <div className='overlay' onClick={this.handleClick}>
                        <div className='background__color'>
                            <h5 className='pack__title'>Title of the pack</h5>
                            <h5 className='pack__title'>by username</h5>
                            {playpause}
                            {stars}
                            {price}
                            <a href='/pack'><h3 className='to__pack'><b>View pack</b></h3></a>
                        </div>
                </div>
           </div> 
        );
    }
}

export default PackCard;