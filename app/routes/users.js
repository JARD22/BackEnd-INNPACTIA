const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {clientList,newUser, newClient}= require('../controllers/users');
const validarToken = require('../helpers/validateJWT');
const {validate} = require('../middlewares/validate')

router.post('/new',[
                    check('name','name is required').not().isEmpty(),
                    check('email','name is required').not().isEmpty(),
                    check('gender','name is required').not().isEmpty(),
                    validate,
                    validarToken
                    ],newUser);


                    
router.get('/:limit/:offset',validarToken,clientList);


router.post('/new-client',[
                            check('name', 'name is required').not().isEmpty(),
                            check('email', 'email is required').not().isEmpty(),
                            check('gender','gender is required').not().isEmpty(),
                            check('address','address is required').not().isEmpty(),
                            check('phoneNumber','phoneNumber is required').not().isEmpty(),
                            validate,
                            validarToken
                            
],newClient)


module.exports = router
