import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'

class EditSymbol extends Component {
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
        <p>Edit Symbol</p>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { id } = store;
  return { id };
}

export default connect(mapStateToProps)(EditSymbol);