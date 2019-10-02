import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      symbols: []
    };
  }


  render() {
    return (
      <div>
        <p>Locations</p>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { id } = store;
  return { id };
}

export default connect(mapStateToProps)(Locations);