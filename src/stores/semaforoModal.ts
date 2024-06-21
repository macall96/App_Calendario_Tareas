import { defineStore } from 'pinia';
import { ref, computed} from 'vue';
import type { ComputedRef } from 'vue';

// Define y tipa el store
export const useSemaforoModalStore = defineStore('semaforo', () => {
  
  // Declaración de estado reactiva
  const creando = ref(false)
  const viendo = ref(false)
  const editando = ref(false)
  const fecha = ref()
  const titulo = ref()
  const hora =ref()
  const tipo = ref()
  const descripcion =ref()
  const id = ref()

  // Getter
  const estaCreando: ComputedRef<boolean> = computed(() => creando.value)
  const estaViendo: ComputedRef<boolean> = computed(() => viendo.value)
  const estaEditando: ComputedRef<boolean> = computed(() => editando.value)
  const fechaSeleccionada: ComputedRef<string> = computed(()=> fecha.value)
  const tituloSeleccionada: ComputedRef<string> = computed(()=> titulo.value)
  const horaSeleccionada: ComputedRef<string> = computed(()=> hora.value)
  const tipoSeleccionada: ComputedRef<string> = computed(()=> tipo.value)
  const descripcionSeleccionada: ComputedRef<string> = computed(()=> descripcion.value)
  const idSeleccionada: ComputedRef<string> = computed(()=> id.value)

  // Acción para cambiar el estado de la variable creando en el semáforo
  const cambioEstadoCreando = (valor: boolean) => {
    creando.value = valor;
  };

  // Acción para cambiar el estado de la variable viendo en el semáforo
  const cambioEstadoViendo = (valor: boolean) => {
    viendo.value = valor;
  };

  // Acción para cambiar el estado de la variable editando en el semáforo
  const cambioEstadoEditando = (valor: boolean) => {
    editando.value = valor;
  };

  //Acciones para coger la fecha,titulo, hora, descripción o id de la tarea que se selecciona para trabajar con ella
  const cogerFecha = (valor: string | undefined) => {
    fecha.value = valor;
  };

  const cogerTitulo = (valor: string | undefined) => {
    titulo.value = valor;
  };

  const cogerHora = (valor: string | undefined) => {
    hora.value = valor;
  };

  const cogerTipo = (valor: string | undefined) => {
    tipo.value = valor;
  };

  const cogerDescripcion = (valor: string | undefined) => {
    descripcion.value = valor;
  };

  const cogerId = (valor: string | undefined) => {
    id.value = valor;
  }

  return {
    estaCreando,
    cambioEstadoCreando,
    estaViendo,
    cambioEstadoViendo,
    estaEditando,
    cambioEstadoEditando,
    cogerFecha,
    fechaSeleccionada,
    cogerTitulo,
    tituloSeleccionada,
    cogerHora,
    horaSeleccionada,
    cogerTipo,
    tipoSeleccionada,
    cogerDescripcion,
    descripcionSeleccionada,
    cogerId,
    idSeleccionada
  };
});
