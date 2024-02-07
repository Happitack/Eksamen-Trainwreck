const express = require('express');
const newsletterController = require('../controllers/newsletterController');
const router = express.Router();

router.post('/subscribe', newsletterController.validateSubscribe, newsletterController.subscribe);
router.delete('/unsubscribe', newsletterController.validateUnsubscribe, newsletterController.unsubscribe);

module.exports = router;