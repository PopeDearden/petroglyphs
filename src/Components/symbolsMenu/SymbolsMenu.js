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
            selectedImg: "https://lh3.googleusercontent.com/V_jLPozY55H4-fbEjVncNouEBU8C1QBK6L6Qd33_6RRfE1RPQSvtjAo-mOs9WMVXpYZWD5IoirSYQGGRgLmV3JSqYPbj2dPMjSM8NRq3w-XlJkSLu9TOx_LScYcOt7EB__l_vELu9DSICTUMwVYCZ7J4TRh-xRlV_1YRk9KF5GPJLIa7a6J9Qp5vNoWPJCebZe5WWVUNKTI0fpac080mlPXTZYQ7brQYb8UtDHERqjn_gaa1X7UGZECFUfE-iu2I-MWMvqR-E3OcbP17pYmGlWQstpr9_zLokA17og9A0mbtpA7QvEtLXRxzdPCWmLI-CNXiq5HDWUAd-Ki3s0VodFnCU1hACebcXzp9TMsQkt6m1O8lfNVuq8g-aJ1Z3Mw0Cv-iBkdjnw4Mkfl2ArcG3aoH9IwrUkd31KIbBaQfgFauCsaYAdmN2QDgUk3y66WMHN3vfmfmho8yLVQCEoOGk0Er06a5FHQMoo3OVt1Mc5R-c9epo2S_PI-VRyFcJ1M_Fc79enI8Cai35SP6FccQxuoKmwq2HsJNOiwSIrBDFIYvwnamtCwu2Pe-8mWOEoLy97y5GLtosDXpN5NDWkrQSyZ06_0g60RDSMrYGrHaiQu1bZB_1-wnLhDYjwpm5gBMuMnhni2L5hh6ab17BbqAHloIpLi-J-nEjZnha55c1hBoRi5UGq8HRV0=s903-no",
            selectedName: "",
            meanings: [],

        }
        this.viewMeaning = this.viewMeaning.bind(this)
        this.getSymbols = this.getSymbols.bind(this)
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

    viewMeaning(image, id, name) {
        this.setState({
            selectedImg: image,
            selectedName: name,
        })
        axios.get(`/api/meaning/${id}`)
            .then(res => {
                this.setState({
                    meanings: res.data
                })
                console.log(res.data)
            })

    }

    render() {
        return (
            <div className="symbol-menu">
                <div className="symbol-map">
                    {this.props.symbols.map(symbol => (
                        <div key={symbol.symbol_id} className='symbol-display'>
                            <img onClick={() => this.viewMeaning(symbol.img_draw, symbol.symbol_id, symbol.symbol_name)} src={symbol.img_draw} alt="hmm" />
                        </div>
                    ))}
                </div>
                <div className="selected-symbol">
                    <img src={this.state.selectedImg} alt='hmm' />
                    <h3>{this.state.selectedName}</h3>
                    <h3>Meanings:</h3>
                    {this.state.meanings.map(meanings => (
                        <div key={meanings.meaning_text}>
                            <h4>{meanings.language}</h4>
                            <p> {meanings.meaning_text}</p>

                        </div>
                    ))}
                    
                    <button onClick={()=>alert('not ready yet')}>Add/Edit Meanings</button>
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