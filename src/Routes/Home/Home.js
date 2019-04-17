import React from 'react';
import Login from '../../Components/Login/Login.js';
import Layout from '../../Components/Layout/Layout.js'


class Home extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Login />
        </Layout>
      </div>
    );
  }
}

export default Home;
