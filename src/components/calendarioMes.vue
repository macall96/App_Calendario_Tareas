<script setup lang="ts">
import {computed} from 'vue'
import celdaCalendario from '@/components/celdaCalendario.vue'

interface Props{
    mes?:number
    anio?:number
    cols?:string[]
    COLS?:number
    ROWS?:number
}

const props = withDefaults(defineProps<Props>(),{
            cols: ()=> ['Lunes', 'Martes', 'Miércoles', 'Jueves','Viernes'],
            COLS: 7,
            ROWS: 5,
            anio: 2000,
            mes: 1
})


//Convertimos el número de orden del día en filas y columnas
const anadevalorSecuencial = (numero:number, valor:string, celdas:string[][]) =>{
    const fila = Math.floor(numero / props.COLS);
    const columna = numero % props.COLS;
    celdas[fila][columna]=valor 
}



const tablaMes = computed(() =>{
  const celdas = Array.from(Array(props.COLS).keys()).map(() =>
                        Array.from(Array(props.ROWS).keys()).map(() => ' '))
  const primerDia = new Date(`${props.anio}-${props.mes}-1`)
  const posicionPrimerDia = [6,0,1,2,3,4,5][primerDia.getDay()]
  const numDiasMes = new Date(props.anio, props.mes, 0).getDate()
  const rangoNumeros = [...Array(numDiasMes).keys()] .map(i => i + posicionPrimerDia )
  //Recorremos el rango de números para añadir la fecha
  rangoNumeros.map((el,ind)=> anadevalorSecuencial(el,`${ind +1}/${props.mes}/${props.anio}`, celdas))
  return celdas
})
</script>

<template>
  <table class="table text-center" style="border: 2px solid rgb(70, 79, 85); border-radius: 25px;">
    <thead>
      <tr>
        <th v-for="c in cols" :key="c" style="background-color: rgb(146, 198, 241);  ; color: aliceblue; border: 3px solid rgb(75, 86, 94); ;">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in props.ROWS" :key="i">
        <td v-for="(c, j) in cols" :key="c" style="background-color: rgb(247, 246, 239); border: 3px solid  rgb(94, 108, 119); ">
          <celdaCalendario :fecha="tablaMes[i - 1][j]" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
