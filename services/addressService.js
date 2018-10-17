'use strict'
const {to,TE} = require('../services/utilService')
const CONFIG = require('../config/conf')
const {Address,Province,District} = require('../models')

const getAllProvince = async()=>{
    let err, provinces
    [err,provinces] = await to(Province.all())
    if (err){
        TE(err.message)
    }
    return provinces
}

module.exports.getAllProvince = getAllProvince

const getAllDistrict = async(provinceId) =>{
    let err,districts
    [err,districts] = await to(District.findAll({ where: { provinceID: provinceId } }))
    if (err){
        TE(err.message)
    }
    return  districts

}
module.exports.getAllDistrict = getAllDistrict