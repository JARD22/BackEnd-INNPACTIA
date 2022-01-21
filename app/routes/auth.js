const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {login,renew}= require('../controllers/auth');
const {validate} = require('../middlewares/validate');
const validarToken =require('../helpers/validateJWT')

router.post('/login',[
                        check('email','email is requiered').not().isEmpty(),
                        check('password','password is requiered').not().isEmpty(),
                        validate
                        ], login);

router.get('/renew',validarToken,renew);

module.exports= router


