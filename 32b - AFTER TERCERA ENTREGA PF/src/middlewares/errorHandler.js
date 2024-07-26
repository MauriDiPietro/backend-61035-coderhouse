import { createResponse } from "../utils.js"

export const errorHandler = (error, req, res, next) => {
    console.log( `error ${error}`) 
    const status = error.status || 500
    createResponse(res, status, error)
    // res.status(status).send(error.message)
}