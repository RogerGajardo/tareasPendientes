require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, inquirerPausa, inquirerLeerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {
    
    let opt = '0';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    
    if ( tareasDB ) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
            
                const desc = await inquirerLeerInput('Descripcion: ');
                tareas.crearTarea(desc);

                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listaCompletasPendientes(true);
                break;
            case '4':
                tareas.listaCompletasPendientes(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id != '0' ) {
                    const confirmarBorrado = await confirmar('Esta seguro que desea borrarlo?');
                    if ( confirmarBorrado ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }else{
                    console.log('Accion Cancelada');
                }
                break;
            default:
                break;
        }

        guardarDB( tareas.listadoArr );

        await inquirerPausa();

    } while (opt !== '0');
    

    //if(opt !== '0') await inquirerPausa();


}

main();
