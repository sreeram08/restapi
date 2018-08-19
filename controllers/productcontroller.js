const mongoose = require('mongoose')
const shortid = require('shortid')
//  importing libraries
const response = require('../libs/responselibs')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')


//  importing models
const kartmodel = mongoose.model('product');

let allproducts = (req, res) => {
    kartmodel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'ProductController: allproducts', 10)
            let apiResponse = response.generate(true, 'Failed To Find Products', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('Products Not Found', 'ProductController: allProducts')
            let apiResponse = response.generate(true, 'No products Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Products Found', 200, result)
            res.send(apiResponse)
        }
    })
}// end get all blogs

let viewproduct = (req, res) => {

    if (check.isEmpty(req.params.productid)) {

        console.log('blogId should be passed')
        let apiResponse = response.generate(true, 'ProductID is missing', 403, null)
        res.send(apiResponse)
    } else {

        kartmodel.findOne({ 'productid': req.params.productid}, (err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('product Not Found.')
                let apiResponse = response.generate(true, 'Product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info("Product found successfully","ProductController:ViewProduct",5)
                let apiResponse = response.generate(false, 'Product Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

let addproduct = (req, res) => {
    let createProductFunc = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.prodName) || check.isEmpty(req.body.prodDescription) || check.isEmpty(req.body.price) || check.isEmpty(req.body.catogery)) {

                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {

                let productid = shortid.generate()

                let newproduct = new kartmodel({

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

                newproduct.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('product Created Successfully')
                        resolve(result)
                    }
                }) // end new blog save
            }
        }) // end new blog promise
    } // end create blog function

    // making promise call.
    createProductFunc()
        .then((result) => {
            let apiResponse = response.generate(false, 'Product Created successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

let editproduct = (req, res) => {


    if (check.isEmpty(req.params.productid)) {

        console.log('productid should be passed')
        let apiResponse = response.generate(true, 'productid is missing', 403, null)
        res.send(apiResponse)
    } else {

        let options = req.body;
        console.log(options);
        kartmodel.update({ 'productid': req.params.productid }, options, { multi: true }).exec((err, result) => {

            if (err) {

                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                console.log('product Not Found.')
                let apiResponse = response.generate(true, 'product Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Edited Successfully')
                let apiResponse = response.generate(false, 'Edited Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

let deleteProduct = (req, res) => {
    if (check.isEmpty(req.params.productid)) {

        console.log('id should be passed')
        let apiResponse = response.generate(true, 'id is missing', 403, null)
        res.send(apiResponse)
    }
    else {
        kartmodel.remove({ 'productid': req.params.productid }, (err, result) => {
            if (err) {
                let apiResponse = response.generate(true, 'Failed To Find Product', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                let apiResponse = response.generate(true, 'Failed To Find Product Details', 400, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Product Deleted', 200, result)
                res.send(apiResponse)

            }
        })
    }
}
module.exports = {
    allproducts: allproducts,
    viewproduct: viewproduct,
    addproduct: addproduct,
    editproduct: editproduct,
    deleteProduct: deleteProduct
}