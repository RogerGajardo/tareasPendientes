const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];

        Object.keys(this._listado).forEach( key => {
            
            const tarea = this._listado[key];
            listado.push( tarea ); 
        } )

        return listado;
    }

    constructor(){

        this._listado = {};
    }

    borrarTarea( id = '' ){
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto( ){
        

        this.listadoArr.forEach( (tarea, i) => {
            
            const {desc, completadoEn} = tarea;
            const idx =  `${i+1}.`.green;
            const estado = (!completadoEn)? 'Pendiente'.red : 'Completada'.green; 
            
            console.log(` ${ idx } ${ desc } :: ${ estado } `); 
        });
    }

    listaCompletasPendientes( completadas = true ){
        
        let cont = 1;

        this.listadoArr.forEach( tarea => {
            
            const {desc, completadoEn} = tarea;
            const estado = (!completadoEn)? 'Pendiente'.red : 'Completada'.green; 

            if( completadoEn && completadas) {
                console.log(`${ (cont + '.').green } ${ desc } :: ${ completadoEn.green }`); 
                cont++;
            }  else if( !completadoEn && !completadas ) {
                console.log(`${ (cont + '.').green } ${ desc } :: ${ completadoEn.green }`); 
                cont++;
            }  
        });
    }

    completarTareas(){

        this.listadoArr.forEach( tarea => {
            
            const {desc, completadoEn} = tarea;

            if( completadoEn) {
                console.log(`${ (cont + '.').green } ${ desc } :: ${ 'Completada'.green }`); 
                cont++;
            }  else if( !completadoEn ) {
                console.log(`${ (cont + '.').green } ${ desc } :: ${ 'Pendiente'.red }`); 
                cont++;
            }  
        });

    }

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {
            
            const tarea =  this._listado[id];

            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
            // else {
            //     tarea.completadoEn = null;
            // }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });


    }




}

module.exports = Tareas;


// 17:12 17:19
