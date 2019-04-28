import React from 'react';

import Layout from '../../Components/Layout/Layout.js'
import Container from '../../Components/Layout/Container/Container.js'
import Searchbar from '../../Components/Searchbar/Searchbar.js';
import PackCardGrid from '../../Components/PackCard/PackCardGrid.js';
import PackCard from '../../Components/PackCard/PackCard.js';

class Packs extends React.Component{
    render(){
        return (
            <Layout>
                <Container>
                    <Searchbar />
                    <PackCardGrid>
                        <PackCard img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Love_Streams_%28Front_Cover%29.png/220px-Love_Streams_%28Front_Cover%29.png' />
                        <PackCard img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Love_Streams_%28Front_Cover%29.png/220px-Love_Streams_%28Front_Cover%29.png' />
                        <PackCard img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Love_Streams_%28Front_Cover%29.png/220px-Love_Streams_%28Front_Cover%29.png' />
                        <PackCard img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Love_Streams_%28Front_Cover%29.png/220px-Love_Streams_%28Front_Cover%29.png' />
                        <PackCard img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Love_Streams_%28Front_Cover%29.png/220px-Love_Streams_%28Front_Cover%29.png' />
                        <PackCard img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Love_Streams_%28Front_Cover%29.png/220px-Love_Streams_%28Front_Cover%29.png' />
                    </PackCardGrid>
                </Container>
            </Layout>
        );
    }
}

export default Packs;