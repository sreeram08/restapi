const express = require('express')
 const mongoose = require('mongoose')
 const response = require('../libs/responselibs')
 const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')


const cartItentmodel = mongoose.model('cart');
const kartmodel = mongoose.model('product')

let viewCart = (req, res) => {
    cartItentmodel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'CartController: viewCart', 10)
            let apiResponse = response.generate(true, 'Failed To Fecth Products', 500, null)
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            logger.info('Products Not Found', 'CartController: Viewcart')
            let apiResponse = response.generate(true, 'No Items Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Available Cart Items', 200, result)
            res.send(apiResponse)
        }
    })
}// end get all blogs





let addToCart = (req, res) => {
    let additemFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.prodName) || check.isEmpty(req.body.prodDescription) || check.isEmpty(req.body.price) || check.isEmpty(req.body.catogery)) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                let productid = req.params.productid

                let addItem = new cartItentmodel({

                    productid: productid,
                    prodName: req.body.prodName,
                    prodDescription: req.body.prodDescription,
                    price: req.body.price,
                    availability: true,
                    seller: req.body.seller,
                    description: req.body.description,
                    catogery: req.body.catogery,
                    boxContains: req.body.boxContains
                }) // end new blog model

                addItem.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Product Added To Cart')
                        resolve(result)
                    }
                }) // end new blog save
            }
        }) // end new blog promise
    } // end create blog function
    additemFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Product Added To Cart', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}
let removeItem = (req, res) => {
    if (check.isEmpty(req.params.productid)) {

        console.log('id should be passed')
        let apiResponse = response.generate(true, 'id is missing', 403, null)
        res.send(apiResponse)
    }
    else {
        cartItentmodel.remove({ 'productid': req.params.productid }, (err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'Failed To Find Product', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'Failed To Find Product Details', 400, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Product Removed From Cart', 200, result)
                res.send(apiResponse)

            }
        })
    }
}
module.exports={
    viewCart:viewCart,
    addToCart:addToCart,
    removeItem:removeItem
}
