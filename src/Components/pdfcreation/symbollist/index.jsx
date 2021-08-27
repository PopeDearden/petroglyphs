import React, { Component } from 'react';
import axios from 'axios';
import './symbollist.scss'
class Symbollist extends Component {
  constructor(props) {
    super(props);
  }
  state = {
      symbols: [],
      meanings: []
  }
componentDidMount () {
    axios.get('/api/symbols').then(res=>{
        console.log(res.data)
        this.setState({symbols:res.data})
    })
    axios.get('/api/meanings').then(res=> {
        this.setState({meanings: res.data})
    })
}

  render() {
    
      return (
       <div className="PDF-symbol-list">
           {this.state.symbols.map((symbol,index) => (
               <div className="PDF-Symbol-Section">
           <img src={symbol.img_draw} alt='failed' width={"100px"} height={"100px"} />
           <div className="PDF-Symbol-Meaning-List">
            {this.state.meanings.filter(meaning => meaning.symbol_id === symbol.symbol_id ? meaning : '').map(meaning => (
                <p>{meaning.language}: {meaning.meaning_text}</p>
            ))}
           </div>
           </div>
       ))}
       <p>hi</p></div>
      )
  }
}
function mapStateToProps(state) {
  return state;
}
export default Symbollist