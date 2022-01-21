const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {login,renew}= require('../controllers/auth');
const {validate} = require('../middlewares/validate');
const validarToken =require('../helpers/validateJWT');
const { list, newRepair, repairPPhone } = require('../controllers/reparaciones');



router.get('/:offset/:limit',validarToken,list);     //todas las reparaciones por fechas y paginado

router.post('/',[
                check('phoneID','phoneID is required'),
                check('description','description is required'),
                check('initDate','initDate is required'),
                validate,
                validarToken
],newRepair);      
                                          //Nueva reparación

router.get('/:phoneID',repairPPhone); //Reparaciones de un telefono


module.exports= router