const express = require("express");
const router = express.Router();

const {
    createCategory,
    readAllCategory,
    readCategoriesByUserId,
    readOneCategory,
    updateCategory,
    deleteCategory
} = require("../../controllers/APIs/apiCategoryController");

router.post("/new", createCategory);
router.post("/", readAllCategory);
router.post("/user/:id", readCategoriesByUserId);
router.post("/:id", readOneCategory);
router.put("/:id/edit", updateCategory);
router.delete("/:id/destroy", deleteCategory);

module.exports = router;