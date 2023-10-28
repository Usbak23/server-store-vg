const express = require('express');
const router = express.Router();
const { viewSignin, actionSignin, actionLogout } = require('./controller')

/* GET home page. */
router.get('/', viewSignin);
router.post('/', actionSignin);
router.get('/logout', actionLogout);



module.exports = router;
