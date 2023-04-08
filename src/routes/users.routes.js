const { Router } = require('express');
const router = Router();

const { renderSignUpForm, signUp, renderSignInForm, signin, logout } = require('../controllers/users.controller')

router.get('/signup', renderSignUpForm);

router.post('/signup', signUp);

router.get('/signin', renderSignInForm);

router.post('/signin', signin);

router.get('/logout', logout);

module.exports = router;