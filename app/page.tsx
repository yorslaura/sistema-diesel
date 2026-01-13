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
  const [form, setForm] = useState({nombre: '', identificacion: '',telefono: '', placa: '', modelo: '', falla: ''})
  // funciones
  // --- FUNCIÓN PARA AUTOCOMPLETAR CLIENTE ---
  const buscarClienteExistente = (nombreEscrito: string) => {
    // Actualizamos el nombre en el formulario mientras escribes
    setForm(prev => ({ ...prev, nombre: nombreEscrito }))

    // Buscamos si ese nombre ya existe en lo que hemos guardado
    const coincidencia = ordenes.find(
      (o) => o.nombre.trim().toLowerCase() === nombreEscrito.trim().toLowerCase()
    )

    // Si lo encuentra y el usuario no ha escrito nada en DNI/Modelo, lo llenamos
    if (coincidencia) {
      setForm(prev => ({
        ...prev,
        identificacion: coincidencia.identificacion,
        telefono: coincidencia.telefono,
        nombre: coincidencia.nombre,
      }))
    }
  }

  // --- FUNCIÓN PARA GUARDAR LA ORDEN ---
  const guardarOrden = () => {
    // Solo Placa, Nombre y Falla son obligatorios
    if (!form.placa || !form.nombre || !form.falla ) {
      alert("⚠️ Faltan uno de los datos obligatorios: Placa, Nombre y Falla.")
      return
    }

    // Guardamos la orden (DNI y Modelo pueden ir vacíos)
    setOrdenes([...ordenes, { ...form, id: Date.now() }])
    
    // Limpiamos todo y cerramos la ventana (Sin moverte al historial)
    setForm({ nombre: '', identificacion: '', placa: '', modelo: '', falla: '', telefono: ''})
    setIsModalOpen(false)
    alert("✅ Trabajo registrado correctamente")
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
      
      {/* 1. CABECERA */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 className="text-xl font-black tracking-tighter uppercase italic">
          ALICAR <span className="text-orange-500">AUTOMOTRIZ</span>
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setVerLista(!verLista)} className="text-xs bg-orange-600/20 text-orange-500 border border-orange-500/50 px-4 py-2 rounded-full font-bold">
            {verLista ? '🏠 INICIO' : '📋 VER ÓRDENES'}
          </button>
          <button onClick={() => setIsLoggedIn(false)} className="text-xs bg-gray-800 px-4 py-2 rounded-full font-bold">SALIR</button>
        </div>
      </div>

      {/* 2. CONTENIDO CENTRAL */}
      <div className="mt-8">
        {!verLista ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-3xl font-black text-gray-500 uppercase italic">Panel de Gestión</h2>
            <div className="mt-6 p-6 bg-white/5 rounded-3xl border border-white/5 inline-block">
              <p className="text-orange-500 font-black text-5xl">{ordenes.length}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Órdenes Totales</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {ordenes.map(o => (
              <div key={o.id} className="bg-white/5 border border-gray-800 p-5 rounded-3xl">
                <p className="text-orange-500 font-mono text-[10px]">PLACA: {o.placa}</p>
                <h3 className="text-lg font-bold uppercase">{o.nombre}</h3>
                <p className="text-gray-500 text-xs">📞 {o.telefono} • {o.modelo}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. BOTÓN FLOTANTE (+) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 bg-orange-600 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-4xl z-40"
      >
        +
      </button>

      {/* 4. LA VENTANITA (MODAL) - AQUÍ ESTÁ EL ARREGLO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] border border-gray-800 w-full max-w-lg rounded-[2.5rem] p-8">
            <h2 className="text-2xl font-black mb-6 text-orange-500 uppercase italic">Nueva Orden</h2>
            
            <div className="space-y-4">
              <input placeholder="Nombre Cliente" className="w-full bg-white/5 border border-gray-800 p-3 rounded-xl text-white" 
                value={form.nombre} onChange={(e) => buscarClienteExistente(e.target.value)} />
              
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Teléfono" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-white"
                  value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})} />
                <input placeholder="DNI / RUC" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-white"
                  value={form.identificacion} onChange={(e) => setForm({...form, identificacion: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Placa" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-white uppercase font-bold"
                  value={form.placa} onChange={(e) => setForm({...form, placa: e.target.value.toUpperCase()})} />
                <input placeholder="Modelo" className="bg-white/5 border border-gray-800 p-3 rounded-xl text-white"
                  value={form.modelo} onChange={(e) => setForm({...form, modelo: e.target.value})} />
              </div>

              <textarea placeholder="Falla..." className="w-full bg-white/5 border border-gray-800 p-3 rounded-xl text-white h-24"
                value={form.falla} onChange={(e) => setForm({...form, falla: e.target.value})} />

              <div className="flex gap-3 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-900 p-4 rounded-2xl font-bold text-gray-500">CANCELAR</button>
                <button onClick={guardarOrden} className="flex-1 bg-orange-600 p-4 rounded-2xl font-bold text-white">GUARDAR</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}