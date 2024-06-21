<script setup lang="ts">
import {useSemaforoModalStore} from '@/stores/semaforoModal'


const store = useSemaforoModalStore();

interface Props {
  nombre: string
  fecha: string
  hora: string
  tipo: string
  descripcion:string
}

const props = defineProps<Props>();
</script>

<template>
  <form class="formTarea">
    <div class="form-group" style="color: rgb(252, 252, 252);">
      <h2> {{ props.nombre }}</h2>
      <hr>
      <h4>Fecha:</h4>
      <p>{{ props.fecha }}</p>
      <h4>Hora de inicio:</h4>
      <p>{{ props.hora }}</p>
      <h4>Tipo de tarea:</h4>
      <p>{{ props.tipo }}</p>
      <h4>Detalles:</h4>
      <p>{{ props.descripcion }}</p>
    </div>
    <div class="form-group mt-2" style="display: flex; flex-direction: row; gap: 15px;">
      <button class="btn btn-danger" @click.prevent="store.cambioEstadoViendo(false)">Volver</button>
    </div>
  </form>
</template>