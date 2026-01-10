'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [enviando, setEnviando] = useState(false)

  const gestionarOrden = async (e: any) => {
    e.preventDefault()
    setEnviando(true)

    const formData = new FormData(e.target)
    const cliente = formData.get('cliente') as string
    const placa = formData.get('placa') as string
    const falla = formData.get('falla') as string
    const fotoFile = (document.getElementById('foto') as HTMLInputElement).files?.[0]

    let fotoUrl = ''

    // 1. Subir foto si existe
    if (fotoFile) {
      const nombreFoto = `${Date.now()}-${placa}.jpg`
      const { data } = await supabase.storage.from('fotos-camiones').upload(nombreFoto, fotoFile)
      if (data) {
        const { data: urlData } = supabase.storage.from('fotos-camiones').getPublicUrl(nombreFoto)
        fotoUrl = urlData.publicUrl
      }
    }

    // 2. Guardar en Base de Datos
    const { error } = await supabase.from('ordenes').insert([{ cliente, placa, falla, foto_url: fotoUrl }])

    if (error) {
      alert("Error: " + error.message)
    } else {
      // 3. Abrir WhatsApp automáticamente
      const mensaje = `*ALICAR AUTOMOTRIZ*%0A*Orden de Servicio*%0A%0A*Cliente:* ${cliente}%0A*Placa:* ${placa}%0A*Falla:* ${falla}${fotoUrl ? `%0A*Foto:* ${fotoUrl}` : ''}`
      window.open(`https://wa.me/?text=${mensaje}`, '_blank')
      e.target.reset()
    }
    setEnviando(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-blue-900 text-white p-6 text-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wider">ALICAR AUTOMOTRIZ</h1>
      </header>

      <main className="p-4 max-w-md mx-auto">
        <form onSubmit={gestionarOrden} className="bg-white p-6 rounded-2xl shadow-xl space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cliente</label>
            <input name="cliente" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="Nombre completo" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Placa</label>
            <input name="placa" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl uppercase" placeholder="ABC-123" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Falla Reportada</label>
            <textarea name="falla" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" rows={3} placeholder="Detalles de la falla..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Foto del Vehículo</label>
            <input type="file" id="foto" accept="image/*" capture="environment" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>

          <button 
            type="submit" 
            disabled={enviando}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg ${enviando ? 'bg-gray-400' : 'bg-green-600 shadow-green-200 shadow-lg'}`}
          >
            {enviando ? 'Procesando...' : '🚀 Guardar y Enviar WhatsApp'}
          </button>
        </form>
      </main>
    </div>
  )
}