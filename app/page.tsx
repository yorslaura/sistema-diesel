'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  // 1. EL CEREBRO (ESTADO)
  // 'clics' empieza en 0 y 'setClis' es la función para aumentar el número.
  const [clics, setClics] = useState(0)
  // Definimos la meta
  const META_CLICS = 40
  // Calculamos si está roto. Esto es 'true' cuando llegamos a 40.
  const estaRoto = clics >= META_CLICS

  // Estado extra para una pequeña animación al hacer clic
  const [animarGolpe, setAnimarGolpe] = useState(false)

  // 2. LA ACCIÓN (FUNCIÓN AL HACER CLIC)
  const golpearHuevo = () => {
    if (!estaRoto) {
      setClics(clics + 1)
      // Activamos una pequeña animación de "temblor"
      setAnimarGolpe(true)
      setTimeout(() => setAnimarGolpe(false), 150) // Desactiva el temblor rápido
    }
  }

  // Calculamos cuánto falta para que se rompa (para mostrar un porcentaje visual)
  const progreso = (clics / META_CLICS) * 100

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 p-4 overflow-hidden">
      
      {/* --- ESCENA 1: EL HUEVO (Se muestra si NO está roto) --- */}
      {!estaRoto && (
        <div className="text-center relative">
          {/* Barra de progreso superior */}
          <div className="w-64 h-4 bg-gray-200 rounded-full mb-8 overflow-hidden shadow-inner border border-gray-300 mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-yellow-400 transition-all duration-300 ease-out"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>

          {/* EL HUEVO CUTE (Dibujado con CSS) */}
          <div className="relative group cursor-pointer select-none no-tap-highlight" onClick={golpearHuevo}>
            {/* Esta es la forma del huevo usando bordes redondeados de Tailwind */}
            <div className={`w-56 h-72 bg-gradient-to-b from-[#FFF9E3] to-[#FFEDCC] shadow-[0_10px_30px_rgba(0,0,0,0.1)] 
                 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border-4 border-white relative transition-transform duration-150 ease-in-out
                 ${animarGolpe ? 'animate-wiggle scale-95' : 'hover:scale-105 animate-float'}
            `}>
               {/* Un pequeño brillo para hacerlo cute */}
               <div className="absolute top-6 left-8 w-10 h-16 bg-white opacity-60 rounded-full rotate-[-20deg]"></div>
               
               {/* Grietas que aparecen según el progreso */}
               <div className="absolute inset-0 overflow-hidden rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] opacity-60 mix-blend-multiply pointer-events-none">
                {clics > 10 && <div className="absolute top-1/4 left-1/2 w-0.5 h-12 bg-gray-400 -rotate-12"></div>}
                {clics > 20 && <div className="absolute top-1/2 right-1/3 w-0.5 h-16 bg-gray-400 rotate-45"></div>}
                {clics > 30 && <div className="absolute bottom-1/3 left-1/3 w-0.5 h-20 bg-gray-400 -rotate-6"></div>}
               </div>
            </div>
            
            {/* Texto indicador debajo */}
            <p className="mt-6 text-gray-500 font-bold text-sm tracking-widest uppercase animate-pulse">
              {clics === 0 ? "¡Toca el huevo para empezar!" : `Faltan ${META_CLICS - clics} toques...`}
            </p>
          </div>
        </div>
      )}

      {/* --- ESCENA 2: LA SORPRESA (Se muestra si SÍ está roto) --- */}
      {estaRoto && (
        <div className="text-center max-w-md bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl animate-popIn border border-pink-100">
          {/* Icono de corazón animado */}
          <div className="text-6xl mb-4 animate-bounce">💖</div>
          
          {/* El Mensaje Poético */}
          <h1 className="text-3xl font-serif text-gray-800 mb-6 leading-relaxed">
            Te amo mucho,<br />
            <span className="text-pink-600 italic">señorita esposa.</span>
          </h1>
          
          <div className="w-16 h-1 bg-pink-300 mx-auto mb-6 rounded-full"></div>

          <p className="text-gray-600 text-lg font-serif italic mb-10 leading-loose">
            "En cada latido resuena la certeza de que mi alma encontró su hogar en la tuya. Gracias por ser mi compañera de vida."
          </p>

          {/* El Footer Específico */}
          <div className="bg-pink-50 py-3 px-6 rounded-xl inline-block border border-pink-200 transform -rotate-2">
             <p className="text-sm font-bold text-pink-800 tracking-wide">
               para (Judith-grosera y malcriada)
             </p>
          </div>
        </div>
      )}

    </main>
  )
}