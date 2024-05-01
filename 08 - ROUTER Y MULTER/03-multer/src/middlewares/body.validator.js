export const bodyValidator = (req, res, next) => {
    if(!req.body.username) return res.status(404).json({msg: 'El campo username es obligatorio'})
    if(!req.body.email) return res.status(404).json({msg: 'El campo email es obligatorio'})
    next()
}