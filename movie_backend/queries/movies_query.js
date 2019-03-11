const {
  db
} = require("../db/db.js")

const getAllMovie = (req, res, next) => {
  db.any('SELECT movies.id, img_url, title, name AS genre_name, genre.id AS genre_id, AVG(rating.stars) AS Rating FROM movies JOIN genre ON movies.genre_id = genre.id JOIN rating ON movies.id = rating.id GROUP BY movies.id, img_url, title, name, genre.id').then((data)=>{
    res.status(200).json({
      status:200,
      data:data
    })
  }).catch(err =>{
    res.status(400).json({
      status:404,
      err: err
    })
  })
}

const getSingleInfo = (req, res, next) => {
  db.any('SELECT movies.id, img_url, title, name AS genre_name, genre.id AS genre_id, AVG(rating.stars) AS Rating FROM movies JOIN genre ON movies.genre_id = genre.id JOIN rating ON movies.id = rating.id WHERE ID = $1 GROUP BY movies.id, img_url, title, name, genre.id',{params:req.params.id}).then((data) => {
    res.status(200).json({
      status: 200,
      data: data
    })
  }).catch(err => {
    res.status(400).json({
      status: 404,
      err: err
    })
  })
}

const getCommentsByMovieID = (req, res, next) => {
  db.any('SELECT * FROM Comments WHERE  movies_id = $1', { params: req.params.id }).then((data) => {
    res.status(200).json({
      status: 200,
      data: data
    })
  }).catch(err => {
    res.status(400).json({
      status: 404,
      err: err
    })
  })
}


const insertComment = (req, res, next) => {
  db.any("INSERT INTO comments (comments, movies_id) VALUES($1, $2)" , {
    comments: req.body.comments,
    movie_id: req.body.movie_id
  }).then((data) => {
    res.status(200).json({
      status: 200,
      message: "success"

    })
  }).catch(err => {
    res.json({
      status: 404,
      message: err.message
    })
  })
}

const insertRating = (req, res, next) => {
  db.any("INSERT INTO rating (stars, movies_id) VALUES($1, $2)", {
    stars: req.body.stars,
    movie_id: req.body.movie_id
  }).then((data) => {
    res.status(200).json({
      status: 200,
      message: "success"
    })
  }).catch(err => {
    res.json({
      status: 404,
      message: err.message
    })
  })
}

module.exports = { getAllMovie, getSingleInfo, getCommentsByMovieID, insertRating}


