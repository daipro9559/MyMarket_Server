const {to} = require('await-to-js')
const pe = require('parse-error')

module.exports.to = async (promise) => {
    let err, res
    [err, res] = await to(promise)
    if(err) return [pe(err)]
    return [null, res]
};
//error web response
module.exports.ReE = (res, err, code) => {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message
    }
    if (typeof code !== 'undefined') {
        res.statusCode = code
    }
    return res.json({ success: false, message: err })
};
// success web response 
module.exports.ReS = (res, data, code, message ='successfully') => {
    let send_data = { success: true }
    send_data.message = message
    send_data.data = data
    if (typeof code !== 'undefined') res.statusCode = code

    return res.json(send_data)
};

module.exports.TE = (err_message, log) => {
    if (log === true) {
        console.error(err_message)
    }
    throw new Error(err_message)
};
