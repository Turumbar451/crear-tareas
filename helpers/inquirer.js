const inquirer = require('inquirer')
require('colors')
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿que desea hacer?',
        choices: [{
            value: '1',
            name: `${'1.'.green} Crear tareas`
        }, {
            value: '2',
            name: `${'2.'.green} Listar tareas`
        }, {
            value: '3',
            name: `${'3.'.green} Listar tareas completas`
        }, {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`
        }, {
            value: '5',
            name: `${'5.'.green} Completar tareas`
        }, {
            value: '6',
            name: `${'6.'.green} Borrar tareas`
        }, {
            value: '0',
            name: `${'0.'.green} Salir`
        }
        ]
    }
]
const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Selecciona una opcion  ');
    console.log('========================= \n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar\n`,
        }
    ]
    console.log(' \n ');
    await inquirer.prompt(question)
}
const leerInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) { //requerimos el mensaje, hasta no ponerlo no pasamos de qui
            if (value.length === 0) { //el value es lo que nosotros pongamos
                return 'Por favor ingrese un valor'//retorno 1 que impide el 2
            }
            return true;//retorno 2 en caso de que no pase por el 1 
        }
    }
    ];
    const { desc } = await inquirer.prompt(question); //el desc contiene el valor introducido. 
    return desc;//retorno de lo que introduzca el usuario
}
const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })
    choices.unshift({
        value: '0',
        name: `${'0'.green}. Cancelar `
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok; //el ok sera un booleano, asi funciona el confirm
}
const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false//checa si existe, para cada objeto del array, es la forma en que marca las casillas de los check
        }

    })

    const pregunta = [
        {
            type: 'checkbox', //el tipo checkbox regresa un array con los values, que en este caso son los id 
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);


    return ids;
}
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}