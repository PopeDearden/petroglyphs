const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const { email, password, name, firstName, lastName, type, organization, secret} = req.body
        const salted_secret = bcrypt.genSaltSync(10)
        const hashed_secret = bcrypt.hashSync(secret, salted_secret)
        if (bcrypt.compareSync(secret, "$2a$10$7jfJuwyNpSGg/29S7QFIeOyBPtMcbsUr1MDMEaE1ykiv3B5PiZzg6"))
        {
            // Check to see if the user has already registered
            const user = await db.find_email(email)
            // if they have, stop the function
            if (user[0])
                return res.status(200).send({ message: 'Email already in use' })
            // Salt and hash the password
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            // Store the new user in the DB
            const userId = await db.add_user({ email, name })
            db.add_hash({ user_id: userId[0].user_id, hash }).catch(err => {
                return res.sendStatus(503)
            })
            // Store the new user in sessions
            req.session.user = {
                email,
                name,
                userId: userId[0].user_id,
                isAdmin: false
            }
            // Send the session.user object to the front end
            res
                .status(201)
                .send({ message: 'Logged in', user: req.session.user, loggedIn: true })
        } else {
            res.status(200).send({message: 'You failed to provide the correct secret'})
        }
    },
    async login(req, res) {
        const db = req.app.get('db')
        const { email, password } = req.body
        // check if user exists (and the hash)
        const user = await db.find_user(email)
        // if user doesn't exist, send appropriate response
        if (!user[0]) return res.status(200).send({ message: 'Email not found' })
        // hash password and compare
        const result = bcrypt.compareSync(password, user[0].hash)
        // if hashes don't match, send appropriate response
        if (!result) return res.status(200).send({ message: 'Incorrect password' })
        // if they do match, add user to sessions
        const { name, is_admin: isAdmin, user_id: userId } = user[0]
        await db.update_timestamp([userId])
        req.session.user = { email, name, userId, isAdmin }
        // send session.user back to front end
        res
            .status(200)
            .send({ message: 'Logged in', user: req.session.user, loggedIn: true })
    },
    logout(req, res) {
        req.session.destroy()
        res.status(200).send({ message: 'Logged out', loggedIn: false })
    },
    getUser: async (req, res) => {
        res.status(200).send(req.session.user)
    },
    checkUser: async (req, res) => {
        if(req.session.user) {
            const db = req.app.get('db')
            await db.update_timestamp([req.session.userId])
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send('no')
        }
    }
}