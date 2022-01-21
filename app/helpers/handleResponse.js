const httpResponse = (res,results)=>{
    res.status(200).json({
        ok:true,
        data:results
    })
}

const httpResponseSQLError=(res,error)=>{
     res.status(500).json({
        ok:false,
        msg:error
    });
}

const httResponseOk = (res,msg)=>{
    res.status(200).json({
        ok:true,
        msg:msg
    });
}

module.exports = {httpResponse,httpResponseSQLError,httResponseOk}