const express = require('express');
const router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionDelete, actionStatus } = require('./controller');
const multer = require('multer')
const os = require('os')

/* GET home page. */
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', multer({ dest: os.tmpdir() }).single('image'), actionCreate);
router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', actionEdit );
router.delete('/delete/:id', actionDelete)
router.put('/status/:id', actionStatus)

module.exports = router;
