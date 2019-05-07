import React from 'react';
import { Row, Col, Badge } from 'reactstrap';

import './SampleCard.scss';
import PlayButton from '../Audio/PlayButton/PlayButton.js'
import Waveform from '../Audio/Waveform/Waveform.js'

class SampleCard extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {liked: false};
    }

    handleLikeClick = () => {
        this.setState({liked: !this.state.liked});
    }
    handleDownload = () => {
        console.log("download");
    }

    render(){
        const { title, tags, bpm, rootKey } = this.props;
        const { liked } = this.state;
        
        const tagz = Object.values(tags);
        let badges = tagz.map(tag =>
           <h5 className='sample__tag'><Badge color="secondary">{tag}</Badge></h5>
        );
        
        let heart;
        if(liked) heart = <i className="heart icon liked" onClick={this.handleLikeClick}></i>;
        else heart = <i className="heart outline icon" onClick={this.handleLikeClick}></i>;

        return(
            <div className='sample__card'>
                <Row className='row'>
                    <PlayButton />
                    <Waveform />
                    <Col>
                        <span className='title'>{title}</span>
                        <br />
                        <div className='sample__tags'>
                            {badges}
                        </div>
                        <span className='bpm'>{bpm}</span>
                        <span className='rootKey'>{rootKey}</span>
                        {heart}
                        <i className="download icon downloadBtn" onClick={this.handleDownload}></i>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SampleCard;