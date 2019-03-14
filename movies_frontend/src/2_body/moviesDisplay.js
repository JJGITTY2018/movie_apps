import React, {
  Component
} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"


class AllMovies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:[
      ],
      input:""

    }
  }

  elMap = () => {
    console.log(this.state)
    let data = this.state.data
    if(this.state.data.length !== 0){
    return data.map(el => {
      return (
          <li key={el.id}>
            <ul>
              <NavLink to={"/movies/" + el.id} >
                <img src={el.img_url} width="100" alt={el.title} />
                <li key = {el.title}> Title: {el.title}</li>
                <li key = {el.genre_name}> Genre: {el.genre_name}</li>
                <li key = {el.average_rating}> Rating: {el.average_rating.slice(0, 3)}</li>
              </NavLink>
            </ul>
            </li>
      )
    })
  }
  }
  
  handleOnLoad = () => {
    axios
    .get("/movies")
    .then((res) =>{
      this.setState({
        data:res.data.data
      })
    })
  }
  handleOnChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleOnSubmit = (event) => {
    event.preventDefault()
    axios
    .get(`/movies/search/${this.state.input.toLowerCase()}`)
    .then((res)=>{
      this.setState({
        data:res.data.data
      })
    }).catch(err =>{
      console.log(err)
    })
  }

  componentDidMount() {
    this.handleOnLoad()
  }

  render() {
    return (
      <div className ="Movie_Body">
        <div className = "Container" > 
        <form onSubmit = {this.handleOnSubmit}>
          <h1> Search a Movie: </h1>
          <input onChange = {this.handleOnChange}type = "input" name = "input" value = {this.state.input} />
          <input type = "submit" />
        </form>
        <ul className = "movies_cell">
          {this.elMap()}
        </ul>
        </div>
      </div>
    )
  }
}


export default AllMovies