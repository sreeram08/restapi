const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Declaring new Schema

let kartSchema = new Schema(
    // Schema definition
    {
        productid: {
            type: String,
            unique: true
        },
        prodName: {
            type: String,
            default: 'Unknown product'
        },
        prodDescription: {
            type: String,
            default: ' '
        },
        price: {
            type: Number
        },
        availabitlity: {
            type: Boolean,
            default: true
        },
        seller: {
            type: String,
            default: 'unknown'
        },
        description: {
            type: String,
            default: 'no description available with this product'
        },
        catogery: {
            type: String,
            default: 'home'
        },
        boxContains: {
            type: String,
            default: ''
        }

    }
)

mongoose.model('product',kartSchema);