
const validateLogIn = (req, res, next) => {
    if (req.session.info && req.session.info.loggedIn) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
};
module.exports = {
    validateLogIn
}