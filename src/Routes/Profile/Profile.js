import React from 'react';

import Layout from '../../Components/Layout/Layout.js';
import Container from '../../Components/Layout/Container/Container.js';

class Profile extends React.Component{
    render(){
        return(
            <Layout>
                <Container>
                    <div className='profile__head'>
                        <img src='/' alt='profile pic' />
                        <p className='bio'> this be description </p>
                    </div>
                    {/* <Tabs>
                        <Tab title='Packs'>
                            <div>packs</div>
                        </Tab>
                        <Tab title='Likes'>
                            <div>Likes</div>
                        </Tab>
                        <Tab title='Settings'>
                            <div>Settings</div>
                        </Tab>
                    </Tabs> */}
                </Container>
            </Layout>
        );
    }
}

export default Profile;

