import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './Map.scss'

import axios from "axios";
import {Link} from 'react-router-dom'

class MapGlyphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.getLocations = this.getLocations.bind(this)
  }
  componentDidMount(){
    this.getLocations()
  }
getLocations(){
axios.get('/api/locations')
.then(res => {
  this.setState({
    locations: res.data
  })
})
}
  render() {
    const mapStyles = {
      width: '80%',
      height: '80%',
    };
    console.log(this.state.locations)
    return (
      <div className="Map-Frame">
        <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{lat: 38.845, lng:-110.29}}
        >
        {this.state.locations.map(location => (
        <Marker position={{ lat: location.lat, lng: location.long}} title={location.location_name} />
        ))}
                        
                        
        
        </Map>
      

      </div>
    );
  }
}


export default GoogleApiWrapper({apiKey: "AIzaSyDGkVCA_X2gjtdfEMmyiC-WdXRwvdDmIm8"})(MapGlyphs);