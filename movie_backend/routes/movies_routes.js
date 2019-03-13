
const express = require('express')
const router = express.Router();

const { getAllMovie, getSingleInfo, getCommentsByMovieID, insertRating, insertComment, getMovieByTitle, getGenreList}= require("../queries/movies_query.js")

/* GET STUFF. */
router.get('/genre',getGenreList)
router.get('/search/:id', getMovieByTitle)
router.get('/:id/comments/', getCommentsByMovieID)
router.get('/:id', getSingleInfo)

router.get('/', getAllMovie)
//POSTING STUFF
router.post('/rating', insertRating)
router.post('/comment', insertComment)


module.exports = router;
