<script setup lang="ts">
import calendarioMes from '@/components/calendarioMes.vue'
import formCrearTarea from '@/components/formCrearTarea.vue'
import formInfoTarea from '@/components/formInfoTarea.vue'
import formEditarTarea from './components/formEditarTarea.vue'
import { ref } from 'vue'
import {useSemaforoModalStore} from '@/stores/semaforoModal'
import {onClickOutside} from '@vueuse/core'

//creamos una instacia del store
const store = useSemaforoModalStore();

//variables reactivas para cerrar los modales
const modalCrear = ref(null);
const modalVer = ref(null);
const modalEditar = ref(null);

// Crear una instancia del objeto Date para obtener la fecha del sistema
const fechaActual:Date = new Date();

// Obtener el año y mes actual
const year = ref<number>(fechaActual.getFullYear());
const month = ref<number>(fechaActual.getMonth() + 1);

const mes = ref(month)
const anio = ref(year)

const nombres: string[] = [
      'Enero ', 'Febrero','Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
]

//Funciones onclickOutside para poder cerrar los modales simplemente pinchando fuera y no teniendo que pinchar al botón Volver
onClickOutside (modalCrear,()=>{store.cambioEstadoCreando(false)})
onClickOutside (modalVer,()=>{store.cambioEstadoViendo(false)})
onClickOutside (modalEditar,()=>{store.cambioEstadoEditando(false)})


</script>

<template>
  <!--Modal de creación de tareas-->
  <div class="modal-bg" v-if="store.estaCreando">
        <formCrearTarea :fecha="store.fechaSeleccionada" ref="modalCrear"></formCrearTarea>
  </div>

 <!--Modal de visualización de tareas-->
  <div class="modal-bg" v-if="store.estaViendo">
        <formInfoTarea :nombre="store.tituloSeleccionada" :fecha="store.fechaSeleccionada" :hora="store.horaSeleccionada" :tipo="store.tipoSeleccionada" :descripcion="store.descripcionSeleccionada" ref="modalVer"></formInfoTarea>
  </div>

   <!--Modal de visualización de tareas-->
   <div class="modal-bg" v-if="store.estaEditando">
        <formEditarTarea :id="store.idSeleccionada"  :nombre="store.tituloSeleccionada" :fecha="store.fechaSeleccionada" :tipo="store.tipoSeleccionada" :hora="store.horaSeleccionada" :descripcion="store.descripcionSeleccionada" ref="modalEditar"></formEditarTarea>
  </div>

    <div class="display-flex text-center">
        <h1>APP Calendario Organizador</h1>
        <hr>
        <select v-model="mes" class="form-select" style="display: flex;width: 200px; text-align: center; margin-left: 10px;">
            <option class="text-center" v-for="i in 12" :key="i" :value="i">
                  {{ nombres[i - 1] }}
            </option>
        </select>
        Año: <input type="number" v-model="anio" min="2000" max="2050"/>
        <br><br>
        <calendarioMes :mes="mes" :anio="anio"/>
    </div>
    
</template>
