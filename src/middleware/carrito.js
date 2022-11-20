const fs = require('fs');

const middlewareGet = (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(req.params.id)) {
        return res.status(400).json({
            error: "Tiene que enviar un id válido"
        });
    }

    if (id <= 0) {
        return res.status(404).json({
            msg: 'Carrito inexistente'
        })
    }

    next();
}

const middlewarePostAndDelete = async (req, res, next) => {
    const contenido = await fs.promises.readFile(`./carrito.json`, `utf-8`);
    const carrito = JSON.parse(contenido);
    
    const id = parseInt(req.params.id);
    const indice = carrito.findIndex((cart) => cart.id === id);

    if (isNaN(req.params.id)) {
        return res.status(400).json({
            error: "Tiene que enviar un id de carrito válido"
        });
    }

    if (id <= 0) {
        return res.status(404).json({
            msg: 'Id de carrito inexistente'
        })
    }

    if (indice < 0) {
        return res.status(404).json({
            msg: "El carrito buscado no existe",
        });
    }

    next();
}

const middlewareDelete = (req, res, next) => {
    const id = parseInt(req.params.id);
    const productoId = parseInt(req.params.id_prod);

    if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
        return res.status(400).json({
            error: "Tiene que enviar parámetros válidos",
        });
    }

    if (id <= 0) {
        return res.status(404).json({
            msg: 'Id de carrito inexistente'
        })
    }

    if (productoId <= 0) {
        return res.status(404).json({
            msg: 'Id de producto inexistente'
        })
    }

    next();
}

module.exports = {
    middlewareGet,
    middlewarePostAndDelete,
    middlewareDelete
}
