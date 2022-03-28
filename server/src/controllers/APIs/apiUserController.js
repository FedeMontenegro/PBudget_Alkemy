const { User, Operation, OperationRegistre, OperationsCategory } = require("../../database/models");
const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        console.log("CREATEUSER", req.body)
        const {
            email,
            user_name,
            password,
            rePass,
            checkTerms
        } = req.body;
        
        if (checkTerms && password === rePass) {
            //Creando nuevo usuario
            let newUser = {
                ...req.body,
                password: bcryptjs.hashSync(password, 10),
                rol: "ROL_USER"
            }
            //registrando usuario en la db
            User.create(newUser)
                .then(confirm => {
                    console.log(confirm)
                    let response;
                    if (confirm) {
                        response = {
                            meta: {
                                status: 200,
                                total: confirm.length,
                                url: "http://localhost:3000/api/users/register/new",
                                msg: "Successfull operation."
                            },
                            data: confirm
                        }
                    } else {
                        response = {
                            meta: {
                                status: 500,
                                total: confirm.length,
                                url: "http://localhost:3000/api/users/register/new",
                                msg: "An error occurred. Try again."
                            },
                            data: confirm
                        }
                    }
                    res.json(response);
                })
                .catch(err => res.send(err));
        } else {
            res.json({
                meta: {
                    status: 204,
                    msg: "Passwords do not match. Retry."
                }
            })
        }

    },
    readOneUser: (req, res) => {
        console.log("readOneUser nena")
        User.findOne({
            where: {
                [Op.or]: [{ email: req.params.user }, { user_name: req.params.user }]
            }
        })
            .then(confirm => {
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3000/api/users/:user",
                            msg: "Successfull operation."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3000/api/users/:user",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }

                res.json(response)
            })
            .catch(err => res.json(err))
    },
    readAllUser: (req, res) => {
        User.findAll()
            .then(confirm => {
                let response;
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3000/api/users/all",
                            msg: "Successfull operation"
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3000/api/users/all",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    updateUser: (req, res) => {

        const {
            name,
            email,
            previousPass,
            pass,
            rePass,
            balance,
            rol
        } = req.body;

        let userFindOne = User.findOne({
            where: {
                id: req.params.id
            }
        })

        let userUpdate = User.update({
            user_name: name ? name : userFindOne.name,
            email: email ? email : userFindOne.email,
            password: pass ? bcryptjs.hashSync(pass, 10) : userFindOne.password,
            balance: balance ? balance : "",
            rol: rol ? rol : ""
        }, {
            where: {
                id: req.params.id
            }
        })

        Promise.all([userFindOne, userUpdate])
            .then((userFindOne, userUpdate) => {
                
                let response;
                if (userFindOne[0] != null) {
                    response = {
                        meta: {
                            status: 200,
                            total: userFindOne.length,
                            url: "http://localhost:3000/api/users/:user/update",
                            msg: "Successfull operation."
                        },
                        data: userFindOne
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: userFindOne.length,
                            url: "http://localhost:3000/api/users/:user/update",
                            msg: "An error occurred."
                        },
                        data: userFindOne
                    }
                }
                res.json(response);
            })
            .catch(err => res.json(err))
    },
    deleteUser: (req, res) => {
        User.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(confirm => {
                let response;
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3000/api/users/:id/destroy",
                            msg: "Successfull operation."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3000/api/users/:id/destroy",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    getLogin: (req, res) => {
        res.render("api/users/login");
    },
    processLogin: (req, res) => {
        console.log("processlogin")
        
        User.findAll({
            where: {
                [Op.or]: [{ email: req.body.user }, { user_name: req.body.user }]
            },
        })
            .then(confirm => {
                let response;
                //Validando contraseña
                if (confirm && bcryptjs.compareSync(req.body.password, confirm[0].password)) {
                    //Creando sesion
                    let user = { ...confirm[0].dataValues }
                    user.check = req.body.check;
                    delete user.password;
                    
                        jwt.sign({ user }, "secretKey", { expiresIn: "6000s" }, (err, token) => {
                            if (err) {
                                res.sendStatus(403)
                            } else {
    
                                /* req.session.token = token;
     
                                res.cookie(
                                    "tokenSession", 
                                    token, 
                                    {
                                        maxAge: 36000,
                                        httpOnly: true
                                    }
                                ) */
    
                                response = {
                                    meta: {
                                        status: 200,
                                        total: user && true,
                                        url: "http://localhost:3000/api/users/login/session",
                                        msg: "Successfull operation."
                                    },
                                    token
                                }
                                
                                res.json(response)
                            }
                        })

                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: null,
                            url: "http://localhost:3000/api/users/login/session",
                            msg: "Passwords do not match. Retry."
                        }
                    }
                    console.log("500 señora")
                    res.json(response);
                }
            })
            .catch(err => res.json(err))


    },
    processVerifyToken: (req, res) => {
        try {

            jwt.verify(req.token, "secretKey", (error, authData) => {
                if (error) {
                    console.log("Error checking", error)
                    res.json({
                        status: 300,
                        msg: "Session expired.",
                        authData: authData && authData
                    })
                } else {
                    res.json({
                        status: 200,
                        msg: "Verify successfully.",
                        authData
                    })
                }
            })
        } catch (error) {
            console.log("Error: " + error)
        }
    },
    refreshToken : (req, res) => {
        console.log("REFRESHTOKEN")
        console.log(req.body)
        let {user} = req.body
        let response = {};
        jwt.sign({user}, "secretKey", { expiresIn: "6000s" }, (err, token) => {
            if (err) {

                let response = {
                    meta: {
                        status: 403,
                        url: "http://localhost:3001/api/users/refresh",
                        msg: "An error occurred. Try again."
                    },
                    token: false
                }
                console.log(err)
                res.json(response)
            } else {

                /* req.session.token = token;

                res.cookie(
                    "tokenSession", 
                    token, 
                    {
                        maxAge: 36000,
                        httpOnly: true
                    }
                ) */

                let response = {
                    meta: {
                        status: 200,
                        total: req.body.user && true,
                        url: "http://localhost:3001/api/users/refresh",
                        msg: "Successfull operation."
                    },
                    token
                }
                
                res.json(response)
            }
        })
    },
    processLogOut: (req, res) => {
        console.log(req)
        let response;
        if (req.token) {
            //Eliminando sesion y cookies
            /* req.session.destroy();
            
            if (req.cookies["tokenSession"]) {
                console.log("req cookies")
                res.cookie("tokenSession", "", { maxAge: -Date.now() })
                delete req.cookies["tokenSession"]
                delete req.token
                delete req.headers.cookie

                let ts = req.rawHeaders.find(element => element.includes("tokenSession"))
                delete req.rawHeaders[req.rawHeaders.indexOf(ts)]
            } */

            delete req.token

            response = {
                meta: {
                    status: 200,
                    url: "http://localhost:3001/api/users/logout",
                    msg: "Session finished successfully."
                },
                data: true
            }
        } else {
            response = {
                meta: {
                    status: 500,
                    url: "http://localhost:3001/api/users/logout",
                    msg: "An error occurred."
                },
                data: false
            }

        }
        res.json(response)

    },
    getRegister: (req, res) => {
        res.render("api/users/register")
    }
}