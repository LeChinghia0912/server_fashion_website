const express = require('express');
const router = express.Router();

const AccountController = require('../Controller/AccountController');

router.get('/showAccount', AccountController.showAccount);

router.get('/createAccount', AccountController.createAccount);

router.post('/newAccount', AccountController.newAccount);

router.get('/:id/updateAccount', AccountController.editAccount);

router.put('/:id', AccountController.updateAccount);

router.delete('/:id', AccountController.deleteAccount);

module.exports = router;
