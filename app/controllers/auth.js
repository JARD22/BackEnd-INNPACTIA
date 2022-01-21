const bcrypt = require('bcryptjs/dist/bcrypt');
const pool = require('../../config/mysql');
const httpError=require('../helpers/handleError');
const generateJWT = require('../middlewares/jwt')

const login = async(req,res)=>{

    try {
        let {email, password}=req.body;
        
        await pool.query('CALL SP_LOGIN(?)',[email], async(error, results)=> {
                     
            if (error) {
                return res.status(401).json({
                    ok:false,
                    msg:error.sqlMessage
                });
            }else{

             

            let user = results[0]

            let validPass= bcrypt.compareSync(password, user[0].CONTRASENA);

                if (validPass) {
                    
                    const token = await generateJWT(user[0].USUARIO)

                    return res.status(200).json({
                        ok:true,
                        token
                    })
                }else{
                    return res.status(400).json({
                        ok:false,
                        msg:'Usuario o contraseña no válido'
                    })
                }
            }       
  
            }); 
    } catch (error) {
        return httpError(res,error)
    }
}

const renew = async(req,res)=>{

    let email = req.email

    try {
        
        await pool.query('CALL SP_LOGIN(?)',[email], async(error, results)=> {


            let user = results[0];
            

            const token = await generateJWT(user[0].USUARIO)

            return res.status(200).json({
                ok:true,
                user:user[0].USUARIO,
                token
            })
        });

    } catch (error) {
        
    }


}


module.exports = {
    login,renew
}