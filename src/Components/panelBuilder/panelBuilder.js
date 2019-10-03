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
            row: 0,
            pillar: 0,
            locationId: 0,
            locationInfo: [],

        }

        this.getSymbols = this.getSymbols.bind(this)

    }
    componentDidMount() {
        this.getSymbols()
        this.getPanelInfo()
        this.getPanelTable(this.props.match.params.id)
        this.setState({
            locationId: +this.props.match.params.id
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
                console.log(res.data)
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
    addToPanel(id) {
        axios.post(`/api/order/${id}`, this.state)
            .then(res => {
                console.log(res)
                this.getPanelTable(this.state.locationId)
                this.setState({
                    row: "",
                    pillar: ""
                })
            })
    }
    deleteOrder = (id) => {
        axios.delete(`/api/order/${id}`)
            .then(res =>
                this.getPanelTable(this.state.locationId))
    }


    render() {
        let symbolDisplay = this.props.symbols.filter((element, index) => {
            return element.attributes.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })
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
        console.log(this.state.locationInfo)
        return (
            <div className="PanelBuilder">
                <div className="right-side">
                        <div className="search-bar">
                            <h3>Search by attribute:</h3>
                            <input onChange={e => this.setState({ searchInput: e.target.value })} />
                        </div>

                    <div className="select-symbol">
                        <div className="symbol-list">
                            {symbolDisplay.map(symbol => (
                                <div key={symbol.symbol_id} className='symbol-display-list'>
                                    <img onDoubleClick={() => this.addToPanel(symbol.symbol_id)} src={symbol.img_draw} alt={symbol.symbol_name} />
                                    <p>{symbol.symbol_id}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                
                <div className="row-display">
                    <div className='row'>
                        {row1.map(symbol => (
                            <div className='symbol-display-list'>
                                <img onDoubleClick={() => this.deleteOrder(symbol.order_id)} src={symbol.img_draw} alt={symbol.symbol_name} />

                            </div>
                        ))}
                    </div>
                    <div className='row'>
                        {row2.map(symbol => (
                            <div className='symbol-display-list'>
                                <img onDoubleClick={() => this.deleteOrder(symbol.order_id)} src={symbol.img_draw} alt={symbol.symbol_name} />

                            </div>
                        ))}
                    </div>
                    <div className='row'>
                        {row3.map(symbol => (
                            <div className='symbol-display-list'>
                                <img onDoubleClick={() => this.deleteOrder(symbol.order_id)} src={symbol.img_draw} alt={symbol.symbol_name} />

                            </div>
                        ))}
                    </div>
                    <div className='row'>
                        {row4.map(symbol => (
                            <div className='symbol-display-list'>
                                <img onDoubleClick={() => this.deleteOrder(symbol.order_id)} src={symbol.img_draw} alt={symbol.symbol_name} />

                            </div>
                        ))}
                    </div>
                    <div className='input'>
                        Row<input value={this.state.row} onChange={e => this.setState({ row: e.target.value })} />
                        Column<input value={this.state.pillar} onChange={e => this.setState({ pillar: e.target.value })} />
                    </div>
                    <div className="panel-image">
                        <img src={this.state.locationInfo.location_imgae} alt="" srcset="" />

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