const { administrador } = require("../config/index");


const middlewareGetId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (id <= 0) {
        return res.status(404).json({
            msg: 'Producto no encontrado'
        })
    }
    next();
}

const middlewarePost = (req, res, next) => {
    const data = req.body;
    if (!administrador) {
        return res.status(401).json({
            msg: 'No estas autorizado'
        })
    };

    if (!data.producto || !data.marca || !data.precio || !data.stock) {
        return res.status(400).json({
            msg: "Campos incompletos"
        })
    }
    
    next();
}

const middlewarePut = (req, res, next) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    if (id <= 0) {
        return res.status(404).json({
            msg: 'El producto no existe'
        })
    }

    if (!data.producto || !data.marca || !data.precio || !data.stock) {
        return res.status(400).json({
            msg: "Campos incompletos"
        })
    }
    next();
}

const middlewareDelete = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (id <= 0) {
        return res.json({
            msg: 'Ok'
        })
    }
    next();
}


module.exports = {
    middlewareGetId,
    middlewarePost,
    middlewarePut,
    middlewareDelete
}