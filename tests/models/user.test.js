const userModel = require('../../models/user')

test('findBy', async()=>{
   const res = await userModel
   expect(res).not.toBe('tim')
      
   })
