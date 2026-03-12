export type CronogramaItem = {

  id: number
  fecha: string
  concepto: string
  inversion: number
  rendimiento: number
  impuesto: number
  deposito: number
  disponible: number

}

export type SimulacionResponse = {

  cronograma: CronogramaItem[]

}