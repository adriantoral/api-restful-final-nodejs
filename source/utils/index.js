const res_handler = (res, data_validation, error_code, error_message) => {
    if (!data_validation) return res.status(error_code).send({data: {errors: [error_message]}})
    return res.send({data: data_validation})
}

module.exports = {
    res_handler
}
