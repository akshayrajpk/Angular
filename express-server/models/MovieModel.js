const mongoose = require('mongoose')

const movieSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    genre:{
        type:String,
        required: true
    },
    duration:{
        type:Number,
        required: true
    },
    director:{
        type:String,
        required: true
    },
    production:{
        type:String,
        required: true
    },
    year:{
        type:Number,
        required: true
    },
    certificate:{
        type:String,
        required:true
    },
    rating:{
        type: Number,
        required: false
    }
})

module.exports =  mongoose.model('movie', movieSchema)