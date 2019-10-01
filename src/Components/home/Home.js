import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'
import './home.scss'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      symbols: []
    };
  }


  render() {
    return (
      <div className="Home">
        <p>Home</p>
        <img src="https://lh3.googleusercontent.com/V_jLPozY55H4-fbEjVncNouEBU8C1QBK6L6Qd33_6RRfE1RPQSvtjAo-mOs9WMVXpYZWD5IoirSYQGGRgLmV3JSqYPbj2dPMjSM8NRq3w-XlJkSLu9TOx_LScYcOt7EB__l_vELu9DSICTUMwVYCZ7J4TRh-xRlV_1YRk9KF5GPJLIa7a6J9Qp5vNoWPJCebZe5WWVUNKTI0fpac080mlPXTZYQ7brQYb8UtDHERqjn_gaa1X7UGZECFUfE-iu2I-MWMvqR-E3OcbP17pYmGlWQstpr9_zLokA17og9A0mbtpA7QvEtLXRxzdPCWmLI-CNXiq5HDWUAd-Ki3s0VodFnCU1hACebcXzp9TMsQkt6m1O8lfNVuq8g-aJ1Z3Mw0Cv-iBkdjnw4Mkfl2ArcG3aoH9IwrUkd31KIbBaQfgFauCsaYAdmN2QDgUk3y66WMHN3vfmfmho8yLVQCEoOGk0Er06a5FHQMoo3OVt1Mc5R-c9epo2S_PI-VRyFcJ1M_Fc79enI8Cai35SP6FccQxuoKmwq2HsJNOiwSIrBDFIYvwnamtCwu2Pe-8mWOEoLy97y5GLtosDXpN5NDWkrQSyZ06_0g60RDSMrYGrHaiQu1bZB_1-wnLhDYjwpm5gBMuMnhni2L5hh6ab17BbqAHloIpLi-J-nEjZnha55c1hBoRi5UGq8HRV0=s903-no" alt="" srcset=""/>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { id } = store;
  return { id };
}

export default connect(mapStateToProps)(Home);