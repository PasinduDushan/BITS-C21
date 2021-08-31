const express = require('express')
const app = express()
const mongoose = require('mongoose')
const movie_data = require('./models/movies.js')
const parser = require('body-parser')
const config = require('./config.json')

app.set('view engine', 'ejs')
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.get('/', async(req, res) => {
   const data = await movie_data.find({})
   await console.log(data)
    res.render('index', {
            data: data
    })
})

app.post('/addmovie/success', async(req, res) => {
        await movie_data.findOneAndUpdate(
                {
                        name: req.body.name
                },
                {
                        image: req.body.image,
                        description: req.body.description,
                        ranking: req.body.ranking
                },
                {
                        upsert: true
                }
        )
        res.redirect('/')
})

app.listen(config.PORT, async(err) => {
        await mongoose.connect(config.mongo_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
        }).then(console.log('[EVENT] Successfully connected to mongodb'))
        if(err) console.error(err)
        console.log(`[EVENT] Listening on ${config.PORT}`)
})