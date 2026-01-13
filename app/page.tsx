'use client'
import { useState } from 'react'

export default function Home() {
  // --- EL CEREBRO ---
  const [pin, setPin] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState(false)
  const [verLista, setVerLista] = useState(false)
  const [ordenes, setOrdenes] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({nombre: '', identificacion: '', placa: '', modelo: '', falla: ''})
  // funciones
  const guardarOrden = () => {
    if (!form.placa || !form.nombre) return
    alert("Llena los datos basicos")
    setOrdenes([...ordenes, {...form, id:Date.now()}])
    setForm({ nombre: '', identificacion: '', placa: '',modelo: '', falla: ''})
    setIsModalOpen(false)
  }

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

  // --- SEGUNDA PÁGINA (SOLO EDITAMOS ESTO) ---
  return (
    <main className="min-h-screen bg-[#0f0f0f] p-6 text-white relative">
      
      {/* 1. CABECERA CON BOTONES */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 className="text-xl font-black tracking-tighter">
          ALICAR <span className="text-orange-500">AUTOMOTRIZ</span>
        </h1>
        <div className="flex gap-2">
          {/* BOTÓN PARA CAMBIAR ENTRE INICIO Y LISTA */}
          <button 
            onClick={() => setVerLista(!verLista)} 
            className="text-xs bg-orange-600/20 text-orange-500 border border-orange-500/50 px-4 py-2 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all"
          >
            {verLista ? '🏠 INICIO' : '📋 VER ÓRDENES'}
          </button>
          
          <button 
            onClick={() => setIsLoggedIn(false)} 
            className="text-xs bg-gray-800 px-4 py-2 rounded-full font-bold"
          >
            CERRAR SESIÓN
          </button>
        </div>
      </div>

      {/* 2. CONTENIDO QUE CAMBIA (CENTRO) */}
      <div className="mt-8">
        {!verLista ? (
          /* VISTA A: BIENVENIDA */
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="text-6xl mb-4 animate-pulse">🛠️</div>
            <h2 className="text-3xl font-black text-gray-500 uppercase italic tracking-tighter">Panel de Gestión</h2>
            <div className="mt-6 p-6 bg-white/5 rounded-3xl border border-white/5 inline-block">
              <p className="text-orange-500 font-black text-5xl leading-none">{ordenes.length}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Trabajos Registrados</p>
            </div>
          </div>
        ) : (
          /* VISTA B: LISTA DE ÓRDENES */
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-orange-500 uppercase italic mb-6">Historial de Trabajos</h2>
            {ordenes.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl">
                <p className="text-gray-600 font-bold uppercase tracking-widest">No hay órdenes en memoria</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {ordenes.map((o) => (
                  <div key={o.id} className="bg-white/5 border border-gray-800 p-5 rounded-3xl hover:border-orange-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-orange-500 font-mono text-[10px] mb-1">PLACA: {o.placa}</p>
                        <h3 className="text-lg font-bold uppercase">{o.nombre}</h3>
                        <p className="text-gray-500 text-xs font-bold">{o.modelo} • {o.identificacion}</p>
                      </div>
                      <span className="bg-orange-600 text-[10px] px-2 py-1 rounded font-black italic">EN ESPERA</span>
                    </div>
                    <div className="mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-tighter">Diagnóstico Inicial:</p>
                      <p className="text-sm text-gray-300 italic">"{o.falla}"</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. BOTÓN FLOTANTE (+) PARA REGISTRAR */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 bg-orange-600 hover:bg-orange-500 w-16 h-16 rounded-full shadow-[0_0_30px_rgba(234,88,12,0.4)] flex items-center justify-center text-4xl font-light transition-transform active:scale-90 z-40"
      >
        +
      </button>

      {/* 4. VENTANITA DE REGISTRO (MODAL) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] border border-gray-800 w-full max-w-lg rounded-[2rem] p-8 shadow-2xl">
            <h2 className="text-2xl font-black mb-6 text-white uppercase italic tracking-tighter">
              Nueva <span className="text-orange-500">Orden</span>
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Nombre Cliente" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-sm focus:border-orange-500 outline-none" 
                  value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
                <input placeholder="DNI / RUC" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-sm focus:border-orange-500 outline-none"
                  value={form.identificacion} onChange={(e) => setForm({...form, identificacion: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Placa" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-sm uppercase focus:border-orange-500 outline-none"
                  value={form.placa} onChange={(e) => setForm({...form, placa: e.target.value.toUpperCase()})} />
                <input placeholder="Modelo" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-sm focus:border-orange-500 outline-none"
                  value={form.modelo} onChange={(e) => setForm({...form, modelo: e.target.value})} />
              </div>
              <textarea placeholder="Falla reportada..." className="bg-white/5 border border-gray-800 p-3 rounded-xl text-sm w-full h-24 focus:border-orange-500 outline-none"
                value={form.falla} onChange={(e) => setForm({...form, falla: e.target.value})} />
              
              <div className="flex gap-3 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-900 p-4 rounded-2xl font-bold text-gray-500">CANCELAR</button>
                <button onClick={guardarOrden} className="flex-1 bg-orange-600 p-4 rounded-2xl font-bold text-white shadow-lg">GUARDAR TRABAJO</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}