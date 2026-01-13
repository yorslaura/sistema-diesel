'use client'
import { useState } from "react"
import { text } from "stream/consumers"
export default function Home() {
  const [ruta, setRuta] =useState('menu-principal')
  return (
    <div style={{ padding: '20px'}}>
      <nav style={{ marginBottom: '20px', display: 'flex',gap: '10px'}}>
          <button onClick={() =>
          setRuta('menu-principal')}>Inicio</button>
          <button onClick={() =>
          setRuta('pagina-taller')}>Ir a taller</button>
          <button onClick={() =>
          setRuta('pagina-bodega')}>Ir a bodega</button>
      </nav>
      <hr />
      {ruta === 'menu-principal' && (
        <section>
          <h1>Bienvenido al Sistema</h1>
          <p>Elije una opcion arriba para navegar.</p>
        </section>
      )}
      {ruta === 'pagina-taller' && (
        <section>
          <h1>Sector: Taller mecanico</h1>
          <button onClick={() =>
            alert('Registrando...')}>Boton de prueba en Taller</button>
        </section>
      )}
      {ruta === 'pagina-bodega' && (
        <section>
          <h1>Bodega de repuestos</h1>
          <input type="text" placeholder="Buscar repuesto..."/>
        </section>
      )}
    </div>
  )
}