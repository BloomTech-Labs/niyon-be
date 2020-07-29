const express = require('express');
const axios = require('axios')
const moment = require('moment')
const restricted = require('../../Middleware/restricted')
const { userHelper } = require('../../models/classHelpers')
const { axiosCall, formatDevArticles } = require('../../utils/helperFunctions')

const router = express.Router()

router.get('/', async (req, res, next) => {
       try {
    let data = []
       const url = 'https://dev.to/api/articles'
       // axios call lives in the utils folder in helperFunctions.js
       await axiosCall(url, data)
       if (!data) {
           return res.status(500).json({
               errorMessage: 'Oops, looks like something got crossed up, please try your request again'
           })
       } else {
           async function format(arr) {
               // formatDevArticles lives in the utils folder in helperFunctions.js
               return await formatDevArticles(arr)
           }

           const getData = async () => {
               return await Promise.all(data.map(arr => format(arr)))
           }
           getData().then(data => {
               return res.status(200).json(data)
           })
       }
   } catch (e) {
       console.log(e)
       next()
   }
});
/*
    this route is not currently being used in the Niyon app
    by using a 'topic' in the url such as "java" will only
    return articles relating the "java" in the same format
    as the above route
*/
router.get('/:topic', async (req, res, next) => {
   try {

    const { topic } = req.params
    let data = []
   const url = `https://dev.to/api/articles?tag=${topic}`
       await axiosCall(url, data)
       if (!data) {
           return res.status(404).json({
               message: `Sorry we could not find any articles with ${topic}`
           })
       } else {
            async function format(arr) {
               return await formatDevArticles(arr)
           }

           const getData = async () => {
               return await Promise.all(data.map(arr => format(arr)))
           }
           getData().then(data => {
               return res.status(200).json(data)
           })
       }
   } catch (e) {
       console.log(e)
       next()
   }
});

/*
    this route is not currently used in the app or fully fleshed out
    the idea behind this route was to allow mentors to write articles
    for dev.to's blog under the organization of Niyon so that their
    name will be show as well as the Niyon logo, need to read more into
    the docs for dev.to's api
*/
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