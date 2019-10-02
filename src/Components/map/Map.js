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
      searchInput: "",
      symbols: []
    };
  }


  render() {
    const mapStyles = {
      width: '80%',
      height: '80%',
    };
    return (
      <div className="Map-Frame">
        <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{lat: 38.845, lng:-110.29}}
        >
        <Marker position={{ lat: 48.00, lng: -122.00}} />
        
        </Map>
      

      </div>
    );
  }
}


export default GoogleApiWrapper({apiKey: "AIzaSyDGkVCA_X2gjtdfEMmyiC-WdXRwvdDmIm8"})(MapGlyphs);