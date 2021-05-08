import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import './types.scss'
import Axios from "axios";

class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
      name: '',
      description: '',
      types: []
    };
  }
  componentDidMount = () => {
    this.getTypes()
  }
  getTypes = () => {
    axios.get('/api/types')
    .then(res => {
      this.setState({types: res.data})
    })
  }
  addType = () => {
    axios.post('/api/type', { name: this.state.name, description: this.state.description })
      .then(res => {
       this.setState({types: res.data})
      })
  }

  displayAddType = () => {
    return (
      <div>
        <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
        <input value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
        <button onClick={() => this.addType()}>Submit</button>
      </div>
    )
  }
  render() {
    return (
      <div className="Types">
        <h1>Types</h1>
        <button onClick={() => this.setState({ showAdd: !this.state.showAdd })}>{this.state.showAdd ? 'cancel': 'add type'}</button>
        {this.state.showAdd ? this.displayAddType() : ''}
        <div className='types-chart'>
        {this.state.types.map((item, index) => (
          <div className='type-row' key={index}>
            <p>{item.type_id}</p>
            <p>{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { id } = store;
  return { id };
}

export default connect(mapStateToProps)(Types);