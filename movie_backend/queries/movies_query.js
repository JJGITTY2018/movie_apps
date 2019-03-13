const {
  db
} = require("../db/db.js")

const getAllMovie = (req, res, next) => {
  db.any('SELECT movies.id, img_url, title, name AS genre_name, genre.id AS genre_id, AVG(rating.stars) AS Average_Rating FROM movies JOIN genre ON movies.genre_id = genre.id JOIN rating ON movies.id = rating.id GROUP BY movies.id, img_url, title, name, genre.id').then((data)=>{
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
  console.log(req.params.id)
  db.any('SELECT movies.id, img_url, title, name AS genre_name, genre.id AS genre_id, AVG(rating.stars) AS Rating FROM movies JOIN genre ON movies.genre_id = genre.id JOIN rating ON movies.id = rating.id WHERE movies.id = $1 GROUP BY movies.id, img_url, title, name, genre.id',[req.params.id]).then((data) => {
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
  db.any('SELECT * FROM Comments WHERE  movies_id = $1', [req.params.id]).then((data) => {
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
  db.any("INSERT INTO comments (comments, movies_id) VALUES($1, $2)" , [req.body.comments,req.body.movie_id]
  ).then((data) => {
    res.status(200).json({
      status: 200,
      message: "success"

    })
  }).catch(err => {cx
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

const getMovieByTitle = (req, res, next) => {
  let params = "%"+req.params.id+"%"
  db.any('SELECT movies.id, img_url, title, name AS genre_name, genre.id AS genre_id, AVG(rating.stars) AS Average_Rating FROM movies JOIN genre ON movies.genre_id = genre.id JOIN rating ON movies.id = rating.id WHERE LOWER(movies.title) LIKE $1 GROUP BY movies.id, img_url, title, name, genre.id',params).then((data) => {
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


const getGenreList = (req, res, next) => {
  db.any('SELECT name AS genre_name, genre.id AS genre_id FROM genre').then((data) => {
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
module.exports = { getAllMovie, getSingleInfo, getCommentsByMovieID, insertRating, insertComment, getMovieByTitle, getGenreList}


