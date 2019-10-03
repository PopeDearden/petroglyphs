import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'
import './Locations.scss'

class Locations extends Component {
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
editPanel=(id)=>{
  this.props.history.push(`/panelBuilder/${id}`)
}


  render() {
      console.log(this.state.locations)
    return (
      <div className="Locations">
     {this.state.locations.map(location => (
         <div className="Single-Locations">
             <img src={location.location_imgae} alt="hmm" srcset=""/>
             <div>
               <button onClick={()=>this.editPanel(location.location_id)}>Edit</button>
             </div>
             <h1>{location.location_name}</h1>

         </div>
     ))}
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { id } = store;
  return { id };
}

export default connect(mapStateToProps)(Locations);