const { response } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');

const pathRouter  = `${__dirname}`;

const removeExtension = (fileName)=>{
    return fileName.split('.').shift();
}
console.log('==========RUTAS DISPONIBLES==========');
fs.readdirSync(pathRouter).filter((file)=>{

    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);

    if (!skip) {
        router.use(`/${fileWithOutExt}`,require(`./${fileWithOutExt}`))
        console.log(removeExtension(`/${fileWithOutExt}`));
    }
})
console.log('====================================');

router.get('*',(req,res=response)=>{
    return res.status(404).json({
        ok:false,
        msg:"Not Found"
    })
})


module.exports = router