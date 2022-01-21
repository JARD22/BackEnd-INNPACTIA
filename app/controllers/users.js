const { response } = require("express");
const httpError=require('../helpers/handleError');
const pool = require('../../config/mysql');

const encryptPassword = require('../helpers/passwordEncypter');

const { httpResponseSQLError, httResponseOk } = require("../helpers/handleResponse");



const clientList = async(req,res=response)=>{

    try {
        
        let{limit,offset}= req.params;

         await pool.query('CALL SP_CLIENTES(10,0)', (error, results)=> {
         
          return res.status(200).json({
              ok:true,
              clients:results[0]
          })
          });           

} catch (error) {
   return httpError(res,error);
}   
}

const newUser =async(req,res=response)=>{
    
    try {
        let user = req.email
        let {name,email,gender,password} = req.body
       

        let passwordEncrypt = await encryptPassword(password)

        await pool.query('CALL SP_NUEVO_USUARIO(?,?,?,?,?)',[name,email,passwordEncrypt,gender,user], (error, results)=> {
         
            if (error) {
                return httpResponseSQLError(res,error.sqlMessage);
            }else{

                return httResponseOk(res,'Usuario registrado')
            }

            });   

        
    } catch (error) {
        return httpError(res,error);
    }

}

const newClient = async(req,res=response)=>{

    let user =  req.email;
    let {name,email,gender,address,phoneNumber}= req.body;

   
    try {
        
      await  pool.query('CALL SP_NUEVO_CLIENTE(?,?,?,?,?,?)',
                    [name,email,gender,address,phoneNumber,user],(error,results)=>{

                        if (error) {
                           return res.status(500).json({
                               ok:false,
                               msg:error.sqlMessage
                           });
                        }else{
                            return res.status(200).json({
                                ok:true,
                                msg:'usuario registrado'
                            });
                        }

                    });


    } catch (error) {
        httpError(res,error)
    }
}

module.exports ={clientList,newUser,newClient}






