const color = require('colors')
const Tarea = require("./tarea");
//modelo para crear varias tareas
class Tareas {
    get listadoArr() { //el array de tareas no sera una propiedad nueva del objeto, sino el resultado de transformar el objeto _listado a array. por eso se usa get. Y en vez de ser un metodo sera una propiedad computada  
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];//accedo a la propiedad con el key especifico del objeto _listado
            listado.push(tarea);

        })


        return listado;
    }
    constructor(_listado) { //en el constructor es donde se definen las propiedades en js
        this._listado = {}
    }
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }
    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            let idx = `${i + 1}`.green
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completado'.green
                : 'Pendiente'.red;
            //console.log(`${idx} ${desc} :: ${estado}`);
            console.log(this._listado);

        })
    }
    listarPendientesCompletadas(completada = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completado'.green
                : 'Pendiente'.red;
            if (completada) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${color.green(contador + '.')} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${color.red(contador + '.')} ${desc} :: ${estado}`);
                }
            }
        })
    }
    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }
}
module.exports = Tareas
