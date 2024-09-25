const express = require("express");
const { addProduct, GetProduct, deletedProduct, updateData, singleProduct } = require("../controller/productController");

const router = express.Router();

router.post("/AddProduct",addProduct);

router.get("/GetProduct",GetProduct);

router.delete("/DeleteProduct/:id",deletedProduct)

router.put("/UpdateData/:id",updateData)

router.get("/SingleProduct/:id",singleProduct);

module.exports = router;