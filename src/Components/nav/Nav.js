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
logout=()=>{
  axios.delete('/auth/logout')
  .then(
    window.location.reload()
  )
}
  render() {
    
      return (
        <div className='Nav'>
            <div className="line1"></div>
            <Link to="/">
                <button>Home</button>
            </Link>
            <div className="line"></div>
            <Link to='/symbolmenu'>
            <button>Library</button>
            </Link>
            <Link to='/charts'>
                <button>Charts</button>
            </Link>
            <Link to='/locations'>
                <button>Locations</button>
            </Link>
            <Link to='/map'>
                <button>Map</button>
            </Link>
            <Link to='/attribute'>
                <button>Attribute Search</button>
            </Link>
            <div className="line"></div>
            <Link to='/addlocations'>
                <button>Add Locations</button>
            </Link>
            <Link to ='/addsymbol' >
            <button>Add Symbol</button>
            </Link>
                <div className="line"></div>
                <button onClick={()=>this.logout()}>Logout</button>
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