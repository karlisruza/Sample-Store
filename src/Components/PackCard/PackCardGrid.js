import React from 'react';
import s from './PackCard.scss';

class PackCardGrid extends React.Component{
    render(){
        return(
            <div className="pack__grid">
                {this.props.children}
            </div>
        );
    }
}

export default PackCardGrid;