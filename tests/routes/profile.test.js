const supertest = require('supertest')
const server = require('../../server')
const db = require('../../db/config')

test('profile', async ()=> {
   const res = await supertest(server)
   .post('/profilePackage')
   test()
})


