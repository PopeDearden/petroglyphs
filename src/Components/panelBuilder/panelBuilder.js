import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom'
import { updateSymbols } from '../../ducks/reducer';
import './PanelBuilder.scss'



class PanelBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            symbols: [],
            selectedName: "",
            selectedId: 1,
            meanings: [],
            attributes: "",
            table: [],


        }

        this.getSymbols = this.getSymbols.bind(this)

    }
    componentDidMount() {
        this.getSymbols()
        this.getPanelTable(this.props.match.params.id)
    }
    getSymbols() {
        axios.get('/api/symbols')
            .then(res => {
                this.props.updateSymbols(res.data)
            })
    }
    addSymbol(id) {
        console.log(id)
    }
    getPanelTable(id) {
        axios.get(`/api/paneltable/${id}`)
            .then(res => {
                this.setState({
                    table: res.data
                })
            })
    }


    render() {
        let symbolDisplay = this.props.symbols.filter((element, index) => {
            return element.attributes.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })
        let row1 = this.state.table.filter((element)=>{
            return element.row === 1
        })
        let row2 = this.state.table.filter((element)=>{
            return element.row === 2
        })
        let row3 = this.state.table.filter((element)=>{
            return element.row === 3
        })
        let row4 = this.state.table.filter((element)=>{
            return element.row === 4
        })
        // console.log(row1)
        // console.log(this.state.table)
        return (
            <div className="PanelBuilder">
                <div className="right-side">

                    <div className="select-symbol">
                        <div className="search-bar">
                            <p>Search by attribute:</p>
                            <input onChange={e => this.setState({ searchInput: e.target.value })} />
                        </div>
                        <div className="symbol-list">
                        {symbolDisplay.map(symbol => (
                            <div key={symbol.symbol_id} className='symbol-display-list'>
                                <img onClick={() => this.addSymbol(symbol.symbol_id)} src={symbol.img_draw} alt={symbol.symbol_name} />
                                <p>{symbol.symbol_id}</p>
                            </div>
                        ))}

                        </div>
                    </div>
                </div>
                <div className="row-display">
                    <div className='row'>
                    {row1.map(symbol=> (
                        <div className='symbol-display-list'>
                            <img src={symbol.img_draw} alt={symbol.symbol_name} />

                        </div>
                    ))}
                    </div>
                    <div className='row'>
                    {row2.map(symbol=> (
                        <div className='symbol-display-list'>
                            <img src={symbol.img_draw} alt={symbol.symbol_name} />

                        </div>
                    ))}
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

export default connect(mapStateToProps, { updateSymbols })(PanelBuilder);