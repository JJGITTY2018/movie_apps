import {db} from "../db/db.js"

const express = require('express')
const router = express.Router();

const { getAllMovie, getSingleInfo, getCommentsByMovieID, insertRating }= require("../queries/movies_query.js")

/* GET users listing. */
router.get('/:id', getSingleInfo )
router.get('/', getAllMovie)
router.post('/follow', insertFollow)
router.post('/comment', insertComment)


module.exports = router;
