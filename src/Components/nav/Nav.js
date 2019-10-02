import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { updateUser, logout } from './../../ducks/reducer';

// import homeLogo from './../../assets/home_logo.png';
// import newLogo from './../../assets/new_logo.png';
// import logoutLogo from './../../assets/shut_down.png';
import './Nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
      return (
        <div className='Nav'>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Link to='/symbolmenu'>
            <button>Symbol Menu</button>
            </Link>
            <Link to ='/addsymbol' >
            <button>Add Symbol</button>
            </Link>
            <Link to='/charts'>
                <button>Charts</button>
            </Link>
            <Link to='/locations'>
                <button>Locations</button>
            </Link>
            <Link to='/addlocations'>
                <button>Add Locations</button>
            </Link>
            <Link to='/map'>
                <button>Map</button>
            </Link>
            {/* <button>Panel Menu</button>
            <button>Add Panel</button> */}
        </div>
      )
  }
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav))