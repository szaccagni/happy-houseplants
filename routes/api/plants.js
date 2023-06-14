const express = require('express');
const router = express.Router();
const plantsCtrl = require('../../controllers/api/plants')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/search/:term', plantsCtrl.search)

module.exports = router;