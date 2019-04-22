import React from 'react';
import s from './Container.scss';

class Container extends React.Component{
    render(){
        return(
            <div className="container">{this.props.children}</div>
        );
    }
}

export default Container;