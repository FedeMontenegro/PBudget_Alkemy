const express = require("express");
const router = express.Router();

const {
    createOperation,
    readAllOperations,
    readOperationsByUser,
    updateOperation,
    deleteOperation,
    getRankingOperations,
    getOneOperation,
    createRegistreOperation,
    updateRegistreOperation,
    destroyRegistreOperation
} = require("../../controllers/APIs/apiOperationController");

router.post("/", readAllOperations);
router.post("/list", readOperationsByUser);
router.post("/new", createOperation);
router.put("/:id/edit", updateOperation);
router.delete("/:id/destroy", deleteOperation);
router.post("/ranking/:id", getRankingOperations);
router.post("/:id", getOneOperation);

router.post("/registres/new", createRegistreOperation);
router.put("/registres/:op/edit", updateRegistreOperation);
router.delete("registres/:id/destroy", destroyRegistreOperation);

module.exports = router;