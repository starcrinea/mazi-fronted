"use client"

import { useState } from "react"
import { SimulacionResponse } from "../types/simulacion"

type Props = {
  onResult:(data:SimulacionResponse)=>void
}

export default function SimuladorForm({onResult}:Props){

const [nombre,setNombre]=useState("")
const [dni,setDni]=useState("")

const [producto,setProducto]=useState("Gestión RF")

const [monto,setMonto]=useState("")
const [tea,setTea]=useState("")
const [diaPago,setDiaPago]=useState("25")
const [plazo,setPlazo]=useState("")

const [moneda,setMoneda]=useState("PEN")
const [tipoCobro,setTipoCobro]=useState("Mensual")

const [fechaInicio,setFechaInicio]=useState(
new Date().toISOString().split("T")[0]
)

const [resultado,setResultado]=useState<SimulacionResponse | null>(null)

const simular = async()=>{

try{

const response = await fetch("http://localhost:7071/api/simular",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

nombre,
dni,

producto,

monto:Number(monto),
tea:Number(tea),

diaPago:Number(diaPago),
plazo:Number(plazo),

moneda,
tipoCobro,

fechaInicio

})

})

const data:SimulacionResponse = await response.json()

setResultado(data)

onResult(data)

}catch(error){

console.error("Error simulando",error)

}

}

const guardar = async()=>{

if(!resultado) return

try{

await fetch("http://localhost:7071/api/guardar",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

nombre,
dni,

producto,

monto:Number(monto),
tea:Number(tea),

diaPago:Number(diaPago),
plazo:Number(plazo),

moneda,
tipoCobro,
fechaInicio,

cronograma:resultado.cronograma

})

})

alert("Simulación guardada")

}catch(error){

console.error("Error guardando",error)

}

}

return(

<div className="flex flex-col gap-3">

<input
className="p-2 rounded "
placeholder="Nombre inversionista"
value={nombre}
onChange={e=>setNombre(e.target.value)}
/>

<input
className="p-2 rounded "
placeholder="DNI"
value={dni}
onChange={e=>setDni(e.target.value)}
/>

<select
className="p-2 rounded "
value={producto}
onChange={e=>setProducto(e.target.value)}
>

<option>Gestión RF</option>
<option>ABC Premium</option>

</select>

<input
className="p-2 rounded "
placeholder="Monto"
value={monto}
onChange={e=>setMonto(e.target.value)}
/>

<input
className="p-2 rounded "
placeholder="TEA"
value={tea}
onChange={e=>setTea(e.target.value)}
/>

<input
className="p-2 rounded "
placeholder="Día de pago"
value={diaPago}
onChange={e=>setDiaPago(e.target.value)}
/>

<input
className="p-2 rounded "
placeholder="Plazo"
value={plazo}
onChange={e=>setPlazo(e.target.value)}
/>

<select
className="p-2 rounded "
value={moneda}
onChange={e=>setMoneda(e.target.value)}
>

<option value="PEN">PEN</option>
<option value="USD">USD</option>

</select>

<select
className="p-2 rounded "
value={tipoCobro}
onChange={e=>setTipoCobro(e.target.value)}
>

<option>Mensual</option>
<option>Trimestral</option>
<option>Semestral</option>
<option>Al Liquidar</option>

</select>

<input
type="date"
className="p-2 rounded "
value={fechaInicio}
onChange={e=>setFechaInicio(e.target.value)}
/>

<div className="flex gap-3 mt-3">

<button
className="bg-orange-500 hover:bg-orange-600 p-2 rounded text-white"
onClick={simular}
>
Simular
</button>

{resultado && (

<button
className="bg-green-600 hover:bg-green-700 p-2 rounded text-white"
onClick={guardar}
>
Guardar
</button>

)}

</div>

</div>

)

}