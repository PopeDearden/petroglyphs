import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import './MapStyle.scss'

import axios from "axios";
import { Link } from 'react-router-dom'

class MapGlyphs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            draw: '',
            length: 0,
        };
        this.getLocations = this.getLocations.bind(this)
    }
    componentDidMount() {
        this.getLocations()
    }
    getLocations() {
        axios.get(`/api/symbol/location/${this.props.match.params.id}`)
            .then(res => {
                const length = res.data.length
                this.setState({
                    locations: res.data,
                    length: length,
                })
                if(res.data[0]){
                    this.setState({
                        draw: res.data[0].img_draw,
                    })
                }
            })
    }
    render() {
        const mapStyles = {
            width: '45vw',
            height: '90vh',
            border: 'solid',
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
                <div className="map-layout">
                    <div className="search-results">
                        <img src={this.state.draw} alt=""/>
                        <h2>Locations:</h2>
                        <p>{this.state.length} instances for this symbol.</p>
                        {this.state.locations.map(location => (
                            <div>
                                <h3 onClick={()=>this.props.history.push(`/location/${location.location_id}`)}>{location.location_name}</h3>
                            <p>row: {location.row} Column: {location.pillar}</p>
                            </div>
                            
                        ))}
                    </div>
                    <div className="Map-Frame">
                        <Map
                            google={this.props.google}
                            zoom={4.5}
                            style={mapStyles}
                            // style={{ width: '40vw', height: '90vh' }}
                            initialCenter={{ lat: 38.845, lng: -110.29 }}
                        >
                            {this.state.locations.map(location => (
                                <Marker onClick={()=>this.props.history.push(`/location/${location.location_id}`)} position={{ lat: location.lat, lng: location.long }} title={location.location_name} />
                            ))}
                        </Map>
                    </div>
                    <div className="Map-Frame2">
                        <Map
                            google={this.props.google}
                            zoom={4.5}
                            style={mapStyles2}
                            // style={{ width: '40vw', height: '90vh' }}
                            initialCenter={{ lat: 38.845, lng: -110.29 }}
                        >
                            {this.state.locations.map(location => (
                                <Marker onClick={()=>this.props.history.push(`/location/${location.location_id}`)} position={{ lat: location.lat, lng: location.long }} title={location.location_name} />
                            ))}
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper({ apiKey: "AIzaSyDGkVCA_X2gjtdfEMmyiC-WdXRwvdDmIm8" })(MapGlyphs);