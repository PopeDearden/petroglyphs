import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/home/Home'
import SymbolsMenu from './Components/symbolsMenu/SymbolsMenu'
import AddSymbol from './Components/addSymbol/AddSymbol'
import EditSymbol from './Components/editSymbol/EditSymbol'
import Auth from './Components/auth/Auth'
import Charts from './Components/charts/Charts'



export default (
  <Switch>
    <Route path='/' exact component={Auth} />
    <Route path='/home' component = {Home} />
    <Route path='/symbolmenu' component={SymbolsMenu} />
    <Route path='/EditSymbol/:id' component={EditSymbol} />
    <Route path='/AddSymbol' component={AddSymbol} />
    <Route path='/charts' component={Charts}/>
  </Switch>
)