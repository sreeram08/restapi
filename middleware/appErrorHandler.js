const express = require('express')

let errorhandler= (err,req,res,next)=>{
    console.log(err)
    res.send('some error occured at global level')
} //

let notFoundHandler=(err,res,req,next)=>{
    console.log(err)
    res.send('route not found')
}

module.exports={
    errorhandler:errorhandler,
    notFoundHandler:notFoundHandler
}