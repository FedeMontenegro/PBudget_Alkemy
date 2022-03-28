const {User, Operation, OperationRegistre, OperationsCategory} = require("../../database/models");

module.exports = {
    createCategory: (req, res) => {
        console.log(req.body)
        OperationsCategory.create({
            name: req.body.name,
            user_id: req.body.user_id
        })
        .then(confirm => {
            console.log(confirm)
            if (confirm) {
                response = {
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/new",
                        msg: "Operation successfully."
                    },
                    data: confirm
                }
            } else {
                response = {
                    meta: {
                        status: 500,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/new",
                        msg: "An error occurred."
                    },
                    data: confirm
                }
            }
            res.json(response)
        })
        .catch(err => res.json(err))
    },
    readAllCategory: (req, res) => {
        OperationsCategory.findAll()
            .then(confirm => {
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/categories",
                            msg: "Operation successfully"
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/categories",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    readCategoriesByUserId: ( req, res ) => {
        OperationsCategory.findAll({
            where: {
                user_id : req.params.id
            }
        })
        .then(confirm => {
            if (confirm) {
                response = {
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/user/"+ req.params.id,
                        msg: "Operation successfully"
                    },
                    data: confirm
                }
            } else {
                response = {
                    meta: {
                        status: 500,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/user"+ req.params.id,
                        msg: "An error occurred."
                    },
                    data: confirm
                }
            }
            res.json(response)
        })
        .catch(err => {
            res.json(err)
        })
    },
    readOneCategory: (req, res) => {
        OperationsCategory.findByPk(+req.params.id)
            .then(confirm => {
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/categories/"+ req.params.id,
                            msg: "Operation successfully"
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/categories/"+ req.params.id,
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    updateCategory: (req, res) => {
        console.log("REQBODY", req.body)
        OperationsCategory.update({
            name: req.body.name
        }, {
            where: {
                id : +req.params.id
            }
        })
        .then(confirm => {
            console.log(confirm)
            if (confirm) {
                response = {
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/"+ req.params.id + "/edit",
                        msg: "Operation successfully"
                    },
                    data: confirm
                }
            } else {
                response = {
                    meta: {
                        status: 500,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/"+ req.params.id + "/edit",
                        msg: "An error occurred."
                    },
                    data: confirm
                }
            }
            res.json(response)
        })
        .catch(err => req.json(err))
    },
    deleteCategory: (req, res) => {
        OperationsCategory.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then(confirm => {
            if (confirm) {
                response = {
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/"+ req.params.id + "/destroy",
                        msg: "Operation successfully"
                    },
                    data: confirm
                }
            } else {
                response = {
                    meta: {
                        status: 500,
                        total: confirm.length,
                        url: "http://localhost:3001/api/categories/"+ req.params.id + "/destroy",
                        msg: "An error occurred."
                    },
                    data: confirm
                }
            }
            res.json(response)
        })
        .catch(err => res.json(err))
    }
}