const formulario = document.querySelector('#formProductos');
const inputProducto = document.querySelector('#producto');
const inputMarca = document.querySelector('#marca');
const inputPrecio = document.querySelector('#precio');
const divDeProductos = document.querySelector('#productos');

const formularioMsj = document.querySelector('#formMensajes');
const inputMensajes = document.querySelector('#inputMensajes');
const inputUsuario = document.querySelector('#inputUsuario');
const mensajes = document.querySelector('#mensajes')

const socket = io();

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (inputProducto.value && inputMarca.value && inputPrecio.value) {
        const productoNuevo = {
            "producto": inputProducto.value,
            "marca": inputMarca.value,
            "precio": parseInt(inputPrecio.value),
        }

        socket.emit('NuevoProducto', productoNuevo);

        inputProducto.value = '';
        inputMarca.value = '';
        inputPrecio.value = '';
    }

})

socket.on('TodosLosProductos', async (data) => {
    const productos = await data;
    divDeProductos.innerHTML = '';
    productos.forEach(elemento => {
        divDeProductos.innerHTML += `
        <table style="width:50%; border-collapse: collapse; text-align:center;">
            <tr style="border: black 2px solid; text-align:center;" >
            <td>
                ${elemento.id} 
            </td>
            <td>
                ${elemento.producto}
            </td>
            <td>
                ${elemento.marca}
            </td>
            <td>
                ${elemento.precio}
            </td>
        </tr>
        </table>
        `
    });
})

formularioMsj.addEventListener('submit', (e) => {
    e.preventDefault();

    if (inputMensajes.value && inputUsuario.value) {
        const mensajeNuevo = {
            "usuario": inputUsuario.value,
            "mensaje": inputMensajes.value
        }

        socket.emit('NuevoMensaje', mensajeNuevo);

        inputMensajes.value = '';
        inputUsuario.value = '';
    }
})

socket.on('TodosLosMensajes', async (data) => {
    const losMensajes = await data;
    console.log(losMensajes);
    mensajes.innerHTML = '';
    losMensajes.forEach(elemento => {
        mensajes.innerHTML += `
        <div>
            <li>
            <span style="color:blue" class="usuario">${elemento.usuario}</span> 
            [<span style="color:red" class="mensaje">${elemento.time}</span>]: <span style="color:green" class="usuario">${elemento.mensaje}</span> 
            </li>
        </div>
        `
        
    });
})