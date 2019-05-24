import React from 'react';

import Layout from '../../Components/Layout/Layout.js'
import Container from '../../Components/Layout/Container/Container.js'
import Searchbar from '../../Components/Searchbar/Searchbar.js';
import PackCardGrid from '../../Components/PackCard/PackCardGrid.js';
import PackCard from '../../Components/PackCard/PackCard.js';
const fetch = require('isomorphic-fetch');

const packsQuery = `{
    packs{
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
    tags{
        name
    }
  }`

class Packs extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLoading: true};
    }

    componentDidMount = () =>{
        fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: packsQuery,
            }),
          })
          .then( response => response.json() )
          .then( response => this.setState({queryResults: response.data} ) );
    }

    render(){
        let packs, tags;
        if(this.state.queryResults){
            packs = this.state.queryResults.packs;
            tags = this.state.queryResults.tags
        }

        let packList;
        let content;

        console.log(packs);
        console.log(tags);
        console.log(this.state);

        if(packs && tags){
            packList = packs.map(pack =>
                <PackCard key={pack.pack_id} pack_id={pack.pack_id} name={pack.name} username={pack.user_id.name} price={pack.price} demo={pack.demo_path} rating={pack.rating} img={pack.img_path}/>
            );
            content = (
            <div>
                <Searchbar tags={tags} />
                <PackCardGrid>
                    {packList}
                </PackCardGrid>
            </div>
            );
        }
        else{
            content = <div className="ui active centered inline loader"></div>;
        }

        return (
            <Layout>
                <Container>
                    {content}
                </Container>
            </Layout>
        );
    }
}

export default Packs;