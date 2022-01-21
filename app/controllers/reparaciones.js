
const pool = require('../../config/mysql');
const httpError = require('../helpers/handleError');
const {httpResponse} = require('../helpers/handleResponse');
const handleResponse = require('../helpers/handleResponse')


const list= async(req,res)=>{


let {limit,offset}= req.params;

    try {
        
        await pool.query('CALL SP_LISTADO_REPARACIONES(?,?)',
                        [limit,offset], (error,results)=>{
                         
                         if (error) {
                            return handleResponse.httpResponseSQLError(res,error.sqlMessage)
                             
                         }else{
                             return httpResponse(res,results[0])
                         }
                         })
        
    } catch (error) {
        return httpError(res,error)
    }
}


const newRepair =async(req,res)=>{

let user = req.email

    try {
        let {phoneID,description,initDate}=req.body

        await pool.query('CALL SP_NUEVA_REPARACION(?,?,?,?)',
                    [phoneID,description,initDate,user],(error,results)=>{

                        if (error) {
                            return handleResponse.httpResponseSQLError(res,error.sqlMessage);
                        }else{
                            return handleResponse.httResponseOk(res,'Reparación registrada');
                        }
                    })


    } catch (error) {
        return httpError(res, error)
    }
}


const repairPPhone= async(req,res)=>{


    try {
    
        let {phoneID} = req.params;


        await pool.query('CALL SP_REPARACIONES_TELEFONO(?)',[phoneID],
                    (error,results)=>{

                        if (error) {
                            return handleResponse.httpResponseSQLError(res,error.sqlMessage);
                        }else{
                            return httpResponse(res,results[0]);
                        }
        })
        
    } catch (error) {
        return httpError(res,error)
    }
}
module.exports = {
    list,newRepair,repairPPhone
}