const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

router.post('/subscribe', newsletterController.validateSubscribe, newsletterController.subscribe);
router.delete('/unsubscribe', newsletterController.validateUnsubscribe, newsletterController.unsubscribe);

module.exports = router;