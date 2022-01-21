const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {login,renew}= require('../controllers/auth');
const {validate} = require('../middlewares/validate');
const validarToken =require('../helpers/validateJWT')
const {newPhone, phoneList}= require('../controllers/phones');

router.post('/',[
                check('clientID','clientID is requied'),
                check('company','company is requied'),
                check('model','model is requied'),
                check('imei','imei is requied'),
                validate,
                validarToken,
],newPhone);


router.get('/:clientID',validarToken,phoneList)





module.exports = router;