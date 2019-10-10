import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import { updateSymbols } from '../../ducks/reducer';
import './Location.scss'
import swal from 'sweetalert2'


class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbols: [],
            selectedName: "",
            selectedId: 1,
            meanings: [],
            attributes: "",
            table: [],
            row: 0,
            pillar: 0,
            locationId: 0,
            locationInfo: [],
            selectedImg: 'https://lh3.googleusercontent.com/HeFvgT6IBWqWJ5ixF_Rq-Lq4YHr0VmxvrqmIRWaOYRVHC80ZjovXTjY_xEIHO1jS6SmXcQNL9JyRUMnrhzZGOxvER8gjU4IkxfgOuvuF5Kqj-YzPi_Rq9wZt1vRq3617BQcvMzyiTuBENj47r71sqqOz963ueQd3xhvAULi0jdaaxvA0EsqtabayA7GJ8slsG4kC6Nmc_ukVLlLaGJK0d_WxWWAMntPRkYsYij7VwOjzBuFF5HmjmwHsCIrmbC0HlItCZSqC2xNoZsPNJU55Ioa8sBFyT52SrcKwMnGVRw-42JGgo7qXpHQYko91UXQvI3iIyyhSfw_w3DE-ntHUR3z-shZvL5nqF4HUoDgezcR-x_Ib9jA__qxaVRfYwWmoxgEWgRigYJlzWmwnH4eaRQqqbn2PSco9hywhaxhycfwEzMRnsQ7TtIYCVaUCFUl48fMfgGgOdm8AjhhZDH6tU9LcMUwaT09KPwalIXPU3v1Lp9zLso2CWBcnRA9c745kFGjCqaydpgATCH_rrBHVAyxXe0Py_cnXs1Sn7--ePk521N2YJW8oXNuhvtsQAajWEVoLZ-WMUJqmDV74QsWa4QpyAyrFIghsKu9SfpJot8uvJmgIWW4Eg1GfQON0F3o8NBu_fYrA3MXmTm9AA37jzO2tRsYBmv72ahYSVbUKKHtZ00X0sSIn_GFjQ161FDQaESN0woQOjCrXPEFAgvYPiiVYI9G2CyqfGTMxtnMcLpjq0DDW=s937-no',
            selectedName: '',
            selectedId: '',
            attributes: '',
            notes: [],
            title: '',
            note: '',
            noteId: '',
        }

        this.getSymbols = this.getSymbols.bind(this)
        this.getNotes = this.getNotes.bind(this)
        this.newNote = this.newNote.bind(this)
        this.editNote = this.editNote.bind(this)
        this.deleteNote = this.deleteNote.bind(this)

    }
    componentDidMount() {
        this.getSymbols()
        this.getPanelInfo()
        this.getPanelTable(this.props.match.params.id)
        this.getNotes(this.props.match.params.id)
        this.setState({
            locationId: this.props.match.params.id
        })
    }
    getNotes(id) {
        axios.get(`/api/notes/${id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    notes: res.data,
                })
            })
    }
    getSymbols() {
        axios.get('/api/symbols')
            .then(res => {
                this.props.updateSymbols(res.data)
            })
    }
    getPanelTable(id) {
        axios.get(`/api/paneltable/${id}`)
            .then(res => {
                this.setState({
                    table: res.data,
                })
            })
    }
    getPanelInfo() {
        axios.get(`/api/singlelocation/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    locationInfo: res.data[0]
                })
            })

    }
    editPanel = (id) => {
        this.props.history.push(`/panelBuilder/${id}`)
    }
    viewMeaning(image, id, name, attributes) {
        this.setState({
            selectedImg: image,
            selectedName: name,
            selectedId: id,
            attributes: attributes,
        })
        axios.get(`/api/meaning/${id}`)
            .then(res => {
                this.setState({
                    meanings: res.data
                })
                console.log(res.data)
            })

    }
    editSymbol = (id) => {
        this.props.history.push(`/editSymbol/${id}`)
    }
    async newNote(id) {
        if(this.props.username === 'taylordearden@gmail.com'){
        await axios.post(`/api/notes/${id}`)
            .then(
                this.setState({
                    form: 'add',
                    title: '',
                    note: '',

                })
            )
        await
            this.getNotes(id)
        }
        else{
            swal.fire('Access Denied','','warning')
        }
    }
    async editNote() {
        if(this.props.username === 'taylordearden@gmail.com'){
        await axios.put(`/api/notes/${this.state.noteId}`, this.state)
                await this.getNotes(this.props.match.params.id)
                await swal.fire('Note Updated')
        }
        else{
            swal.fire('Access Denied','','warning')
        }
    }
    async deleteNote() {
        if(this.props.username === 'taylordearden@gmail.com'){
        await axios.delete(`/api/notes/${this.state.noteId}`)
            .then(
                await this.setState({
                    title: '',
                    note: '',
                })
                )
                await this.getNotes(this.props.match.params.id)
                await swal.fire('Note Deleted')
            } 
            else{
                swal.fire('Access Denied','','warning')
            }
    }

    render() {
        let row1 = this.state.table.filter((element) => {
            return element.row === 1
        })
        let row2 = this.state.table.filter((element) => {
            return element.row === 2
        })
        let row3 = this.state.table.filter((element) => {
            return element.row === 3
        })
        let row4 = this.state.table.filter((element) => {
            return element.row === 4
        })
        // console.log(row1)
        // console.log(this.state.notes)
        return (
            <div className="Location">
                <div className="search-bar">
                    <h1>{this.state.locationInfo.location_name}</h1>
                </div>
                <div className="location-layout">
                    <div className="box1">
                        <div className="row-display">
                            <h3>Panel Symbols:</h3>
                            <div className='row'>
                                {row1.map(symbol => (
                                    <div className='symbol-display-list'>
                                        <img onClick={() => this.viewMeaning(symbol.img_draw, symbol.symbol_id, symbol.symbol_name, symbol.attributes)} src={symbol.img_draw} alt={symbol.symbol_name} />

                                    </div>
                                ))}
                            </div>
                            <div className='row'>
                                {row2.map(symbol => (
                                    <div className='symbol-display-list'>
                                        <img onClick={() => this.viewMeaning(symbol.img_draw, symbol.symbol_id, symbol.symbol_name, symbol.attributes)} src={symbol.img_draw} alt={symbol.symbol_name} />

                                    </div>
                                ))}
                            </div>
                            <div className='row'>
                                {row3.map(symbol => (
                                    <div className='symbol-display-list'>
                                        <img onClick={() => this.viewMeaning(symbol.img_draw, symbol.symbol_id, symbol.symbol_name, symbol.attributes)} src={symbol.img_draw} alt={symbol.symbol_name} />

                                    </div>
                                ))}
                            </div>
                            <div className='row'>
                                {row4.map(symbol => (
                                    <div className='symbol-display-list'>
                                        <img onClick={() => this.viewMeaning(symbol.img_draw, symbol.symbol_id, symbol.symbol_name, symbol.attributes)} src={symbol.img_draw} alt={symbol.symbol_name} />

                                    </div>
                                ))}
                            </div>
                            <div className="panel-image">
                                <img src={this.state.locationInfo.location_imgae} alt="" srcset="" />
                                <p>Right click on panel image and select, "Open image in new tab" to view full image".</p>
                            </div>
                            <button onClick={() => this.editPanel(this.props.match.params.id)}>Edit Panel Symbols</button>
                        </div>
                    </div>
                    <div className="box1">
                        <div className="selected-symbol-location">
                            <img src={this.state.selectedImg} alt='hmm' />
                            <h3>{this.state.selectedName}</h3>
                            <p>Attributes: {this.state.attributes}</p>

                            <h3>Meanings:</h3>
                            <div>
                                {this.state.meanings.map(meanings => (
                                    <div key={meanings.meaning_text}>

                                        <p> {meanings.language}: {meanings.meaning_text}</p>

                                    </div>
                                ))}
                            </div>
                            <button onClick={() => this.editSymbol(this.state.selectedId)}>Edit Symbol Info</button>
                        </div>

                    </div>
                    <div className="box2">
                        <div className="note-form">
                            <h1>Notes</h1>
                
                            <input onChange={e => this.setState({ title: e.target.value })} value={this.state.title} />
                          
                            <textarea onChange={e => this.setState({ note: e.target.value })} value={this.state.note} className="Paragraph" />
                            <div className="two-buttons">
                                <button onClick={() => this.editNote()}>Update</button>
                                <button onClick={() => this.deleteNote()}>Delete</button>
                            </div>
                        </div>
                        <div className="notes">
                            <h4>Select Note Subject:</h4>
                            <p className="note-titles" onClick={() => this.newNote(this.props.match.params.id)}>+Create New</p>
                            {this.state.notes.map(notes => (
                                <div className="note-titles" key={notes.note_id}>
                                    <li onClick={() => this.setState({ note: notes.information, title: notes.title, noteId: notes.note_id })}>
                                        {notes.title}
                                    </li>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    const { symbols, username } = store;
    return { symbols, username };
}

export default connect(mapStateToProps, { updateSymbols })(Location);