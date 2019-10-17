import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import { updateSymbols } from './../../ducks/reducer';
import './SymbolsMenu.scss'

class SymbolsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            symbols: [],
            selectedImg: "https://lh3.googleusercontent.com/HeFvgT6IBWqWJ5ixF_Rq-Lq4YHr0VmxvrqmIRWaOYRVHC80ZjovXTjY_xEIHO1jS6SmXcQNL9JyRUMnrhzZGOxvER8gjU4IkxfgOuvuF5Kqj-YzPi_Rq9wZt1vRq3617BQcvMzyiTuBENj47r71sqqOz963ueQd3xhvAULi0jdaaxvA0EsqtabayA7GJ8slsG4kC6Nmc_ukVLlLaGJK0d_WxWWAMntPRkYsYij7VwOjzBuFF5HmjmwHsCIrmbC0HlItCZSqC2xNoZsPNJU55Ioa8sBFyT52SrcKwMnGVRw-42JGgo7qXpHQYko91UXQvI3iIyyhSfw_w3DE-ntHUR3z-shZvL5nqF4HUoDgezcR-x_Ib9jA__qxaVRfYwWmoxgEWgRigYJlzWmwnH4eaRQqqbn2PSco9hywhaxhycfwEzMRnsQ7TtIYCVaUCFUl48fMfgGgOdm8AjhhZDH6tU9LcMUwaT09KPwalIXPU3v1Lp9zLso2CWBcnRA9c745kFGjCqaydpgATCH_rrBHVAyxXe0Py_cnXs1Sn7--ePk521N2YJW8oXNuhvtsQAajWEVoLZ-WMUJqmDV74QsWa4QpyAyrFIghsKu9SfpJot8uvJmgIWW4Eg1GfQON0F3o8NBu_fYrA3MXmTm9AA37jzO2tRsYBmv72ahYSVbUKKHtZ00X0sSIn_GFjQ161FDQaESN0woQOjCrXPEFAgvYPiiVYI9G2CyqfGTMxtnMcLpjq0DDW=s937-no",
            selectedName: "",
            selectedId: 1,
            meanings: [],
            attributes: "",

        }
        this.viewMeaning = this.viewMeaning.bind(this)
        this.getSymbols = this.getSymbols.bind(this)
        this.editSymbol = this.editSymbol.bind(this)
    }
    componentDidMount() {
        this.getSymbols()
    }
    getSymbols() {
        axios.get('/api/symbols')
            .then(res => {
                this.props.updateSymbols(res.data)
            })
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
    editSymbol(id){
        this.props.history.push(`/editSymbol/${id}`)
    }

    render() {
        let symbolDisplay = this.props.symbols.filter((element, index) =>{
            return element.attributes.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })
        return (
            <div className="symbol-page">
                <div className ="search-bar">
                    <h1>Symbol Library:</h1>
                    <input placeholder="Search by attribute..." onChange={e=> this.setState({searchInput: e.target.value})}/>
                </div>
            <div className="symbol-menu">
                <div className="symbol-map">
                    {symbolDisplay.map(symbol => (
                        <div key={symbol.symbol_id} className='symbol-display'>
                            <img onClick={() => this.viewMeaning(symbol.img_draw, symbol.symbol_id, symbol.symbol_name, symbol.attributes)} src={symbol.img_draw} alt={symbol.symbol_name}/>
                        </div>
                    ))}
                </div>
                <div className="selected-symbol">
                    <img src={this.state.selectedImg} alt='hmm' />
                    <h3>{this.state.selectedName}</h3>
                    <p>Attributes: {this.state.attributes}</p>
                
                    <h3><u>Meanings:</u></h3>
                    <div>
                    {this.state.meanings.map(meanings => (
                        <div key={meanings.meaning_text}>
                            
                            <p><b>{meanings.language}:</b> {meanings.meaning_text}</p>

                        </div>
                    ))}
                    </div>
                    <div className="two-buttons">
                    <button onClick={()=>this.editSymbol(this.state.selectedId)}>Edit Symbol Info</button>
                    <button onClick={()=>this.props.history.push(`/mapsearch/${this.state.selectedId}`)}>View Locations</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    const { symbols } = store;
    return { symbols };
}

export default connect(mapStateToProps, { updateSymbols })(SymbolsMenu);