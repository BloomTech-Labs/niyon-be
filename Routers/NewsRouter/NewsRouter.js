const express = require('express');
const axios = require('axios')
const moment = require('moment')
const restricted = require('../../Middleware/restricted')

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

module.exports = router