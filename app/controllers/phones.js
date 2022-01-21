const { CLIENT_COMPRESS } = require('mysql/lib/protocol/constants/client');
const pool = require('../../config/mysql');
const httpError = require('../helpers/handleError');

const newPhone =async(req,res=response)=>{

let user = req.email;

    try {
    let {clientID,company,model,imei} = req.body;       
    

      await pool.query('CALL SP_NUEVO_TELEFONO_CLIENTE(?,?,?,?,?)',
                            [clientID,company,model,imei,user], (error,results)=>{

                                if (error) {
                                    return res.status(500).json({
                                        ok:false,
                                        msg:error.sqlMessage
                                    });
                                }else{
                                    return res.status(200).json({
                                        ok:true,
                                        msg:'Telefono registrado'
                                    });
                                }
                            })


    } catch (error) {
        httpError(res,error)
    }
}

const phoneList=async(req,res)=>{

    let {clientID}= req.params

    try {
        pool.query('CALL SP_LISTA_TELEFONOS_CLIENTE(?)',[clientID],(error,results)=>{

            if (error) {
                return res.status(500).json({
                    ok:false,
                    msg:error.sqlMessage
                })
            }else{
                return res.status(200).json({
                    ok:true,
                    phones:results[0]
                });
            }
        })   

    } catch (error) {
        httpError(res,error)
    }
}


module.exports ={
    newPhone,
    phoneList
}