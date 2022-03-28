const { User, Operation, OperationRegistre, OperationsCategory } = require("../../database/models");
const sequelize = require("sequelize");

module.exports = {
    createOperation: (req, res) => {

        const {
            name,
            type,
            category_id,
            amount,
            user_id,
            created_at
        } = req.body;
        //Creating operation
        Operation.create({
            operation_category_id: category_id,
            type,
            user_id,
            name,
            created_at: created_at,
            amount
        })
            .then(confirm => {

                let response;
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/new",
                            msg: "Operation successfully."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/new",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    createRegistreOperation: (req, res) => {
        
        let {
            user_id,
            operation_id,
            name,
            category_id,
            detail,
            created_at
        } = req.body;

        //Creando registro de operación
        OperationRegistre
            .create({
                user_id,
                operation_id,
                name,
                category: category_id,
                detail,
                created_at
            })
            .then(confirm => {
                let response;
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/registres/new",
                            msg: "Operation successfully."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/registres/new",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => console.log(err))
    },
    updateRegistreOperation: (req, res) => {

        OperationRegistre.update({
            name: req.body.name ? req.body.name : "",
            category: req.body.category_id ? req.body.category_id : "",
            detail: req.body.detail ? req.body.detail : ""
        }, {
            where: {
                operation_id: +req.params.op
            }
        })
            .then(confirm => {
                let response;

                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/registres/" + req.body.operation_id + "/edit",
                            msg: "Operation successfully."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/registres/" + req.body.operation_id + "/edit",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => console.log(err))
    },
    destroyRegistreOperation: (req, res) => {
        OperationRegistre
            .destroy({
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
                            url: "http://localhost:3001/api/operations/registres/" + req.params.id + "/destroy",
                            msg: "Operation successfully."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/registres/" + req.params.id + "/destroy",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => console.log(err))
    },
    readOperationsByUser: (req, res) => {

        console.log("READOPERATIONBYUSER")
        Operation.findAll({
            where: {
                user_id: req.body.id
            }
        })
            .then(confirm => {

                let response;
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/list",
                            msg: "Operation successfully"
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/list",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    readAllOperations: (req, res) => {
        Operation.findAll({
            include: [
                { association: "user" },
                { association: "category" }
            ]
        })
            .then(confirm => {

                let response;
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/",
                            msg: "Operation successfully"
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    updateOperation: (req, res) => {
        console.log("UPDATEOPERATION")
        console.log(req.body)
        const {
            name,
            type,
            category,
            amount
        } = req.body;

        Operation.update({
            name: name ? name : "",
            operation_category_id: category ? category : "",
            type: type ? type : "",
            updated_at: new Date(),
            amount: amount ? amount : ""
        }, {
            where: {
                id: +req.params.id
            }
        })
            .then(confirm => {
                console.log(confirm)
                let response;

                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/" + req.params.id + "/edit",
                            msg: "Operation successfully"
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/" + req.params.id + "/edit",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }
                }
                res.json(response)
            })
    },
    deleteOperation: (req, res) => {
        console.log("DELETEOPERATION")
        //Eliminando operacion
        Operation
            .destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(confirm => {
                console.log(confirm)
                let response;

                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/" + req.params.id + "/destroy",
                            msg: "Operation successfully."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            totals: confirm.length,
                            url: "http://localhost:3001/api/operations/" + req.params.id + "/destroy",
                            msg: "An error occurred."
                        },
                        data: confirm
                    }

                }
                res.json(response)
            })
            .catch(err => res.json(err))
    },
    getRankingOperations: (req, res) => {
        Operation.findAll({
            where: {
                user_id: +req.params.id
            },
            order: [["created_at", "DESC"]],
            limit: 10/* ,
            offset: 1 */
        })
            .then(confirm => {

                let results;
                if (confirm) {
                    results = {
                        meta: {
                            status: 200,
                            totals: confirm.length,
                            url: "http://localhost:3001/api/operations/ranking/" + req.params.id,
                            msg: "Operation successfully."
                        },
                        data: confirm
                    }

                } else {
                    results = {
                        meta: {
                            status: 500,
                            totals: confirm.length,
                            url: "http://localhost:3001/api/operations/ranking/" + req.params.id,
                            msg: "An error occurred."
                        },
                        data: confirm
                    }

                }

                res.json(results)
            })
            .catch(err => res.json(err))
    },
    getOneOperation: (req, res) => {
        Operation.findByPk(+req.params.id)
            .then(confirm => {
                if (confirm) {
                    response = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/" + req.params.id,
                            msg: "Operation successfully"
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta: {
                            status: 500,
                            total: confirm.length,
                            url: "http://localhost:3001/api/operations/" + req.params.id,
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
