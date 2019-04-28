import React from 'react';
import s from './PlayButton.scss';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    }
  }

  handleClick = () => {
    const { isPlaying } = this.state;
    this.setState({isPlaying: !isPlaying});
  }

    render() {
      let playpause;
      if(this.state.isPlaying === true) playpause =   <i className="pause circle icon huge" onClick={this.handleClick}></i>;
      else{
          playpause=<i className="play circle icon huge" onClick={this.handleClick}></i>;
      }
      
      return(
        <div>
          {playpause}
        </div>
      )
    }
  }

  export default PlayButton;
