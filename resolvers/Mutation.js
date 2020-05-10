const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(parent, args, context) {
    //grabbing the user input and storing it in newUser
    const newUser = args.input;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const { password, ...user} = await context.helpers.user.createUser({
        ...newUser, password: hashedPassword
    })

    //signing the token with the new user id and returning a token and created user data
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
    return {token, user}
}

async function login(_, {input}, context) {
    //grabbing user input and storing it in user
    const user = input;
    //using a helper model to find the entered user by email
    const {password, ...authUser} = await context.helpers.user.findBy({
        email: user.email
    })
        //checking to validate the entered email is registered
        if(!authUser) {
            throw new Error(`${user.email} does not exist`)
        }
        //once the user email is validated, checking the entered password against the hashed stored password
    const validate = await bcrypt.compare(user.password, password);
        if(!validate) {
            throw new Error('Invalid password')
        }

        //creating a payload to return based on the info we got back from the
        //helper model from the users entered email
        const payload = {
            id: authUser.id,
            email: authUser.email,
            user_type: authUser.user_type,
            password: user.password
        }
        //signing the token with the payload and providing the JWT_SECRET to send token
    const token = jwt.sign(payload, 'process.env.JWT_SECRET')
    //returning a token and the nonNullable user data back to client
    return {
        token: token,
        user: payload
    }
}

module.exports = {
    register,
    login
}