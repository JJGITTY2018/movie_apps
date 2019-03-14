import React, {Component} from "react"
import { NavLink } from "react-router-dom"
import "./navi.css"

export default class Navi extends Component{

  render(){
    return (
      <>
      <div className = "NaviBar">
      <NavLink to = "/home"> Home </NavLink>
      <div className = "naviMenu" >
      <NavLink to = "/movies"> All Movies </NavLink>
      <NavLink to = "/movies/genre"> By Genre </NavLink>
      </div>
      </div>
      </>
    )
  }

}