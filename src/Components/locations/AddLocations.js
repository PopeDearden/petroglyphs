import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'
import "./Location.scss"

class AddLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      longitude: '',
      latitude: '',
      image:'',
      auth: false
    };
  }
  componentDidMount () {
    axios.get('/auth/check')
    .then(res => {
        this.setState({auth: res.data.isAdmin})
    })
  }
submit(){
  axios.post('/api/location/', this.state)
  .then(res=>{
    this.props.history.push('/location')
  })
}

  render() {
    if(this.state.auth){
      return (
        <div className="add-symbol">
          <div className="search-bar">
           <h1>Add new location</h1>
          </div>
          <div className= "new-symbol">
                  <img className="panel-image" src={this.state.image} alt=""/>
                  <div className="form_input_box">
                      <p>Location Name:</p>
                      <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                  </div>
                  <div className='form_input_box'>
                      <p>Latitude:</p>
                      <input value={this.state.latitude} onChange={e => this.setState({ latitude: e.target.value })} />
                      <p>Longitude:</p>
                      <input value={this.state.longitude} onChange={e => this.setState({ longitude: e.target.value })} />
                  </div>
                  <div className='form_input_box'>
                      <p>Image:</p>
                      <textarea value={this.state.image} onChange={e => this.setState({ image: e.target.value })} />
                  </div>
                  <button onClick={()=>this.submit(this.state)} className='dark_button form_button'>Post</button>
          </div>
        </div>
      );
    }
    else{
      return(
        <div className="Denied">
          Access Denied, Contact Taylor
        </div>
      )
    }
  }
}

function mapStateToProps(store) {
  const { username } = store;
  return { username };
}

export default connect(mapStateToProps)(AddLocations);