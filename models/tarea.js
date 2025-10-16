//modelo para crear una tarea
const { v4: uuidv4 } = require('uuid');
class Tarea {
    id = '';
    desc = '';
    completadoEn = null
    //no es necesario definir las propiedades, las podriamos definir del lado del constructor(pero en otros lenguajes asi se usa)
    constructor(desc) { //es lo que se va a ejecutar cuando creemos una nueva instancia de nuestra Tarea
        this.id = uuidv4();
        this.desc = desc
        this.completadoEn = null //redundante
    }
}
module.exports = Tarea