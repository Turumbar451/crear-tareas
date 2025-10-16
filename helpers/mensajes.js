require('colors')

const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('seleccione una opcion: ', (opt) => {
            readline.close()
            resolve(opt)
        })
    })
}
//solo muestra un mensajes despues de seleccionar una opcion (exceptuando el 0)
const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
            readline.close()
            resolve()
        })
    })
}

module.exports = {
    /* mostrarMenu, */
    pausa

}





