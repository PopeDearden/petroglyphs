import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import swal from 'sweetalert2'
import './Auth.scss';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this);
    // this.register = this.register.bind(this);
  }
  handleChange(prop, val) {
      this.setState({
        [prop]: val
      })
    
  }
  login = async () => {
    const res = await axios.post('/auth/login', this.state)
    console.log(res.data)
    if (res.data.user) {
      this.props.updateUser(res.data.user)
      console.log(res.data.user)
      this.props.check()
    }
    
    swal.fire(res.data.message)

  }
//   register() {
//     axios.post('/auth/register', this.state)
//       .then(res => {
//         this.props.updateUser(res.data);
//         this.props.history.push('/dashboard');
//       })
//   }
  render() {
    // console.log(this.state)
    return (
      <div className='Auth'>
        <div className='auth_container'>
          <h1 className='auth_title'>Technoglyph</h1>
          <div className='auth_input_box'>
          <input
              onChange={e => this.handleChange('email', e.target.value)}
              type="text"
              placeholder="Username"
            />
            <input
              onChange={e => this.handleChange('password', e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button onClick={this.login}>Login</button>
            {/* <button className='dark_button' onClick={this.register}> Register </button> */}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(reduxState) {
  const { user } = reduxState
  return { user }
}

export default connect(mapStateToProps, { updateUser })(Auth);
