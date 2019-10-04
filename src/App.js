import React, {Component} from 'react';
import Header from './Components/header/Header'
import Nav from './Components/nav/Nav'
import routes from './routes';
import Auth from './Components/auth/Auth'
import './App.scss';
import Axios from 'axios';


export default class App extends Component {
  constructor() {
    super()
    this.state ={
      user:""
    }
    this.check = this.check.bind(this)
  }
componentDidMount() {
  this.check()
}


check(){
  Axios.get('/auth/check')
  .then(res=>{
    this.setState({
      user: res.data
    })
    console.log('got hit again')
  })
  
}
render() {
if(this.state.user === 'no'){
  return(
    <div className='App'>
      <Auth 
      check = {this.check}/>
    </div>
  )
}
else{
  return(
    <div className='App'>
      <Header />
      <div className="Main">
        <Nav />
        <div className="display">
          {routes}
        </div>
      </div>
    </div>
  )
}

}
}





// function App(props) {
//   Axios.get('/auth/check')
//   .then(res=>{
//     if(res.data === "no"){
//       return(
//         <div className='App'>
//           <Route path='/' exact component={Auth} />
//         </div>
//       )
//     }
//     else {
//       return(
//       <div className='App'>
//       <Header />

//       <div className="Main">
//         <Nav />
//         <div className="display">
//           {routes}
//         </div>
//       </div>
//     </div>
//     )}
   
//   })
//   // return (
//   //   <div className='App'>
//   //     <Route path='/' exact component={Auth} />
//   //     <Header />

//   //     <div className="Main">
//   //       <Nav />
//   //       <div className="display">
//   //         {routes}
//   //       </div>
//   //     </div>
//   //   </div>
//   // )
// }
// function mapStateToProps(store) {
//   const { loggedIn } = store;
//   return { loggedIn };
// }

// export default connect(mapStateToProps)(App);