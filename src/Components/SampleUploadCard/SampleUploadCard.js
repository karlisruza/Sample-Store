import React from 'react';
import { Row, Col, Badge } from 'reactstrap';

import './SampleUploadCard.scss';
import PlayButton from '../Audio/PlayButton/PlayButton.js'
import Waveform from '../Audio/Waveform/Waveform.js'

class SampleCard extends React.Component{ 
    render(){
        return(
            <div className='sample__card'>
                <Row className='row'>
                    <Col>
                        <span className='title'>{this.props.title}</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SampleCard;