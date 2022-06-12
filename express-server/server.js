const express = require('express')
const {check, validationResult} = require('express-validator')
const connectDB = require('./config/dbConnect')

const movie = require('./models/MovieModel')
var cors = require('cors')
const app = express();
app.use(cors())

//Connect DB
connectDB()
app.use(express.json({ extend: false}))

app.post("/addMovie", 
[
    check('name', 'Name is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
    check('duration', 'Duration is required').not().isEmpty(),
    check('director', 'Director is required').not().isEmpty(),
    check('production', 'Production is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('certificate', 'Certificate is required').not().isEmpty(),
], 
async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, genre, duration, director, production, year, certificate, rating} = req.body;

    try{
        let movieData = new movie({
            name,
            genre, 
            duration, 
            director, 
            production, 
            year, 
            certificate, 
            rating
        })

        await movieData.save()
    }

    catch(err){
        res.status(500).send('Server Error - Insert Failed')
    } 

    res.status(200).send('Insertion Complete')     
})

app.get("/getMovieList", async(req,res)=>{

    let movieData = movie.find({}, (err, result)=>{
        if(err)
            res.status(500).json({error: "Server Error"})
        else
            res.status(200).json(result)
    });
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))