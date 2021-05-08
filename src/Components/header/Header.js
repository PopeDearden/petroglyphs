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

    })
  }

  render() {
      return (
        <div className='Header'>
          {/* <h4>TECHN</h4> */}
            {/* <img src="https://lh3.googleusercontent.com/HJ6480KBJAA7Aopu5dWJF6LOl4GFe1a4727hCzfnT90JoQpblrhsgOrv5vbzDmzG87Ht05b6_o1WdisiRog_3pvv49jo8Oxf0_OgmGIFl2er0FsJkYWnEoqq1TF6yL0Tsqo66Dioj-nLWUm9tuQKG2V_q4ptmsqfN9vvn4LActd9OM0Pg02U-RxBFIdxLjGpLA1FUFCn2CzHgOlxDFOFTfop7Herb37SI-X_bWjNlJ3930JZUkuShrOu-W30wCCNGT72i25JMzWm4pHZX-NMNXWw4FLM6-5VcJr-Lr71lFM24okvMo-MazGPP1C5lQsvRxqL9F-p2eD9zT-Zv_I_DU-riknEAGiB7Wo3-1yGXgzYcLaEYZqzUhm3KKl1CoNKbwztEIYvz--eS77bnAP8HMh89a4WYkWb4PNwhtlv_0odI3NPIDil4fiEnGYjJa_4wOboXgCnq92mXm_kaOTpvtE6w3QiY6_-I8yb5eMf8FhThfNFIRsR2ZTDyN_dE87XqimnunFBOJH4XZCji_XJ85ESFMEOA1KnB2x1c9tnDumm8ogaz3G8NM9YU6pKjgxolR-XYHZmjE8VzB8b9eTeNHmW666R4dPqI3xZaxWIRsROEo8xeL5NQNCWYabpvM5hT2zP_unRsHZPFUneUy25U9uMBbeYKwv9wwHBpoRKPdMI5p9PsSN_ITsrWlto_vSjI4s1Je1J22oZShiM3Of1-WJ1Nio5Np9adN0rMbk33Hm0afrp=s357-no" alt="" srcset=""/> */}
            <img src="https://lh3.googleusercontent.com/Xjeem3clgNc3uYr-sqbXZDP5TYKEsYElrTKnvmi6jrqv6AcobJbWmkHyrQOWeipHQFcjUNG0gNaz5s9-bD4Ee2cfIcCIj4ft4A7w99T3UudeDdVskRloEkeHZxrBEpYtv7cJvfe_7hicAd8TLfYjd58O-h631_uO02ntfP49GzobFWtLFyJMY0wXmJt6gOt-8hZV_f7Ki-j5Szt-sGDoYts5BgUc_N5JnNEWP6XbW88mf6kdPyslGLeitFb5aO462TVuQahHnVtbcCzlZ9F2j6uoSvZXVfmsKDL1fSgyI5G9DDvQrWzXZ5LAeWJnxkR-1MFGnIqPSI2Q3TwU3Z2Wyn-zt6YauxBl88Bpq0dsApHJU1kWWggiswpM1ef_kOqNZP3-RpUb7cINrX39qtLgTWSm8tTHziFHosYgCRhfWL7kKokiV5ght8JrUaIWT-f7Ho7Acg9ATQ7eko3-aKkuc9lpDNSDYugRLjl0r_E0C-KzumwuJETpygvvZqTO_EDPWS-K_TxHd0-CBpsgE7HiQ8J6wThgGaekliYbhi7qDT4Gvo71KHsqZW55wsRhh9TwmEN6Wm8eZCvEa42bguzKPpyhxieSdMwC3X0D2lyb7mh7TFDMzByc5TclkKAeA5a2pMFVwgeRJjm9nfyeDmPPDJWx3GiH8JzWXknCVu8Bp33zoMvilu402Fc6UkKs7E8MLwwSfDBi0CTz64DuYP_ZN8L2tULWBoVF343D1ExhCdzT44pf=s357-no" alt="" srcset=""/>
          {/* <h4>GLYPH</h4> */}
        </div>

      )
  }
}
function mapStateToProps(state) {
  return state;
}
export default withRouter(connect(mapStateToProps, { updateSymbols })(Header))