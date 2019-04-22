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
                        <PackCard />
                        <PackCard />
                        <PackCard />
                        <PackCard />
                        <PackCard />
                        <PackCard />
                    </PackCardGrid>
                </Container>
            </Layout>
        );
    }
}

export default Packs;