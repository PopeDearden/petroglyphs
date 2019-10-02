import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import "./EditSymbol.scss"
class EditSymbol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            meanings: [],
            edit: false,
            meaning: "",
            language: "",
            name: "",
            image: "",
            attributes:"",
            delete: 0,

        };
        this.deleteMeaning = this.deleteMeaning.bind(this)
        this.updateSymbol = this.updateSymbol.bind(this)
    }
    componentDidMount() {
        const { id } = this.props.match.params
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
                    image: res.data[0].img_draw,
                    name: res.data[0].symbol_name,
                    attributes: res.data[0].attributes

                })
            }
            )
    }
    refresh() {
        const { id } = this.props.match.params
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
                    image: res.data[0].img_draw,
                    name: res.data[0].symbol_name,
                    attributes: res.data[0].attributes
                })
            }
            )
    }
    async deleteMeaning(id) {
        await axios.delete(`/api/meaning/${id}`)
            .then(res => {
                // console.log(res.data)
                this.refresh()
            })
    }
    async addMeaning(id) {
        await axios.post(`/api/meaning/${id}`, this.state)
            .then(res => {
                console.log(res)
                this.setState({
                    meaning: '',
                    language: '',
                })
                this.refresh()
            })

    }
    async updateSymbol(){
        await axios.put(`/api/symbol/${this.props.match.params.id}`, this.state)
        .then(res => {
            console.log(res)
        })
        this.refresh()
    }
    deleteSymbol=()=>{
        axios.delete(`/api/symbol/${this.state.delete}`)
        this.props.history.push('/symbolmenu')
    }


    render() {
        return (
            <div className="edit-meaning">
                <div className="meaning-column">
                    <img src={this.state.image} alt="" />
                    {this.state.meanings.map(meanings => (
                        <div key={meanings.meaning_text}>
                            <h4>{meanings.language}</h4>
                            <p> {meanings.meaning_text}</p>
                            <button onClick={() => this.deleteMeaning(meanings.meaning_id)}>Delete</button>
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
                            <input value={this.state.meaning} onChange={e => this.setState({ meaning: e.target.value })} />
                        </div>
                        <button onClick={() => this.addMeaning(this.props.match.params.id)}>submit</button>
                    </div>
                </div>
                <div className="symbol-column">
                        <h1>Edit Symbol</h1>
                        <h3>Symbol Name:</h3>
                        <input value={this.state.name} onChange={e=>this.setState({name: e.target.value})}/>
                        <h3>Symbol Drawing:</h3>
                        <input value={this.state.image} onChange={e=>this.setState({image: e.target.value})}/>
                    
                        <h3>Attributes</h3>
                        <input value={this.state.attributes} onChange={e=>this.setState({attributes: e.target.value})}/>
                      <button onClick={()=>this.updateSymbol()}>Update Symbol</button>  
                      <p>Enter symbol id to delete:</p><input onChange={e=>this.setState({delete: e.target.value})}/>
                      
                      <button onClick={()=>this.deleteSymbol()}>Delete Symbol</button>
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