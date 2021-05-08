import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import './Locations.scss'

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.getLocations = this.getLocations.bind(this)
  }
  componentDidMount() {
    this.getLocations()
  }
  getLocations() {
    axios.get('/api/locations')
      .then(res => {
        this.setState({
          locations: res.data
        })
      })
  }
  editPanel = (id) => {
    this.props.history.push(`/panelBuilder/${id}`)
  }
  editSymbol=(id)=> {
    this.props.history.push(`/editSymbol/${id}`)
  }


  render() {

    return (
      <div className="Locations">
        <div className="search-bar">
          <h1>Locations</h1>
        </div>
        <div className="location-icons">
        {this.state.locations.map(location => (
          <div className="Single-Locations">
            <img onClick={() => this.props.history.push(`/location/${location.location_id}`)} src={location.location_imgae} alt="hmm" srcset="" />
            <div>

            </div>
            <h1>{location.location_name}</h1>

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

export default connect(mapStateToProps)(Locations);