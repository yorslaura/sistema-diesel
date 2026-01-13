'use client'
import { useState } from 'react'

export default function Home() {
  // --- EL CEREBRO ---
  // 1. Para lo que estamos escribiendo ahora mismo
  const [nuevaPlaca, setNuevaPlaca] = useState('')
  
  // 2. Para la lista de placas ya guardadas (un array [])
  const [listaPlacas, setListaPlacas] = useState<string[]>([])

  // --- LA ACCIÓN ---
  const guardarPlaca = () => {
    if (nuevaPlaca === '') return // Si está vacío, no hace nada
    
    // Guardamos la nueva placa en la lista
    // (...listaPlacas significa: "mantén lo que ya había y agrega la nueva")
    setListaPlacas([...listaPlacas, nuevaPlaca])
    
    // Limpiamos el cuadrito de texto
    setNuevaPlaca('')
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>🛠️ Registro de Ingresos</h1>

      {/* SECCIÓN DE ENTRADA */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Escribe la PLACA..." 
          value={nuevaPlaca}
          onChange={(e) => setNuevaPlaca(e.target.value.toUpperCase())} // Lo ponemos en mayúsculas automático
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button onClick={guardarPlaca} style={{ padding: '10px', cursor: 'pointer' }}>
          REGISTRAR CAMIÓN
        </button>
      </div>

      <hr />

      {/* SECCIÓN DE LISTA (Mapeo de datos) */}
      <h3>Camiones en el taller ({listaPlacas.length})</h3>
      <ul>
        {listaPlacas.map((placa, index) => (
          <li key={index} style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue' }}>
             🚛 Camión Placa: {placa}
          </li>
        ))}
      </ul>
    </div>
  )
}