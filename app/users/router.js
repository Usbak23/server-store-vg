const express = require('express');
const router = express.Router();
const { viewSignin, actionSignin } = require('./controller')

/* GET home page. */
router.get('/', viewSignin);
router.post('/', actionSignin);


module.exports = router;
