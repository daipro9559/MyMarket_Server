'use strict'
const addressService = require('../services/addressService')
const { to, ReE, ReS } = require('../services/utilService')
const status = require('http-status')

const getAllProvince = async (req,res)=>{
    let err,provinces
    [err,provinces] = await to(addressService.getAllProvince())
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,provinces,status.OK,"get provinces completed")
}
module.exports.getAllProvince = getAllProvince

const getAllDistrict = async (req,res) =>{
    let err,districts
    var province_id = parseInt(req.params.provinceID)
        if (!province_id){
        return ReE(res,"no param provinceID",status.NOT_FOUND)
    }
    [err,districts] = await to(addressService.getAllDistrict(province_id))
    if (err){
        return ReE(res,err,status.NOT_FOUND)
    }
    return ReS(res,districts,status.OK,"get districts completed")
}
module.exports.getAllDistrict = getAllDistrict
