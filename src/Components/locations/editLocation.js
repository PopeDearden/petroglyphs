import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import "../editSymbol/EditSymbol.scss"
import swal from 'sweetalert2'

class EditLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            long: '',
            lat: '',
            image: ''

        };

    }
    componentDidMount() {
        this.getPanelInfo()

    }
    getPanelInfo = () => {
        axios.get(`/api/singlelocation/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    name: res.data[0].location_name,
                    long: res.data[0].long,
                    lat: res.data[0].lat,
                    image: res.data[0].location_imgae,
                })
            })

    }

    updateLocation = async () => {
        await axios.put(`/api/location/${this.props.match.params.id}`, this.state)
            .then(res => {
                console.log(res)
                this.getPanelInfo()
            })
        swal.fire('updated symbol')
    }


    render() {
        if (this.props.username === 'taylordearden@gmail.com') {
            return (

                <div className="edit-main">
                    <div className="search-bar">
                        <h1>Edit Location Info</h1>
                    </div>
                    <div className="symbol-info">
                        <img src={this.state.image} alt="" />
                        <div className="info-align">
                            <p>Location Name:</p>
                            <input value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                            <p>Location Image:</p>
                            <input value={this.state.image} onChange={e => this.setState({ image: e.target.value })} />
                            <p>Location lat:</p>
                            <input value={this.state.lat} onChange={e => this.setState({ lat: e.target.value })} />
                            <p>Location long:</p>
                            <input value={this.state.long} onChange={e => this.setState({ long: e.target.value })} />
                            <button onClick={() => this.updateLocation()}>Update Location</button>
                            <p>Enter location id to delete:</p><input onChange={e => this.setState({ delete: e.target.value })} />
                            <button onClick={() => alert('this doesnt work yet')}>Delete Symbol</button>
                        </div>

                    </div>
                </div>


            );
        }
        else {
            swal.fire('Access Denied', '', 'warning')
            return (
                <div className="Denied">
                    Contact Taylor, access denied
        </div>
            )
        }
    }
}

function mapStateToProps(store) {
    const { username } = store;
    return { username };
}

export default connect(mapStateToProps)(EditLocation);