const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
    
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            });
            if(roles.length > 0) {
                await user.setRoles(roles).then(() => {
                    res.send({
                        message: `User was registered as ${req.body.roles} successfully!`
                    });
                });
            } else {
                await user.setRoles([1]).then(() => {
                    res.send({
                        message: "User was registered successfully!"
                    });
                });
            }
        } 
    } catch(e) {
        res.failServerError(e.message);
    }
};

exports.signin = async (req, res) => {
    try {
    const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if(!user) {
            res.failNotFound('Resoure Not Found');
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        }
    } catch (e) {
        res.failServerError(e.message);
    }
};