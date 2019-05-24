import React from 'react';
import { Row, Col, Badge, Input } from 'reactstrap';
import Select from 'react-select';

import './SampleUploadCard.scss';
import PlayButton from '../Audio/PlayButton/PlayButton.js'
import Waveform from '../Audio/Waveform/Waveform.js'

class SampleCard extends React.Component{ 
    
    render(){
        const keyOptions = [
            { value:'A', label:'A'},
            { value:'A♯', label:'A♯'},
            { value:'B', label:'B'},
            { value:'C', label:'C'},
            { value:'C♯', label:'C♯'},
            { value:'D', label:'D'},
            { value:'D♯', label:'D♯'},
            { value:'E', label:'E'},
            { value:'F', label:'F'},
            { value:'F♯', label:'F♯'},
            { value:'G', label:'G'},
            { value:'G♯', label:'G♯'},
        ];

        const { index } = this.props;
        const priceName = 'samplePrice' + index;
        const bpmName = 'bpm' + index;

        return(
            <div className='sample__card'>
                <Row className='row'>
                    <Col>
                        <span className='title'>{this.props.title}</span>
                        <span>Tags</span>
                        <Select placeholder='Choose some tags for this sample' 
                            isMulti={true} 
                            options={this.props.options} 
                            onChange={e => this.props.tagsCallback(e, index)}
                        />
                        <span>BPM</span>
                        <Input 
                            placeholder="bpm" 
                            name={bpmName} 
                            min={0} 
                            max={500} 
                            type="number" 
                            step="1" 
                            onChange={e => this.props.callback(e, index)}
                        />
                        <span>Key</span>
                        <Select 
                            placeholder="Choose a key, if the sample has one" 
                            options={keyOptions} 
                            onChange={e => this.props.keyCallback(e, index)}
                        />
                        <span>Price</span>
                        <Input 
                            placeholder="Amount in coins" 
                            name={priceName} 
                            min={0} 
                            type="number" step="1" 
                            onChange={e => this.props.callback(e, index)}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SampleCard;