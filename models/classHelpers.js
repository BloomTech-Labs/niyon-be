const db = require('../db/config');
const bcrypt = require('bcrypt')

class helperCreator {
    constructor(table) {
        this.table = table
    }
    getAll() {
        return db(this.table)
    }
    async findBy(filter) {
        try {
            return db(this.table)
                .select('*')
                .where(filter)
                .first();
        } catch (e) {
            console.log(e);
        }
    }
    async findById(id) {
        await db(this.table)
            .select('*')
            .where('id', id)
            .first();
    }
    async update(id, data) {
        try {
            return await db(this.table).update(data).where({id: id})
        } catch (e) {
            console.log(e)
        }
    }
}

class techHelperCreator extends helperCreator {
    constructor(table, joinTable, interTable) {
        super(table);
        this.joinTable = joinTable;
        this.interTable = interTable;
    }
    async updateTech(userID, techID) {
        return db(this.interTable).insert({user_id: userID, tech_id: techID})
    }
    async userTech(id) {
        return db(this.interTable)
            .join(this.joinTable, this.joinTable['id'], this.interTable['user_id'])
            .join(this.table, this.table['id'], this.interTable['tech_id'])
            .where(this.joinTable['id'], id)
            .select(this.table['id'],this.table['name'], this.table['type'])
    }
}

class userHelperCreator extends helperCreator {
    constructor(table) {
        super(table);
    }
    async createUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        await db(this.table).insert(user);
        return this.registerReturn(user.email)
    }
    async registerReturn(email) {
        return db(this.table)
            .select('id', 'email', 'user_type')
            .where('email', email)
            .first();
    }
}

const userHelper = new userHelperCreator('user');
const jobHelper = new helperCreator('job_title');
const locationHelper = new helperCreator('location');
const techHelper = new techHelperCreator('tech', 'user', 'user_tech')

module.exports = {
    userHelper
}