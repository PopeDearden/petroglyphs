import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './MapStyle.scss'

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
      margin: '0',
     
    };
    const mapStyles2 = {
      width: '100vw',
      height: '50vh',
      
  };
    console.log(this.state.locations)
    return (
      <div className="map-main">
        <div className="search-bar">
          <h1>
          Map of all locations
          </h1>
        </div>
      
      <div className="Map-Frame">
        <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{lat: 38.845, lng:-110.29}}
        >
        {this.state.locations.map(location => (
        <Marker onClick={()=>this.props.history.push(`/location/${location.location_id}`)} position={{ lat: location.lat, lng: location.long}} title={location.location_name} />
        ))}                
        
        </Map>
      </div>
      <div className="Map-Frame2">
        <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles2}
        initialCenter={{lat: 38.845, lng:-110.29}}
        >
        {this.state.locations.map(location => (
        <Marker onClick={()=>this.props.history.push(`/location/${location.location_id}`)} position={{ lat: location.lat, lng: location.long}} title={location.location_name} />
        ))}                
        
        </Map>
      </div>
    
      </div>
    );
  }
}


export default GoogleApiWrapper({apiKey: "AIzaSyDGkVCA_X2gjtdfEMmyiC-WdXRwvdDmIm8"})(MapGlyphs);