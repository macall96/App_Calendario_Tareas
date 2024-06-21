<script setup lang="ts">
import { useSemaforoModalStore } from '@/stores/semaforoModal';
import { actualizarTarea } from '@/axios/crudAxios';
import { ref } from 'vue';

// Instanciamos una variable para usar el store
const store = useSemaforoModalStore();

// Props
interface Props {
  id: string;
  nombre: string;
  fecha: string;
  hora: string;
  tipo: string;
  descripcion: string;
}
const props = defineProps<Props>();

const tituloReactivo = ref(props.nombre);
const horaReactiva = ref(props.hora);
const fechaReactiva = ref(props.fecha);
const tipoReactivo = ref(props.tipo);
const descripcionReactiva = ref(props.descripcion);

const modificarTarea = async (id: string, titulo: string, fecha: string, hora: string, tipo: string, descripcion: string): Promise<void> => {
  try {
    // Llamamos a la función actualizarTarea del CRUD para actualizar la información de la tarea
    const tareaEditada = await actualizarTarea(id, titulo, fecha, hora, tipo, descripcion);
    if (tareaEditada) {
      alert('Tarea editada correctamente.');
      document.location.reload();
    }
  } catch (e) {
    alert(`No se pudo actualizar la tarea ${titulo}`);
    console.error(e);
  }
}
</script>

<template>
  <form class="formTarea">
    <div class="form-group" style="color: rgb(252, 252, 252);">
      <h2>Editar tarea</h2>
      <hr>
      <p>Nombre de la tarea:</p>
      <input type="text" v-model="tituloReactivo">
      <br><br>
      <p>Fecha:</p>
      <input type="text" v-model="fechaReactiva">
      <p>Hora de inicio:</p>
      <input type="text" v-model="horaReactiva">
      <p>Tipo</p>
      <select class="form-control" v-model="tipoReactivo">
        <option>Examen</option>
        <option>Reunión</option>
        <option>Excursión</option>
        <option>Comunicado</option>
        <option>Evento</option>
        <option>Entrega</option>
      </select>
      <p>Descripción:</p>
      <input type="text" v-model="descripcionReactiva">
      <br><br>
    </div>
    <div class="form-group mt-2" style="display: flex; flex-direction: row; gap: 15px;">
      <button class="btn btn-primary" @click.prevent="modificarTarea(store.idSeleccionada, tituloReactivo, fechaReactiva, horaReactiva, tipoReactivo, descripcionReactiva)">Guardar cambios</button>
      <button class="btn btn-danger" @click.prevent="store.cambioEstadoEditando(false)">Volver</button>
    </div>
  </form>
</template>
