import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import Layout from '../../Components/Layout/Layout.js';
import Container from '../../Components/Layout/Container/Container.js';


class Profile extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1'
        };
      }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    render(){
        return(
            <Layout>
                <Container>
                    <div className='profile__head'>
                        <img src='/' alt='profile pic' />
                        <p className='bio'> this be description </p>
                    </div>
                    <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => { this.toggle('1'); }}
            >
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
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
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

