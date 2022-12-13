// const express = require('express')
const ROUTE = express.Router()

const productSchema = require('../schemas/productSchema')

// unsecured routes
ROUTE.route('/').get(async (req: any, res: any) => {
    const productList: any[] = []
    const products = productSchema.find()

    if (products) {
        for(let product of products) {
            productList.push({
                articleNumber: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }

        res.status(200).json(productList)
    } else {
        res.status(404).json("not found")
    }
})

ROUTE.route('/:tag').get((req: any, res: any) => {
    const productList: any[] = []
    const products = productSchema.find({tag: req.params.tag})

    if (products) {
        for(let product of products) {
            productList.push({
                articleNumber: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }

        res.status(200).json(productList)
    } else {
        res.status(404).json("not found")
    }
})

ROUTE.route('/:tag/:take').get(async (req: any, res: any) => {
    const productList: any[] = []
    const products = await productSchema.find({tag: req.params.tag}).limit(req.params.take)
    
    if (products) {
        if (products) {
            for(let product of products) {
                productList.push({
                    articleNumber: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    tag: product.tag,
                    imageName: product.imageName,
                    rating: product.rating
                })
            }
    
            res.status(200).json(productList)
        }res.status(200).json(products)
    } else {
        res.status(404).json("not found")
    }
})

ROUTE.route('/product/:details/:articleNumber').get(async (req: any, res: any) => {
    const product = await productSchema.findById(req.params.articleNumber)
    
    if (product) {
        res.status(200).json({
            articleNumber: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            tag: product.tag,
            imageName: product.imageName,
            rating: product.rating
        })
    } else {
        res.status(404).json("not found")
    }
})


// secured routes
ROUTE.route('/').post(async (req: any, res: any) => {
    const { name, description, price, category, tag, imageName, rating } = req.body
    if (!name || !price) {
        res.status(400).json({text: "name and price is required"})
    }
    const find_product = await productSchema.findOne({name})
    if (find_product) {
        res.status(409).json({text: 'That product does already exist'})
    } else {
        const product = await productSchema.create({
            name,
            description,
            price,
            category,
            tag,
            imageName,
            rating,
        })
        if (product) {
            res.status(201).json({text: 'product was created'})
        } else {
            res.status(400).json({text: 'something went wrong'})
        }
    }

})

// remove product
ROUTE.route('/:articleNumber').delete(async (req, res) => {
    if(!req.params.articleNumber) {
        req.status
    }

    const item = await productSchema.findById(req.params.articleNumber)
    if (item) {
        await productSchema.remove(item)
        res.status(200).json({text: 'product was removed'})
    } else {
        res.status(404).json({text: "that product does not exist"})
    }
})

// update product
ROUTE.route('/:articleNumber').patch(async (req, res) => {
    console.log("Updating a single product")
    
    try {
        const id = req.params.articleNumber
        const updates = req.body
        
        const result = await productSchema.updateOne({id}, {$set: {updates}})
        if (result) {
            
        }
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = ROUTE