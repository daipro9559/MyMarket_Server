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

var addAddress = async (address)=>{
    let err, addressed
    [err,addressed] = await to (Address.create(address))
    if (err){
        TE (err.message)
    }
    return addressed

}
module.exports.addAddress = addAddress

var getProvince = async (provinceId)=>{
    let err, province
    [err,province] = await to (Province.findById(provinceId)) 
    if (err) { TE(err)}
    return province
}
module.exports.getProvince = getProvince
var getDistrict = async (districtId)=>{
    let err, district
    [err,district] = await to (District.findById(districtId))
    if (err) { TE(err)}
    return district
}
module.exports.getDistrict = getDistrict