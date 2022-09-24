
class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    getFullName() {
        console.log(`Nombre y Apellido: ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        arrayMascotas.push(mascota)
    }

    countMascotas() {
        console.log(`Cantidad de Mascotas: ${arrayMascotas.length}`)
    }

    addBook(nombre, autor) {
        arrayLibros.push({ Nombre : nombre, Autor: autor})
    }

    getBookNames() {
        console.log(arrayLibros.map((el) => el.Nombre ))
        
    }
}

const arrayMascotas = [];

const arrayLibros = [];


const usuario1 = new Usuario("Miguel", "Avalle")

//MASCOTAS
usuario1.addMascota("Perro")
usuario1.addMascota("Gato")
usuario1.addMascota("Tortuga")

//LIBROS 
usuario1.addBook("El principito", "Antoine de Saint-Exupéry")
usuario1.addBook("Don Quijote de la Mancha", "Miguel de Cervantes")
usuario1.addBook("Cien años de soledad", "Gabriel García Márquez")


usuario1.getFullName()

usuario1.countMascotas()

usuario1.getBookNames()

