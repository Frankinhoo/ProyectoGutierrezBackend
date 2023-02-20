const passport = require("passport");

const passportOptions = {
    badRequestMessage: "Problema con username / password!",
};

class Contenedor {
    constructor() {
    }

    async signup(req, res, next) {
        passport.authenticate('signup', passportOptions, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) return res.status(401).json(info);
            res.json({ msg: 'Registrado con exito!' });
        })(req, res, next);
    };

    async login(req, res, next) {
        passport.authenticate('login', passportOptions, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) return res.status(401).json(info);
            res.json({ msg: "Bienvenido!", user: req.user });
        })(req, res, next);
    }

    async logout(req, res) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                }
            });
            res.json({ msg: 'Hasta Luego!!' });
        });
    };

    async info(req, res) {
        res.json(req.session);
    };

}

const contenedorDBMongo = new Contenedor();

module.exports = {
    usuariosController: contenedorDBMongo,
}