import React from 'react';
import { Row, Button } from 'reactstrap';

import './Pack.scss';
import Layout from '../../Components/Layout/Layout.js';
import SampleContainer from '../../Components/SampleContainer/SampleContainer.js';
import SampleCard from '../../Components/SampleCard/SampleCard.js';
import PackCard from '../../Components/PackCard/PackCard.js';
import Comment from '../../Components/Comment/Comment.js';
import CreateComment from '../../Components/CreateComment/CreateComment.js'


class Pack extends React.Component{
    render(){
        const mockDataTags = {
            tag1: "Techno",
            tag2: "House",
            tag3: "DnB",
            tag4: "Vocal",
            tag5: "Loops",
            tag6: "One-shots"
        };

        return(
            <Layout>
                 <Row className='sidebar'>
                    <PackCard img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Love_Streams_%28Front_Cover%29.png/220px-Love_Streams_%28Front_Cover%29.png' />
                    <br />
                    <Button color='primary' className='Btn'>Download</Button>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <CreateComment className='comment__form' />
                </Row>
                <SampleContainer className='sample__container'>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <SampleCard title='kick.wav' tags={mockDataTags} bpm='-' rootKey='F'/>
                    <h3>Comments</h3>
                    <Row>
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </Row>
                </SampleContainer>
                
                <br />

            </Layout>
        );
    }
}

export default Pack;

