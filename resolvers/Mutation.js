const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function register(parent, args, context) {
    const newUser = args.input;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const { password, ...user} = await context.helpers.user.createUser({
        ...newUser, password: hashedPassword
    })

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
    return {token, user}
}

async function login(parent, args, context) {
    const user = args.input;
    const authUser = await context.helpers.user.findBy({
        email: user.email
    })
        if(!authUser) {
            throw new Error(`${user.email} does not exist`)
        }

    const validate = await bcrypt.compare(user.password, authUser.password);
        if(!validate) {
            throw new Error('Invalid password')
        }

        const payload = {
            id: authUser.id,
            email: authUser.email,
            user_type: authUser.user_type,
            password: authUser.password
        };
        console.log(authUser.user_type)

    const token = jwt.sign(payload, 'process.env.JWT_SECRET')
    return { token, payload }
}

module.exports = {
    register,
    login
}