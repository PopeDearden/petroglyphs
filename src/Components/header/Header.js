import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Header.scss'
import { updateSymbols} from'./../../ducks/reducer';
// import { updateUser, logout } from './../../ducks/reducer';

// import homeLogo from './../../assets/home_logo.png';
// import newLogo from './../../assets/new_logo.png';
// import logoutLogo from './../../assets/shut_down.png';
// import './SideNav.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    axios.get('/api/symbols')
    .then(res => {
        this.props.updateSymbols(res.data)
    })
  }

  render() {
    
      return (
        <div className='Header'>
            <h1>Technoglyph</h1>
            
        </div>
      )
  }
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(connect(mapStateToProps, { updateSymbols })(Header))