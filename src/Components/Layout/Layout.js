import React, {Component} from 'react';
import s from './Layout.scss'
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js'

class Layout extends Component{
    render(){
        return(
            <div className='frame'>
                <Header />
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Layout;