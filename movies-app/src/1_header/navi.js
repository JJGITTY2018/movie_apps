import React, {Component} from "react"
import { NavLink } from "react-router-dom"

export default class Navi extends Component{
  constructor (props) {
    super(props)
  }

  render(){
    return (
      <>
      <h1> NaviBar</h1>
      <div className = "naviMenu" >
      <NavLink to = "/home"> Home </NavLink>
      <NavLink to = "/movies"> All Movies </NavLink>
      <NavLink to = "/movies/genre"> By Genre </NavLink>
      </div>
      </>
    )
  }

}