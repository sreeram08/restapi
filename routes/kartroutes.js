const express = require('express')
const appConfig = require('../config/appConfig')
const app = express()
const prodConroller = require('../controllers/productcontroller')
const cartController = require('../controllers/cartcontroller')
const auth = require("../middleware/auth")



let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/products';

    app.get(baseUrl + '/all',auth.isAuthenticated, prodConroller.allproducts);
    /**
	 * @api {get} /api/v1/products/all  Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Products Found",
	    "status": 200,
	    "data": [
					{
						productid: "string",
						prodName: "string",
						prodDescription: "string",
						price: "number",
						availability: boolean,
						category: "string",
                        seller: "string",
                        description:"string",
                        boxContains: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Products",
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl + '/:productid/view',auth.isAuthenticated, prodConroller.viewproduct);
    /**
	 * @api {get} /api/v1/products/:productid/view  Get single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productid productid of the product passed as the URL parameter
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully",
	    "status": 200,
	    "data": [
					{
						productid: "string",
						prodName: "string",
						prodDescription: "string",
						price: "number",
						availability: boolean,
						category: "string",
                        seller: "string",
                        description:"string",
                        boxContains: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl + '/create',auth.isAuthenticated, prodConroller.addproduct);
    /**
	 * @api {post} /api/v1/products/create  create products
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} prodName Name of the Product passed as a body parameter
	 * @apiParam {String} prodDescription Description of the Product passed as a body parameter
	 * @apiParam {String} seller sellerName of the Product passed as a body parameter
	 * @apiParam {Number} price Price of the Product passed as a body parameter
	 * @apiParam {String} description Description  of the Product passed as a body parameter
	 * @apiParam {String} catogery catogery of the Product passed as a body parameter
	 * @apiParam {String} boxContains Contents of the Product passed as a body parameter
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Created successfully",
	    "status": 200,
	    "data": [
					{
						productid: "string",
						prodName: "string",
						prodDescription: "string",
						price: "number",
						availability: boolean,
						category: "string",
                        seller: "string",
                        description:"string",
                        boxContains: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */
    app.put(baseUrl + '/:productid/edit',auth.isAuthenticated, prodConroller.editproduct);
    /**
	 * @api {put} /api/v1/products/:productid/edit  edit products
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productid productid of the Product passed as a parameter     
	 * @apiParam {String} prodName Name of the Product passed as a body parameter
	 * @apiParam {String} prodDescription Description of the Product passed as a body parameter
	 * @apiParam {String} seller sellerName of the Product passed as a body parameter
	 * @apiParam {Number} price Price of the Product passed as a body parameter
	 * @apiParam {String} description Description  of the Product passed as a body parameter
	 * @apiParam {String} catogery catogery of the Product passed as a body parameter
	 * @apiParam {String} boxContains Contents of the Product passed as a body parameter
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "edited successfully",
	    "status": 200,
	    "data": [
					{
						productid: "string",
						prodName: "string",
						prodDescription: "string",
						price: "number",
						availability: boolean,
						category: "string",
                        seller: "string",
                        description:"string",
                        boxContains: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Product Not Found",
	    "status": 500,
	    "data": null
	   }
	 */ 
    app.post(baseUrl + '/:productid/delete',auth.isAuthenticated, prodConroller.deleteProduct);
     /**
	 * @api {post} /api/v1/products/:productid/delete  Delete product
	 * @apiVersion 0.0.1
	 * @apiGroup Delete
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productid productid of the Product passed as a parameter    
	  *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl + '/viewcart',auth.isAuthenticated, cartController.viewCart); 
    /**
	 * @api {get} /api/v1/products/viewcart  Get all products from cart
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Availble cart Items",
	    "status": 200,
	    "data": [
					{
						productid: "string",
						prodName: "string",
						prodDescription: "string",
						price: "number",
						availability: boolean,
						category: "string",
                        seller: "string",
                        description:"string",
                        boxContains: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "No Items Found",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl + '/:productid/addtocart',auth.isAuthenticated, cartController.addToCart);
    /**
	 * @api {post} /api/v1/products/:productid/addtocrt  add products to cart
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} productid productid of the product passed as the URL parameter
	 * @apiParam {String} prodName Name of the Product passed as a body parameter
	 * @apiParam {String} prodDescription Description of the Product passed as a body parameter
	 * @apiParam {String} seller sellerName of the Product passed as a body parameter
	 * @apiParam {Number} price Price of the Product passed as a body parameter
	 * @apiParam {String} description Description  of the Product passed as a body parameter
	 * @apiParam {String} catogery catogery of the Product passed as a body parameter
	 * @apiParam {String} boxContains Contents of the Product passed as a body parameter
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Added To Cart",
	    "status": 200,
	    "data": [
					{
						productid: "string",
						prodName: "string",
						prodDescription: "string",
						price: "number",
						availability: boolean,
						category: "string",
                        seller: "string",
                        description:"string",
                        boxContains: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl + '/:productid/removeitem',auth.isAuthenticated, cartController.removeItem);
     /**
	 * @api {post} /api/v1/products/:productid/removeitem  remove from cart
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productid productid of the Product passed as a parameter    
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product removed from cart",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product",
	    "status": 500,
	    "data": null
	   }
	 */




}// end setRouter function 

module.exports = {
    setRouter: setRouter //exporting the routes
}