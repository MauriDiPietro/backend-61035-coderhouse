export const errorHandler = (error, req, res, next) => {
    console.log( `error ${error.message}`) 
    const status = error.status || 400
    res.failure(status, error.message)
}