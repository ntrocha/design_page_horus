var express = require('express');
var router = express.Router();
const controller = require("../controllers/controller");
/* GET home page. */
router.get('/', controller.index);
router.get('/read', controller.indexRead);
router.get('/read2', controller.indexRead2);
router.get('/read3', controller.indexRead3);
module.exports = router;

