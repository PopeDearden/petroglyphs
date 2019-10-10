import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/home/Home'
import SymbolsMenu from './Components/symbolsMenu/SymbolsMenu'
import AddSymbol from './Components/addSymbol/AddSymbol'
import EditSymbol from './Components/editSymbol/EditSymbol'

import BarChart from './Components/charts/BarChart'
import Locations from './Components/locations/locations'
import MapGlyphs from './Components/map/Map'
import MapSearch from './Components/map/MapSymbolSearch'
import AddLocations from './Components/locations/AddLocations'
import PanelBuilder from './Components/panelBuilder/PanelBuilder'
import Location from './Components/locations/Location'
import MapAttributeSearch from './Components/map/MapAttributeSearch'

export default (
  <Switch>
    <Route path='/' exact component = {Home} />
    <Route path='/symbolmenu' component={SymbolsMenu} />
    <Route path='/EditSymbol/:id' component={EditSymbol} />
    <Route path='/AddSymbol' component={AddSymbol} />
    <Route path='/charts' component={BarChart}/>
    <Route path='/locations' component={Locations}/>
    <Route path='/map' component={MapGlyphs}/>
    <Route path='/mapsearch/:id' component={MapSearch}/>
    <Route path='/addlocations' component={AddLocations}/>
    <Route path='/panelBuilder/:id' component={PanelBuilder}/>
    <Route path='/location/:id' component={Location}/>
    <Route path='/attribute' component={MapAttributeSearch}/>
  </Switch>
)