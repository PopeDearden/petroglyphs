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
    if (res.data.user) {
      this.props.updateUser(res.data.user)
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
    return (
      <div className='Auth'>
        <div className='auth_container'>
          <ul class="slideshow">
            <li><span>Image 01</span><div></div></li>
            <li><span>Image 02</span></li>
            <li><span>Image 03</span></li>
            <li><span>Image 04</span></li>
            <li><span>Image 05</span></li>
            <li><span>Image 06</span></li>
          </ul>
          <div className="container">
            <header>
              <div className="auth_box">
              <div className="Header1">
              <h1>TECHN</h1>
            {/* <img src="https://lh3.googleusercontent.com/HJ6480KBJAA7Aopu5dWJF6LOl4GFe1a4727hCzfnT90JoQpblrhsgOrv5vbzDmzG87Ht05b6_o1WdisiRog_3pvv49jo8Oxf0_OgmGIFl2er0FsJkYWnEoqq1TF6yL0Tsqo66Dioj-nLWUm9tuQKG2V_q4ptmsqfN9vvn4LActd9OM0Pg02U-RxBFIdxLjGpLA1FUFCn2CzHgOlxDFOFTfop7Herb37SI-X_bWjNlJ3930JZUkuShrOu-W30wCCNGT72i25JMzWm4pHZX-NMNXWw4FLM6-5VcJr-Lr71lFM24okvMo-MazGPP1C5lQsvRxqL9F-p2eD9zT-Zv_I_DU-riknEAGiB7Wo3-1yGXgzYcLaEYZqzUhm3KKl1CoNKbwztEIYvz--eS77bnAP8HMh89a4WYkWb4PNwhtlv_0odI3NPIDil4fiEnGYjJa_4wOboXgCnq92mXm_kaOTpvtE6w3QiY6_-I8yb5eMf8FhThfNFIRsR2ZTDyN_dE87XqimnunFBOJH4XZCji_XJ85ESFMEOA1KnB2x1c9tnDumm8ogaz3G8NM9YU6pKjgxolR-XYHZmjE8VzB8b9eTeNHmW666R4dPqI3xZaxWIRsROEo8xeL5NQNCWYabpvM5hT2zP_unRsHZPFUneUy25U9uMBbeYKwv9wwHBpoRKPdMI5p9PsSN_ITsrWlto_vSjI4s1Je1J22oZShiM3Of1-WJ1Nio5Np9adN0rMbk33Hm0afrp=s357-no" alt="" srcset=""/> */}
            <img src="https://lh3.googleusercontent.com/Xjeem3clgNc3uYr-sqbXZDP5TYKEsYElrTKnvmi6jrqv6AcobJbWmkHyrQOWeipHQFcjUNG0gNaz5s9-bD4Ee2cfIcCIj4ft4A7w99T3UudeDdVskRloEkeHZxrBEpYtv7cJvfe_7hicAd8TLfYjd58O-h631_uO02ntfP49GzobFWtLFyJMY0wXmJt6gOt-8hZV_f7Ki-j5Szt-sGDoYts5BgUc_N5JnNEWP6XbW88mf6kdPyslGLeitFb5aO462TVuQahHnVtbcCzlZ9F2j6uoSvZXVfmsKDL1fSgyI5G9DDvQrWzXZ5LAeWJnxkR-1MFGnIqPSI2Q3TwU3Z2Wyn-zt6YauxBl88Bpq0dsApHJU1kWWggiswpM1ef_kOqNZP3-RpUb7cINrX39qtLgTWSm8tTHziFHosYgCRhfWL7kKokiV5ght8JrUaIWT-f7Ho7Acg9ATQ7eko3-aKkuc9lpDNSDYugRLjl0r_E0C-KzumwuJETpygvvZqTO_EDPWS-K_TxHd0-CBpsgE7HiQ8J6wThgGaekliYbhi7qDT4Gvo71KHsqZW55wsRhh9TwmEN6Wm8eZCvEa42bguzKPpyhxieSdMwC3X0D2lyb7mh7TFDMzByc5TclkKAeA5a2pMFVwgeRJjm9nfyeDmPPDJWx3GiH8JzWXknCVu8Bp33zoMvilu402Fc6UkKs7E8MLwwSfDBi0CTz64DuYP_ZN8L2tULWBoVF343D1ExhCdzT44pf=s357-no" alt="" srcset=""/>
            {/* <img src="https://lh3.googleusercontent.com/OQ45-eji5qgdanQGkb5eO_Flj5UZR5cZhp0XUoENL4zLyc7G0NsRJdvlcsp7n3aBYIiargjmfnHS8AYK2-rakb6iFKmvO3PjqQ7vJt-GnlbA6Rraq_WpKkUONoKnKCBKBGIEABHRmybY4rlBFVp85rNJQGgfg-78sv3Pq6d2H_X04Q2rMv8DgxJtXnF8iuq8tMkjiTi9QzRll3rwHcpZUsacb2pyKWpHsoTVWpPOiJYK-qWoof2BdrYbQeUcjXf2YYpgYChwYiFEmpljy4pXLgN8qzBolDjWCKYR5F0mHwXek-ahDpYUTp43rVJ6-rFqAQskv5Ms-fqgkle79AvSzrH4TElMnIuuwN5dZi7NfQfHnaM11-SQ9uKX5oXIOoSzXkFdqNT94yGKXiDx0cJdPhcKbyjd49j14lfocbHuMkGB5pXc51D1G2Mhq2gRvnjTzy8bPtR0D_xhWy_J4eocLud8df-wI83_1TcYJ5eXDDRL63NBRr8_vY_QVvswO8rnr8TtGOMZbV_hmD3eJ5p01FAGJn46zGbmt3u23oxdLKT0N_dkrCz_rOvfc4B45mYGSzsabCPMbFvX5a74WqBqQogwaRKznSlmfLCvw7MvbHkXQ2Z_Ep_gTcIYzoZPzMK6cS_l_PluacuQgn-R2nHV2xEFhFbUyuycWTEA8vqFbykR2vigOidxFBCU1g0s9jbACF9t-fRxc6loTG67F8CGiV9Igh077lNdshnwlAPcbGf3TuvL=s937-no" alt="" srcset=""/> */}
          <h1>GLYPH</h1>
              </div>
              <h3>A petroglyph analysis database</h3>
              <div className='auth_input_box'>
                <input
                  onChange={e => this.handleChange('email', e.target.value)}
                  value = {this.state.email}
                  type="text"
                  placeholder="Username"
                />
                <input
                  onChange={e => this.handleChange('password', e.target.value)}
                  value ={this.state.password}
                  type="password"
                  placeholder="Password"
                />
                <button onClick={this.login}>Login</button>
                {/* <button onClick={()=>this.setState({email: 'guest_user', password: '23Rock23'})}>I'm a guest</button> */}
                {/* <button className='dark_button' onClick={this.register}> Register </button> */}
              </div>
              </div>

            </header>
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
