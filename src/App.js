
import React from 'react';

import Header from './Components/header/Header'
import Nav from './Components/nav/Nav'
import routes from './routes';

import './App.scss';

function App() {
  return (
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

export default App;