<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useSemaforoModalStore} from '@/stores/semaforoModal'
import { obtenerTareas, actualizarTarea } from '@/axios/crudAxios';
import type {Tarea} from '@/axios/crudAxios'
import miTarea from './miTarea.vue';

//Para poder usar el store importado
const store = useSemaforoModalStore();

//Props
interface Props {
  fecha: string
}

const props = defineProps<Props>();

// Crear una instancia del objeto Date para obtener la fecha del sistema
const fechaActual: Date = new Date();

// Obtener el año, mes y día actual
const año: number = fechaActual.getFullYear();
const mes: number = fechaActual.getMonth() + 1;
const dia: number = fechaActual.getDate();

// Formatear la fecha en el formato d/m/yyyy
const fechaFormateada: string = `${dia}/${mes}/${año}`;

//Función que se activa cuando pulsamos al botón de añadir tarea
const accionesBotonCrear = () => {
  store.cambioEstadoCreando(true);
  store.cogerFecha(props.fecha);
}

//array dinámico para guardar las tareas recuperadas desde el json-server
const tareas = ref<Tarea[]>([]);

//función que se ejecuta siempre que arrastramos contenido de una celda a otra para efectuar el cambio de fecha
const soltarTarea = async (id: string, titulo: string, fecha: string, hora: string, tipo: string, descripcion: string): Promise<void> => {
  try {
    // Llamamos a la función actualizarTarea del CRUD para actualizar la información de la tarea
    const tareaEditada = await actualizarTarea(id, titulo, fecha, hora, tipo, descripcion);
    if (tareaEditada) {
      document.location.reload();
    }
  } catch (e) {
    alert(`No se pudo mover la tarea ${titulo}`);
    console.error(e);
  }
}



//al crear el componente, se cargan todas las tareas que ya hayan sido creadas con anterioridad desde el json-server
onMounted(async() => {
  try {
    // Llamamos a la función obtenerTareas del CRUD para obtener todas las tareas y guardarlas posteriormente en el array tareas
    const tareasRecuperadas = await obtenerTareas();
    tareas.value = tareasRecuperadas;
  } catch (e) {
    console.error(e);
  }

});
</script>


<template>
  <div @dragover.prevent="" @drop="soltarTarea(store.idSeleccionada, store.tituloSeleccionada, props.fecha, store.horaSeleccionada, store.tipoSeleccionada, store.descripcionSeleccionada)">
     <!-- Botón para añadir tareas -->
     <a href="#" v-if="props.fecha !== ' ' && props.fecha !== null" @click.prevent="accionesBotonCrear()">
      <img src="../assets/img/add_icon.png" style="width: 20px; height: 20px; margin-left: 140px; margin-bottom: 10px;">
    </a>

    <!-- Utiliza la referencia para enfocar el elemento si la fecha actual coincide con props.fecha -->
    <p v-if="props.fecha !== ' '" :class="{'today': props.fecha === fechaFormateada}"> <b>{{ props.fecha }}</b></p>
    
    <!-- Componentes de las tareas -->
    <miTarea class="mb-2" v-for="el in tareas.filter(el => el.fecha === props.fecha)" :key="el.id" :id="el.id" :titulo="el.titulo" :tipo="el.tipo" :fecha="el.fecha" :hora="el.hora" :descripcion="el.descripcion"></miTarea>
  </div>
</template>
