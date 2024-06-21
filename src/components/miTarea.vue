<script setup lang="ts">
import { eliminarTarea } from '@/axios/crudAxios';
import {useSemaforoModalStore} from '@/stores/semaforoModal'

//Para poder usar el store importado
const store = useSemaforoModalStore();

//Props
interface Props {
    tipo: string
    titulo:string
    id: string
    fecha:string
    hora: string
    descripcion:string
}
const props = defineProps <Props>()

//Función que se ejecuta cuando se pulsa al botón de eliminar tarea
const accionEliminar = async (id:string) => {
  try{
        // Llamamos a la función eliminarTarea del CRUD para eliminar la tarea
        const tareaEliminada = await eliminarTarea(id)
         if (tareaEliminada) {
            alert(`Tarea eliminada correctamente.`);
            document.location.reload();
         }
    } catch (e) {
        alert(`No se pudo eliminar la tarea.`);
        console.error(e);
    }
}

//Función que se ejecuta cuando se pulsa el botón para ver la información de la tarea
const accionVer = () => {
  store.cambioEstadoViendo(true);
  store.cogerTitulo(props.titulo)
  store.cogerFecha(props.fecha)
  store.cogerHora(props.hora)
  store.cogerTipo(props.tipo)
  store.cogerDescripcion(props.descripcion)
}

//Función que se ejecuta cuando se pulsa el botón para ver la información de la tarea
const accionEditar = () => {
  store.cogerId(props.id)
  store.cogerTitulo(props.titulo)
  store.cogerFecha(props.fecha)
  store.cogerHora(props.hora)
  store.cogerTipo(props.tipo)
  store.cogerDescripcion(props.descripcion)
  store.cambioEstadoEditando(true);
}

//Función que se ejecutará cuando comenzamos a arrastrar una tarea para moverla a otro día. 
const iniciarArrastre = () => {
  store.cogerId(props.id);
  store.cogerTitulo(props.titulo)
  store.cogerHora(props.hora)
  store.cogerTipo(props.tipo)
  store.cogerDescripcion(props.descripcion)
};
</script>


<template>
  <div  class="tarea" draggable="true" @dragstart="iniciarArrastre()" style="display: flex; flex-direction: row; flex-wrap: wrap; width: 80%; height: 25px; gap:8px; border: 1.5px dotted firebrick; border-radius: 8px; padding-left: 4px;">

    <p style="font-size: 13px; color: firebrick; font-weight: bold;">{{ props.tipo }}</p>

    <!--Botón para ver la info de la tarea-->
    <a href="#" @click.prevent="accionVer()">
      <img src="../assets/img/view_icon.png" style="width: 15px; height: 15px;margin-top: -4px;">
    </a>

    <!--Botón para editar la tarea-->
    <a href="#" @click.prevent="accionEditar()">
      <img src="../assets/img/edit_icon.png" style="width: 15px; height: 15px;margin-top: -4px;">
    </a>

    <!--Botón para eliminar la tarea-->
    <a href="#" @click.prevent="accionEliminar(props.id)">
      <img src="../assets/img/delete_icon.png" style="width: 15px; height: 15px;margin-top: -4px;">
    </a>
  </div>
</template>