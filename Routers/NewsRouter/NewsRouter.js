const express = require('express');
const axios = require('axios')
const moment = require('moment')
const restricted = require('../../Middleware/restricted')
const { userHelper } = require('../../models/classHelpers')

const router = express.Router()

router.get('/', restricted(), async (req, res, next) => {
       try {
    let data = []
       const url = 'https://dev.to/api/articles'
       await axios.get(url)
           .then(res => {
               res.data.map(arr => {
                   data.push(arr)
               })
           })
           .catch(err => {
               console.log(err)
           })
       if (!data) {
           return res.status(500).json({
               errorMessage: 'Oops, looks like something got crossed up, please try your request again'
           })
       } else {
           return res.status(200).json(data)
       }
   } catch (e) {
       console.log(e)
       next()
   }
});

router.get('/:topic', restricted(), async (req, res, next) => {
   try {

    const { topic } = req.params
    let data = []
   const url = `https://dev.to/api/articles?tag=${topic}`
       await axios.get(url)
           .then(res => {
               res.data.map(arr => {
                   data.push(arr)
               })
           })
           .catch(err => {
               console.log(err)
           })
       if (!data) {
           return res.status(404).json({
               message: `Sorry we could not find any articles with ${topic}`
           })
       } else {
           return res.status(200).json(data)
       }
   } catch (e) {
       console.log(e)
       next()
   }
});

router.post('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await userHelper.findById(id)
        const data = {
            title: 'Hello World, from the mentors of Niyon',
            body_markdown: "The mentors of Niyon will share their experience and knowledge through articles posted through Dev.to. We thank the devs here for creating an amazing platform where developers can come together",
            published: true,
            tags: ['javascript', 'ruby'],
            series: null,
            description: 'This is the first create a post from our api',
            author: user.first_name + user.last_name
        }
        const url = `https://dev.to/api/articles`
        const config = {
            headers: {
                api_key: process.env.DEV_API_KEY
            }
        }

        await axios.post(url, data, config)
           .then(res => {
               console.log(res)
               console.log('article posted')
           })
           .catch(err => {
               console.log(err)
           })
    } catch (e) {
        console.log(e)
        next()
    }
});

module.exports = router