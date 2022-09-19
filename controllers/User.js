const { User } = require('../models/user');
const { tokenGenerator } = require('../helpers/jwt');
const { decryptPassword } = require('../helpers/bcrypt');
const log = require('../helpers/log');
const response = require('../helpers/response');

class UserController {
    static async register(req, res, next) {
        try {
            let obj = {};
            const { username, email, password } = req.body;
            if (username) obj.username = username;
            if (email) obj.email = email;
            if (password) obj.password = password;

            let result = await User.create(obj);
            const access_token = tokenGenerator(result);

            const user = { result, access_token }

            log.info(req.clientIp + ' - ' + 'Success Access Api register - Success Register');
            res.status(201).json(response.successRes("Successfully registered!", user));

        } catch (err) {
            log.error(err + " - Api register")
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username) next({ message: "Please enter your username" });
            if (!password) next({ message: "Please enter your password!" });

            const find = await User.findOne({ username });
            if (!find) next({ message: "Account not found!" });

            if (decryptPassword(password, find.password)) {
                const access_token = tokenGenerator(find);
                const user = {
                    username: find.username,
                    email: find.email,
                    access_token
                }

                log.info(req.clientIp + ' - ' + 'Success Access Api login - Success login');
                res.status(200).json(response.successRes("Successfully login!", user));

            } else {
                next({ message: "Password incorrect!" })
            }
        } catch (err) {
            log.error(err + " - Api login")
            next(err);
        }
    }

    static async getUser(req, res, next) {
        try {
            let user = await User
                .find()
                .select("-password")

            log.info(req.clientIp + ' - ' + 'Success Access Api getUser');
            res.status(200).json(response.successRes("Successfully showing all users!", user));

        } catch (err) {
            log.error(err + " - Api getUser")
            next(err);
        }
    }

    static async detailUser(req, res, next) {
        try {
            const { username } = req.userData;
            const user = await User
                .findOne({ username })
                .select('-password')

            log.info(req.clientIp + ' - ' + 'Success Access Api detailUser');
            res.status(200).json(response.successRes("Successfully showing user!", user));

        } catch (err) {
            log.error(err + " - Api detailUser")
            next(err);
        }
    }
}
module.exports = UserController;
