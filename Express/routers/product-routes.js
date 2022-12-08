const express = require("express");
const router = express.Router();
const productController = require('../controllers/product-controller')
const auth_middleware = require('../middlewares/auth_middleware')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname )
    }
  })
const upload = multer({ storage: storage })

router.post('/',upload.single('myFile'), productController.createProduct) //, auth_middleware.protect
router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)

module.exports = router;
