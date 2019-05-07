import React from 'react';

import './Comment.scss';

class Comment extends React.Component{
    render(){
        const mockData = {
            title: "comment title",
            body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            user: "karlisruza",
            createdAt: "27.01.1997, 16:00",
            edited: true,
            img: '/path',
            rating: 'rating'
        };

        return(
            <div className='comment'>
                <div className='left__side'>
                    <img src={mockData.img} alt="Picture goes here" />
                    <span>By {mockData.user}</span>
                    <br />
                    <span className='created__at'>Created at {mockData.createdAt}</span>
                </div>
                <div className='comment__content'>
                    <h5 className='title'>{mockData.title}</h5>
                    <span className='rating'>{mockData.rating}</span>
                    <br />
                    <br />
                    <p className='body'>{mockData.body}</p>
                </div>
            </div>
        );
    }
}

export default Comment;