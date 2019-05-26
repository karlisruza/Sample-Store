import React from "react";
import StarRatings from 'react-star-ratings';

class Rating extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = ({rating: 0});
    }

    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
    }

    render() {
        return (
          <StarRatings
            changeRating={this.changeRating}
            starDimension="40px"
            starSpacing="15px"
          />
        );
      }
}

export default Rating;
