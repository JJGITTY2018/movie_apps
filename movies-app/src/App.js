import React, { Component } from 'react';

//ROUTERS
import { Route, Switch } from "react-router-dom"
import {withRouter} from "react-router-dom"

//Routes


//CSS
import './App.css';


//DISPLAY COMPONENTS
import Navi from "../src/1_header/navi.js"
import Home from "../src/2_body/home.js"
import AllMovies from "../src/2_body/moviesDisplay.js"
import ByGenre from "../src/2_body/genreDisplay.js"
import PerMovies from "../src/2_body/perMovieDisplay.js"




class App extends Component {
  render() {
    return (
      <> 
      <Navi />
      <Switch>
      <Route exact path = "/movies/genre" component = {ByGenre} />
      <Route exact path = "/movies" component = {AllMovies} />
      <Route exact path = "/movies/:id" component = {PerMovies} />
      <Route exact path = "/*" component = {Home} />
      </Switch>
      </> 
    )
  }
}

export default withRouter(App);
