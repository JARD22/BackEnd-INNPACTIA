const httpError = (res,err)=>{
    res.status(500).json({
        ok:false,
        msg:'Algo ha ido mal!'
    })
}

module.exports = httpError