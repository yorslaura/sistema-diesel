'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [enviando, setEnviando] = useState(false)
  const [registros, setRegistros] = useState([])

  // Función para cargar el historial desde Supabase
  const cargarHistorial = async () => {
    const { data } = await supabase
      .from('ordenes')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setRegistros(data)
  }

  useEffect(() => {
    cargarHistorial()
  }, [])

  const gestionarOrden = async (e: any) => {
    e.preventDefault()
    setEnviando(true)

    const formData = new FormData(e.target)
    const cliente = formData.get('cliente') as string
    const placa = formData.get('placa') as string
    const falla = formData.get('falla') as string
    const fotoFile = (document.getElementById('foto') as HTMLInputElement).files?.[0]

    let fotoUrl = ''

    if (fotoFile) {
      const nombreFoto = `${Date.now()}-${placa}.jpg`
      const { data } = await supabase.storage.from('fotos-camiones').upload(nombreFoto, fotoFile)
      if (data) {
        const { data: urlData } = supabase.storage.from('fotos-camiones').getPublicUrl(nombreFoto)
        fotoUrl = urlData.publicUrl
      }
    }

    const { error } = await supabase.from('ordenes').insert([{ cliente, placa, falla, foto_url: fotoUrl }])

    if (error) {
      alert("Error: " + error.message)
    } else {
      const mensaje = `*ALICAR AUTOMOTRIZ*%0A*Orden de Servicio*%0A%0A*Cliente:* ${cliente}%0A*Placa:* ${placa}%0A*Falla:* ${falla}${fotoUrl ? `%0A%0A*Ver Foto:* ${fotoUrl}` : ''}`
      window.open(`https://wa.me/?text=${mensaje}`, '_blank')
      e.target.reset()
      cargarHistorial() // Actualiza la tabla automáticamente
    }
    setEnviando(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <header className="bg-blue-900 text-white p-6 text-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wider">ALICAR AUTOMOTRIZ</h1>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        {/* FORMULARIO */}
        <form onSubmit={gestionarOrden} className="bg-white p-6 rounded-2xl shadow-xl space-y-5 border border-slate-200">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cliente</label>
            <input name="cliente" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" placeholder="Nombre completo" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Placa</label>
            <input name="placa" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" placeholder="ABC-123" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Falla Reportada</label>
            <textarea name="falla" required className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg" placeholder="Detalles de la falla..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Foto del Vehículo</label>
            <input type="file" id="foto" accept="image/*" capture="environment" className="w-full text-sm text-gray-500" />
          </div>
          <button disabled={enviando} type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg">
            {enviando ? 'Guardando...' : '🚀 Guardar y Enviar WhatsApp'}
          </button>
        </form>

        {/* TABLA DE HISTORIAL */}
        <div className="mt-10 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 p-4">
            <h2 className="text-white font-bold">📋 Historial de Órdenes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-600 uppercase">Fecha</th>
                  <th className="p-4 text-xs font-bold text-slate-600 uppercase">Cliente / Placa</th>
                  <th className="p-4 text-xs font-bold text-slate-600 uppercase">Falla</th>
                  <th className="p-4 text-xs font-bold text-slate-600 uppercase">Foto</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((reg: any) => (
                  <tr key={reg.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-4 text-sm text-slate-500">{new Date(reg.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-sm">{reg.cliente}</div>
                      <div className="text-xs text-blue-600 font-mono">{reg.placa}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{reg.falla}</td>
                    <td className="p-4">
                      {reg.foto_url && (
                        <a href={reg.foto_url} target="_blank" className="text-blue-500 font-bold text-xs underline">VER FOTO</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}