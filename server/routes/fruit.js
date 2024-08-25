var express = require('express');
var router = express.Router();
const { fruitController } = require('../controllers/fruitController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/:fruitId',(req, res) => fruitController.getFruit(req, res));

module.exports = router;
