const express = require('express');
const router = express.Router();
const plantsCtrl = require('../../controllers/api/plants')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/details/:id', plantsCtrl.detail)
router.post('/search/:term', plantsCtrl.search)

router.post('/', ensureLoggedIn, plantsCtrl.addPlant)
router.get('/', ensureLoggedIn, plantsCtrl.yourPlants)
router.put('/:id', ensureLoggedIn, plantsCtrl.recordWatering)
router.delete('/:id', ensureLoggedIn, plantsCtrl.deletePlant)

module.exports = router;