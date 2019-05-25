import React from 'react';
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Card, 
  Button, 
  CardTitle, 
  CardText, 
  Row, 
  Col, 
  Form, 
  FormGroup, 
  Input 
} from 'reactstrap';
import Layout from '../../Components/Layout/Layout.js';
import Container from '../../Components/Layout/Container/Container.js';
import PackCard from '../../Components/PackCard/PackCard.js';
import SampleCard from '../../Components/SampleCard/SampleCard.js';
import Dropzone from 'react-dropzone';

const user_id = "ea7e866f-6005-46a6-9fa1-3a751a3de40c";
const query = `
{
  user(user_id: "${user_id}"){
    username
    name	
    email
    img_path
    coins
  }
	packs(user_id: "${user_id}"){
    pack_id
    user_id{
      name
    }
    name
    price
    community
    demo_path
    img_path
    rating
    description
  }
  packlikes(user_id: "${user_id}"){
    like_id
    pack_id{
      pack_id
      name
      user_id{
        name
      }
      price
      demo_path
      img_path
      rating
      }
    }
  samplelikes(user_id: "${user_id}"){
    sample_id{
      sample_id
      name
      pack_id{
        pack_id
      }
      price
      created_on
      sample_path
      key
      bpm
    }
  }
}`;

class Profile extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          queryResults: {}
        };
      }
    
    componentDidMount = () =>{
      fetch('http://localhost:8080/graphql', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
        }),
      })
      .then( response => response.json() )
      .then( response => this.setState({queryResults: response.data, profilePicture: response.data.user.img_path} ) );
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    handleImgUpload = async(files) =>{
      if(files.length > 1){
        alert('Choose a single image file');
        return;
      }
      const form = new FormData();
      form.append('files', files[0]);
      await fetch('http://localhost:8080/uploadpack', {
        method: "POST",
        body: form,
        form: true
      })
      .then( response => response.json() )
      .then( response => {
        this.setState({profilePicture: response.data['path']})
        console.log('server resp',response);
      });

      const imgMutation = `mutation{
      updateUserImg(user_id: "${user_id}", img_path:"${this.state.profilePicture}"){
          img_path
        }
      }`;
      fetch('http://localhost:8080/graphql', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: imgMutation,
        }),
      })
      .then( response => response.json())
    }

    handleInputChange = (e) =>{
      this.setState({coins: e.target.value});
      console.log(this.state.coins);
    }

    handleCoinForm = async(e) =>{
      e.preventDefault();
      const query = `  {user(user_id: "${user_id}"){
        coins
      }}`;
      let coins;
      await fetch('http://localhost:8080/graphql', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
          }),
        })
      .then( response => response.json())
      .then( response => {
        console.log('resp', response.data.user.coins);
        coins = response.data.user.coins;
      });
      console.log('coin', coins);
      coins += parseInt(this.state.coins);
      console.log('coin', coins);
      const updateCoinsMutation = `mutation{
        updateUserCoins(user_id: "${user_id}", coins: ${coins}){
          coins
        }
      }`;

      await fetch('http://localhost:8080/graphql', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: updateCoinsMutation,
          }),
        })
      .then( response => response.json())
      .then( response => {
        this.setState({coins: coins});
      });
    }

    render(){
      if(!this.state.queryResults.packs) return null;
      
      let packList, packLikesList, sampleLikesList;
      const { packs, packlikes, samplelikes } = this.state.queryResults;

      packList = packs.map(pack =>
        <PackCard
          key={pack.pack_id} 
          pack_id={pack.pack_id} name={pack.name} 
          username={pack.user_id.name} price={pack.price} 
          demo={pack.demo_path} 
          rating={pack.rating} 
          img={pack.img_path}
         />
      );
      packLikesList = packlikes.map(pack =>
        <PackCard key={pack.pack_id.pack_id} 
          pack_id={pack.pack_id.pack_id} 
          name={pack.pack_id.name} 
          username={pack.pack_id.user_id.name} 
          price={pack.pack_id.price} 
          demo={pack.pack_id.demo_path} 
          rating={pack.pack_id.rating} 
          img={pack.pack_id.img_path}
        />
      );
      sampleLikesList = samplelikes.map(sample =>
        <SampleCard 
            key={sample.sample_id.sample_id}
            sample_id={sample.sample_id.sample_id} 
            title={sample.sample_id.name}  
            bpm={sample.sample_id.bpm} 
            rootKey={sample.sample_id.Key} 
            price={sample.sample_id.price} 
            sample_path={sample.sample_id.sample_path}
        />
      );




        return(
            <Layout>
                <Container>
                    <div className='profile__head'>
                    <Dropzone name='image' onDrop={acceptedFiles => this.handleImgUpload(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                <section className='dropzone__img'>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img src={this.state.profilePicture} alt='whoops, something went wrong' />
                                </div>
                                </section>
                            )}
                        </Dropzone>
                        <p className='bio'> this be description </p>
                    </div>
                    <div>
                    <Nav tabs>
                      <NavItem>
                        <NavLink onClick={() => { this.toggle('1'); }}>
                          Packs
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => { this.toggle('2'); }}
                        >
                          Likes
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => { this.toggle('3'); }}
                        >
                          Settings
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => { this.toggle('4'); }}
                        >
                          Payment
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            {packList}
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="6">
                              {packLikesList}
                          </Col>
                          <Col sm="6">
                            <Card body>
                              {sampleLikesList}
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">

                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="4">
                        <Row>
                          <Col sm="12">
                            <Form onSubmit={this.handleCoinForm}>
                              <Input placeholder='Enter number of coins to add to your account' type='number' onChange={this.handleInputChange} />
                              <Button color='primary' type='submit'>Add coins</Button>
                            </Form>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
                </Container>
            </Layout>
        );
    }
}

export default Profile;

