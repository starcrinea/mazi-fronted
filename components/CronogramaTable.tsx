"use client"

import { SimulacionResponse, CronogramaItem } from "../types/simulacion"

type Props = {
  data: SimulacionResponse
}

export default function CronogramaTable({ data }: Props) {

const format = (n?: number) => {

if(n === undefined || n === null) return "0.00"

return Number(n).toLocaleString("es-PE", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
})

}

const formatDate = (d: string) => {

if(!d) return ""

return new Date(d).toLocaleDateString("es-PE")

}

return(

<div className="overflow-x-auto">

<table className="min-w-full border border-gray-700 text-sm text-white">

<thead className="bg-gray-800">

<tr>

<th className="p-2 border">ID</th>
<th className="p-2 border">Fecha</th>
<th className="p-2 border">Concepto</th>
<th className="p-2 border">Inversión</th>
<th className="p-2 border">Rendimiento</th>
<th className="p-2 border">Impuesto</th>
<th className="p-2 border">Depósito</th>
<th className="p-2 border">Disponible</th>

</tr>

</thead>

<tbody>

{data?.cronograma?.map((item: CronogramaItem, index:number)=> (

<tr key={`${item.id}-${index}`} className="text-center border-t border-gray-700">

<td className="p-2">{item.id}</td>

<td className="p-2">
{formatDate(item.fecha)}
</td>

<td className="p-2">
{item.concepto}
</td>

<td className="p-2">
{format(item.inversion)}
</td>

<td className="p-2">
{format(item.rendimiento)}
</td>

<td className="p-2">
{format(item.impuesto)}
</td>

<td className="p-2">
{format(item.deposito)}
</td>

<td className="p-2">
{format(item.disponible)}
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}