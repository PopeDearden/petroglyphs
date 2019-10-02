import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'
import "./EditSymbol.scss"
class EditSymbol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meanings:[],
      image: "",
      edit: false,
      meaning: "",
      language: "",
    };
    this.deleteMeaning = this.deleteMeaning.bind(this)
  }
  componentDidMount(){
   const {id} = this.props.match.params
   axios.get(`/api/meaning/${id}`)
   .then(res => {
       this.setState({
           meanings: res.data
       })
       console.log(res.data)
  })
  axios.get(`/api/symbol/${id}`)
  .then(res => {
      this.setState({
          image: res.data[0].img_draw
      })
  }
    )
}
refresh(){
    const {id} = this.props.match.params
    axios.get(`/api/meaning/${id}`)
    .then(res => {
        this.setState({
            meanings: res.data
        })
        console.log(res.data)
   })
   axios.get(`/api/symbol/${id}`)
   .then(res => {
       this.setState({
           image: res.data[0].img_draw
       })
   }
     )
}
async deleteMeaning(id){
    await axios.delete(`/api/meaning/${id}`)
    .then(res => {
        // console.log(res.data)
        this.refresh() 
    })
}
async addMeaning(id){
    await axios.post(`/api/meaning/${id}`, this.state)
    .then( res=> {
        console.log(res)
        this.setState({
        meaning: '',
        language:'',
        })
        this.refresh()
    })
        
}


  render() {
    return (
      <div className="edit-meaning">
          <img src={this.state.image} srcset=""/>
         {this.state.meanings.map(meanings => (
                        <div key={meanings.meaning_text}>
                            <h4>{meanings.language}</h4>
                            <p> {meanings.meaning_text}</p>
                            <button onClick={()=>this.deleteMeaning(meanings.meaning_id)}>Delete</button>
                        </div>
                    ))}
    <div>
        <h3>Add another meaning</h3>
        <div className='form_input_box'>
                    <p>Language:</p>
                    <input value={this.state.language} onChange={e => this.setState({ language: e.target.value })} />
                </div>
                <div className='form_input_box'>
                    <p>Meaning:</p>
                    <input value={this.state.meaning} onChange={e => this.setState({meaning: e.target.value })} />
                </div>
        <button onClick={()=>this.addMeaning(this.props.match.params.id)}>submit</button>
    </div>
      </div>

    );
  }
}

function mapStateToProps(store) {
  const { id } = store;
  return { id };
}

export default connect(mapStateToProps)(EditSymbol);