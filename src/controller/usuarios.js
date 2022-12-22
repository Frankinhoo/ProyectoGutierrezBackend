
const usuarios = [
    {
        username: 'Pablo08',
        password: 'AguanteBoca12'
    },
    {
        username: 'Franco25',
        password: 'MessiElMasGrande'
    }
]

class Contenedor {
    constructor() {
    }

    async loginPost(req, res) {
        const { username, password } = req.body;

        const index = usuarios.findIndex((aUser) => aUser.username === username && aUser.password === password);

        if (index < 0)
            res.status(401).json({ msg: 'No estas autorizado' });
        else {
            const user = usuarios[index];
            req.session.info = {
                loggedIn: true,
                contador: 1,
                username: user.username,
            };
            res.json({ msg: `Bienvenido!! ${user.username}` });
        }
    }

    async loginGet(req, res) {
        req.session.info.contador++;
        res.json({
            msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`
        });
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if (!err) res.json({msg: 'Logout Ok!!'});
            else res.send({ status: 'Logout ERROR', body: err });
        });
    }

    async info(req, res) {
        res.json({
            session: req.session,
            sessionId: req.sessionID,
            cookies: req.cookies
        });
    }
}

const contenedorDBMongo = new Contenedor();

module.exports = {
    usuariosController: contenedorDBMongo
}