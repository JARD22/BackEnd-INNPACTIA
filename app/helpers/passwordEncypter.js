const bcrypt = require('bcryptjs');



const salt = bcrypt.genSaltSync(10);


const encryptPassword = (password)=>{
    
    return new Promise((resolve,reject)=>{

        const hash = bcrypt.hashSync(password, salt);
        resolve(hash);
    })


}

module.exports =encryptPassword;