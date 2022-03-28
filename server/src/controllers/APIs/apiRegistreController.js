const { User, Operation, OperationRegistre, OperationsCategory } = require("../../database/models");

module.exports = {
    readAllRegistres : (req, res) => {
        OperationRegistre.findAll()
            .then(confirm => {
                let response;

                if(confirm){
                    response = {
                        meta : {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3000/api/operations/registres",
                            msg: "Operación exitosa."
                        },
                        data: confirm
                    }
                } else {
                    response = {
                        meta : {
                            status: 400,
                            total: confirm.length,
                            url: "http://localhost:3000/api/operations/registres",
                            msg: "Ocurrió un error."
                        },
                        data: confirm
                    }
                }

                res.json(response);
            })
            .catch(err => res.json(err))
    }, 
    readOneRegistre: (req, res) => {
        OperationRegistre.findByPk(+req.params.id)
            .then(confirm => {
                let response;

                if(confirm) {
                    response = {
                        meta : {
                            status: 200,
                            total: confirm.length,
                            url: "http://localhost:3000/api/operations/registres/"+req.params.id,
                            msg: "Operación exitosa."
                        },
                        data: confirm.length
                    }
                } else {
                    response = {
                        meta : {
                            status: 400,
                            total: confirm.length,
                            url: "http://localhost:3000/api/operations/registres/"+req.params.id,
                            msg: "Ocurrió un error."
                        },
                        data: confirm.length
                    }

                }

                res.json(response);
            })
            .catch(err => res.json(err))
    }
}