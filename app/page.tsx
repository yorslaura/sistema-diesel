'use client'
import { useState } from 'react'

export default function Home() {
  // --- EL CEREBRO ---
  const [pin, setPin] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(false)

  const handleLogin = () => {
    // Por ahora validamos con el PIN que me diste
    if (pin === '1212') {
      setIsLoggedIn(true)
      setError(false)
    } else {
      setError(true)
      setPin('') // Limpiamos si falla
    }
  }

  // --- VISTA 1: LOGIN ESTILO "PERRÓN" ---
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decoración de fondo (Efecto de luces industriales) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>

        <div className="w-full max-w-md z-10">
          {/* LOGO Y NOMBRE */}
          <div className="text-center mb-10 animate-fade-in-down">
            <div className="inline-block p-4 rounded-full bg-gradient-to-b from-gray-700 to-black border border-gray-600 shadow-2xl mb-4">
              {/* Aquí simulamos el logo con un icono de engranaje grande */}
              <span className="text-6xl">⚙️</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
              ALICAR
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 not-italic">
                AUTOMOTRIZ
              </span>
            </h1>
            <p className="text-gray-500 font-bold tracking-[0.3em] text-xs mt-2">SISTEMA DE GESTIÓN DIESEL</p>
          </div>

          {/* TARJETA DE ACCESO */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-white text-center font-bold mb-6 tracking-widest text-sm uppercase">Acceso Restringido</h2>
            
            <div className="space-y-4">
              <input 
                type="password" 
                placeholder="INGRESA TU PIN" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className={`w-full bg-black/40 border-2 ${error ? 'border-red-500' : 'border-gray-700'} rounded-2xl p-4 text-center text-3xl text-white font-mono tracking-[0.5em] focus:outline-none focus:border-orange-500 transition-all`}
              />
              
              {error && <p className="text-red-500 text-center text-xs font-bold animate-bounce">⚠️ PIN INCORRECTO</p>}

              <button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-orange-600 to-red-700 text-white font-black p-4 rounded-2xl shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] active:scale-95 transition-all uppercase tracking-widest"
              >
                ENTRAR AL SISTEMA
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-gray-600 text-[10px] uppercase font-bold tracking-widest">
            © 2024 ALICAR AUTOMOTRIZ - ALTA TECNOLOGÍA
          </p>
        </div>
      </main>
    )
  }

  // --- VISTA 2: PÁGINA VACÍA (Para ir por partes) ---
  return (
    <main className="min-h-screen bg-[#0f0f0f] p-6 text-white">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 className="text-xl font-black tracking-tighter">
          ALICAR <span className="text-orange-500">AUTOMOTRIZ</span>
        </h1>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="text-xs bg-gray-800 px-4 py-2 rounded-full font-bold hover:bg-red-900 transition"
        >
          CERRAR SESIÓN
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <div className="text-6xl mb-4">🚛</div>
        <h2 className="text-3xl font-bold text-gray-400">Panel Principal Vacío</h2>
        <p className="text-gray-600 mt-2">¿Qué botones quieres que pongamos aquí primero?</p>
      </div>
    </main>
  )
}