
const validateLogIn = (req, res, next) => {
    if (req.session.info && req.session.info.loggedIn) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
};

const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated())
        return res.status(401).json({ msg: "No autorizado!" });
    next();
};

module.exports = {
    validateLogIn,
    isLoggedIn
}