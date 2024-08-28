import Chai from 'chai';
const { expect, assert } = Chai;
import { Tareas } from "../utils/tareas.js";

describe('Tests unitarios de clase tareas', ()=>{
    it('Debería crear el contenedor de tareas vacío', ()=>{
        //preparacion
        const tareas = new Tareas();

        //ejecucion
        const listadoTareas = tareas.list();

        //afirmaciones/aserciones
        expect(listadoTareas).to.have.lengthOf(0);

        assert.lengthOf(listadoTareas, 0);
        assert.strictEqual(listadoTareas.length, 0);
    });

    it('Debería crear tareas', ()=>{
        const tareas = new Tareas();

        tareas.add('probando testing');

        const list = tareas.list();

        assert.strictEqual(list.length, 1);
        assert.deepStrictEqual(list, [
            {
                title: 'probando testing',
                complete: false
            }
        ])
    });

    it('debería marcar una tarea como complete', ()=>{
        const tareas = new Tareas();
        tareas.add('probando testing');
        tareas.add('probando testing 2');
        tareas.complete('probando testing')
        const list = tareas.list()
        assert.deepStrictEqual(list, [
            {
                title: 'probando testing',
                complete: true
            },
            {
                title: 'probando testing 2',
                complete: false
            }
        ])
    });

    it('deberia dar un error al intentar completar una tarea inexistente', ()=>{
        const tareas = new Tareas();
        tareas.add('probando testing');
        const msgError = 'Tarea no encontrada';
        const fntest = () => tareas.complete('tarea1');
        expect(fntest).to.throw(Error, msgError);
        assert.throws(fntest, Error, msgError);
    })
})
