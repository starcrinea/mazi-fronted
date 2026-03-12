"use client"

import { useState } from "react"

import SimuladorForm from "../components/SimuladorForm"
import CronogramaTable from "../components/CronogramaTable"

import { SimulacionResponse } from "../types/simulacion"

export default function Home(){

const [resultado,setResultado] = useState<SimulacionResponse | null>(null)

return(

<div className="min-h-screen bg-black text-white p-10">

<h1 className="text-3xl font-bold mb-10">

Cotizador Financiero

</h1>

<div className="grid grid-cols-2 gap-10">

<div>

<SimuladorForm onResult={setResultado}/>

</div>

<div>

{resultado && <CronogramaTable data={resultado}/>}

</div>

</div>

</div>

)

}
