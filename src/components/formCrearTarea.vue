<script setup lang="ts">
import { ref } from 'vue';
import {useSemaforoModalStore} from '@/stores/semaforoModal'
import {crearTarea } from '@/axios/crudAxios'

//instanciamos una variable para usar el store
const store = useSemaforoModalStore();

//Props
interface Props {
  fecha?: string
}

const props = defineProps<Props>();

const titulo = ref('');
const hora = ref('');
const tipo = ref('');
const descripcion = ref('');

//Función para generar id aleatorio cuando se crea un objeto Tarea
function generarId(): string {
    // Longitud deseada del ID
    const longitud = 10;
    // Caracteres posibles que se pueden usar en el ID
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
  
    // Genera el ID utilizando caracteres aleatorios de la cadena de caracteres
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indice);
    }
  
    return id;
  }

const anadirTarea = async (id:string,titulo:string,fecha:string,hora:string,tipo:string,descripcion:string): Promise<void> => {

  try{
        // Llamamos a la función crearTarea del CRUD para crear una nueva tarea
        const tareaCreada = await crearTarea(id,titulo,fecha,hora,tipo,descripcion);
         if (tareaCreada) {
            alert(`Tarea añadida correctamente: ${titulo}`);
            document.location.reload();
         }
    } catch (e) {
        alert(`No se pudo crear la tarea ${titulo}`);
        console.error(e);
    }
}
</script>

<template>
  <form class="formTarea">
    <div class="form-group" style="color: rgb(252, 252, 252);">
      <h4>Nueva tarea: {{ props.fecha }}</h4>
      <hr>
      <label for="titulo">Título de la tarea</label>
      <input type="text" class="form-control" id="titulo" v-model="titulo">
      <label for="hora">Hora de inicio</label>
      <input type="text" class="form-control" id="hora" v-model="hora">
      <label for="tipo">Tipo de tarea</label>
      <select class="form-control" id="tipo" v-model="tipo">
        <option>Examen</option>
        <option>Reunión</option>
        <option>Excursión</option>
        <option>Comunicado</option>
        <option>Evento</option>
        <option>Entrega</option>
      </select>
      <label for="descripcion">Descripción de la tarea</label>
      <input type="text" class="form-control" id="descripcion" v-model="descripcion">
    </div>
    <div class="form-group mt-2" style="display: flex; flex-direction: row; gap: 15px;">
      <button class="btn btn-primary" @click.prevent="anadirTarea(generarId(),titulo,store.fechaSeleccionada,hora,tipo,descripcion)">Agregar tarea</button>
      <button class="btn btn-danger" @click.prevent="store.cambioEstadoCreando(false)">Volver</button>
    </div>
  </form>
</template>