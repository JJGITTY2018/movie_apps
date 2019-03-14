import React, {
  Component
} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"


import "./genreDisplay.css"


class ByGenre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  elMap = () => {
    let data = (this.state.filterdata? this.state.filterdata : this.state.data)
    return data.map(el => {
      return (
          <li key={el.id}>
            <ul>
              <NavLink to={"/movies/" + el.id} >
            <img src={el.img_url} width="100" alt = {el.title}/>
                <li key = {el.title}>Title: {el.title}</li>
                <li key = {el.genre_name}>Genre: {el.genre_name}</li>
                <li key = {el.average_rating}>Rating: {el.average_rating.slice(0, 3)}</li>
              </NavLink>
            </ul>
          </li>
      )
    })

  }

  elMapGenreOptions = () =>{
    if(this.state.genres){
      return this.state.genres.map(el=>{
       return <option key = {el.genre_id} value = {el.genre_name}>{el.genre_name}
        </option>
      })
    }
    else {
      return null
    }
  }

  handleOnLoad = () => {
    axios
      .get("/movies")
      .then((res) => {
        this.setState({
          data: res.data.data
        })
      }).then(()=>{
        axios.get("/movies/genre").then((res)=>{
          this.setState({
            genres : res.data.data
          })
        })
      })
  }

  filterMoviesByGenre = (array,option) =>{
    let newFilterArr = array.filter(el =>{
      return el.genre_name === option
    })
    this.setState({
      filterdata: newFilterArr
    })
    
    }

  handleOnSubmit = (event) => {
    event.preventDefault()
    if(this.state.option){
      console.log(this.state.data)
      this.filterMoviesByGenre(this.state.data,this.state.option)
    }
    else{
      return null
    }
  }

  handleOnChange = (event) =>{
    
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    this.handleOnLoad()
  }


  render() {
    return (
      <div className="Movie_Body">
        <div className="Container" >
            <h1> Search by Genre: </h1>
          <form onSubmit={this.handleOnSubmit}>
            <select onChange={this.handleOnChange} name = "option" defaultValue = "">
            <option key = "0" value = "" disabled> </option>
              {this.elMapGenreOptions()}
            </select>
            <input type="submit" />
          </form>
          <ul className="movies_cell">
            {this.elMap()}
          </ul>
        </div>
      </div>
    )
  }

}


export default ByGenre