import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import s from '../Layout.scss'

class Header extends Component{
    render(){
        return(
            <Nav className='frame header'>
              <NavLink href="/packs">Sample Packs</NavLink>
            </Nav>
        );
    }
}

export default Header;