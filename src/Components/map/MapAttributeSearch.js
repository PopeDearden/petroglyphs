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
            searchInput: '',
            lat: 38.845,
            lng: -110.29,
            zoom: 4.5,
        };
        this.getLocations = this.getLocations.bind(this)
    }
    componentDidMount() {
        this.getLocations()
    }
    getLocations() {
        axios.get('/api/attributes')
            .then(res => {
                this.setState({
                    locations: res.data,
                })
                console.log(res.data)
            }
            )
    }
    render() {
        const mapStyles = {
            width: '42vw',
            height: '85vh',
            
        };
        const markerStyles = {
            background: 'white',
        }
        let symbolDisplay = this.state.locations.filter((element)=>{
            return element.attributes.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })
        return (
            <div className="map-main">
                <div className="search-bar">
                    <h1>
                        Search locations by symbols:
                        <input placeholder="Search by attribute..." onChange={e=> this.setState({searchInput: e.target.value})}/>
                    </h1>
                </div>
                <div className="map-layout">
                    <div className="Attribute-Results">
                     
                      
                        {symbolDisplay.map(location => (
                            <div onClick={()=>this.setState({zoom: 8, lat: location.lat, lng: location.long})} className="Attribute-Info">
                            <img src={location.img_draw} alt=""/>
                            <p>{location.location_name}</p>    
                            
                            </div>
                            
                        ))}
                    </div>
                    <div className="Map-Frame">
                        <Map
                            google={this.props.google}
                            zoom={this.state.zoom}
                            style={mapStyles}
                            // style={{ width: '40vw', height: '90vh' }}
                            initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
                            center={{ lat: this.state.lat, lng: this.state.lng }}
                        >
                            {symbolDisplay.map(location => (
                                <Marker style={markerStyles} onClick={()=>this.props.history.push(`/location/${location.location_id}`)} position={{ lat: location.lat, lng: location.long }} title={location.location_name} />
                            ))}
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper({ apiKey: "AIzaSyDGkVCA_X2gjtdfEMmyiC-WdXRwvdDmIm8" })(MapGlyphs);