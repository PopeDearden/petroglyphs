import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom'
import { updateSymbols} from'./../../ducks/reducer';
import './SymbolsMenu.scss'

class SymbolsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      symbols: [],
      selectedImg: "",
    };
 this.viewMeaning = this.viewMeaning.bind(this)
  }
componentDidMount(){
    axios.get('/api/symbols')
    .then(res => {
        this.props.updateSymbols(res.data)
    })
}

viewMeaning(){
    alert('worked')
}
// componentDidMount(){
//     axios.get('/api/symbols')
//     .then(res=>{
//         this.setState({
//             symbols: res.data
//         })
//     })
// }

  render() {
    return (
      <div>
        <p>Symbols Menu</p>
        {this.props.symbols.map(symbol => (
            <div key={symbol.symbol_id} className='symbol-display'>
                <p>{symbol.symbol_name}</p>
            <img onClick={()=>this.viewMeaning(symbol.symbol_id)} src={symbol.img_draw} alt="hmm"/>
            </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { symbols } = store;
  return { symbols };
}

export default connect(mapStateToProps, {updateSymbols})(SymbolsMenu);