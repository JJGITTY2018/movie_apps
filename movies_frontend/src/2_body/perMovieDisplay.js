import React, {
  Component
} from "react"
import "./perMovieDisplay.css"
import axios from "axios"


class PerMovie extends Component {
  constructor (props) {
    super(props)
  this.state = ({
      comments: [],
      data:{rating:""},
      rating: "3"
    })
    
  }

  elMapComments = () => {
    let array = this.state.comments
    if(array){
     return array.map(el => {
        return (
          <p>{el.comments}</p>
        )
      })
    }

    else{
      return (
        <h1> BOO</h1>
      )
    }
  }

  onLoadGetData = () =>{
    let params = this.props.match.params.id
    axios.all([
      axios.get(`/movies/${params}`),
      axios.get(`/movies/${params}/comments`)
    ])
    .then(axios.spread((moviesInfo,moviesComments) => {
      this.setState({
        data:moviesInfo.data.data[0],
        comments:moviesComments.data.data
      })
  }))
  }

onChangeRating = (event) => {
    console.log(this.state)
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleOnSubmit = (event) => {
    console.log(parseInt(this.props.match.params.id))
    event.preventDefault()
    axios.all([
      axios.post('/movies/rating',{
        stars: this.state.rating,
        movie_id: parseInt(this.props.match.params.id)
      }),
      axios.post('/movies/comment',{
        comments:this.state.comment,
        movie_id: parseInt(this.props.match.params.id)
      })
    ]).then(axios.spread((ratingsStatus,commentsStatus) =>{
      console.log(ratingsStatus)
      console.log(commentsStatus)
    }
    )
    ).then(()=>{
      this.setState({
        comment: ""
      })
      this.onLoadGetData()
    })
  }

  onChangeTextArea = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  componentDidMount(){
    this.onLoadGetData()
  }


  render() {
    console.log()
    let info = this.state.data
    return (
      <div className = "PerContainer" >
      <div className = "perDisplayContainer">
          <h1>Title: {info.title} </h1>
          <h2>Genre: {info.genre_name}</h2>
          <h2> Rating: {info.rating.slice(0,3)}</h2>
          <br></br>
          <img src = {info.img_url} alt = {info.img_url} />
      </div>
      
      <form className = "rating_comments_forms" onSubmit ={this.handleOnSubmit}>
      <br></br>
      <h2>Your Rating: </h2> 
      <div className ="rate_area"> 
            1 ⭐ <input name="rating" type="range" min="1" max="5" defaultValue = "3" onSelect={this.onChangeRating} /> 5 ⭐
  
      </div>
      <h2>Your Comment: </h2>
      <br></br>
          <textarea name = "comment" value ={this.state.comment} onChange={this.onChangeTextArea} className = "text-area"></textarea>
      <br></br>
      <input type = "submit" />
      </form>

      <div className = "commentsContainer"> 
          <h1> Other Folks Comments </h1>
       {this.elMapComments()}
      </div>
      
      
    </div>
    )
  }
}




export default PerMovie