import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Header.scss'
import { updateSymbols} from'./../../ducks/reducer';
import { thisExpression, thisTypeAnnotation } from '@babel/types';
// import { updateUser, logout } from './../../ducks/reducer';

// import homeLogo from './../../assets/home_logo.png';
// import newLogo from './../../assets/new_logo.png';
// import logoutLogo from './../../assets/shut_down.png';
// import './SideNav.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }
  componentDidMount(){
    axios.get('/api/symbols')
    .then(res => {
        this.props.updateSymbols(res.data)
    })
    axios.get('/auth/me')
    .then(res => {
      this.setState({
        user: res.data
      })
      console.log(res.data)
    })
  }

  render() {
      return (
        <div className='Header'>
          <div className="logo">
            <h2>Technoglyph</h2>
            {/* <p>Welcome, {this.state.user.name}!</p> */}
          </div>
        </div>
      )
  }
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(connect(mapStateToProps, { updateSymbols })(Header))