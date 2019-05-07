import React from 'react';

import Sequencer from '../../Components/Sequencer/Sequencer.js';
import Layout from '../../Components/Layout/Layout.js'
import s from './CreatePack.scss';

class CreatePack extends React.Component{
    render(){
        return(
        <Layout>
            <Sequencer />
        </Layout>

        );
    }
}

export default CreatePack;