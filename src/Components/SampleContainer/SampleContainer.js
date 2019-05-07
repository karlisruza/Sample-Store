import React from 'react';

import './SampleContainer.scss'
import { Row } from 'reactstrap';

class SampleContainer extends React.Component{    
    render(){
        return(
            <div className='sample__container'>
                <div className='container__head'>
                    <h4 className='head__title'>Title</h4>    
                    <h4 className='head__bpm'>BPM</h4>   
                    <h4 className='head__key'>Key</h4>   
                </div>
                <br />
                {this.props.children}
            </div>
        );
    }
}

export default SampleContainer;

