'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [enviando, setEnviando] = useState(false)
  const [registros, setRegistros] = useState<any[]>([])
  const [esAdmin, setEsAdmin] = useState(false)
  const [pin, setPin] = useState('')

  const cargarDatos = async () => {
    const { data, error } = await supabase
      .from('ordenes')
      .select('*')
      .order('id', { ascending: false }) 
    if (data) setRegistros(data)
  }

  useEffect(() => { cargarDatos() }, [])

  const verificarPin = () => {
    if (pin === '1212') {
      setEsAdmin(true)
    } else {
      alert("PIN Incorrecto")
    }
  }

  const guardar = async (e: any) => {
    e.preventDefault()
    setEnviando(true)
    const fd = new FormData(e.target)
    const foto = (document.getElementById('foto') as HTMLInputElement).files?.[0]
    let url = ''

    if (foto) {
      const nom = `${Date.now()}-${fd.get('placa')}.jpg`
      const { data } = await supabase.storage.from('fotos-camiones').upload(nom, foto)
      if (data) url = supabase.storage.from('fotos-camiones').getPublicUrl(nom).data.publicUrl
    }

    await supabase.from('ordenes').insert([{ 
      cliente: fd.get('cliente'), 
      placa: fd.get('placa'), 
      falla: fd.get('falla'), 
      foto_url: url 
    }])

    const msg = `*ALICAR*%0A*Cliente:* ${fd.get('cliente')}%0A*Placa:* ${fd.get('placa')}${url ? `%0A*Foto:* ${url}` : ''}`
    window.open(`https://wa.me/?text=${msg}`, '_blank')
    e.target.reset()
    setEnviando(false)
    cargarDatos()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20 text-black">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-xl font-bold text-center mb-6 text-blue-900 border-b pb-4 uppercase">Alicar Automotriz</h1>
        
        <form onSubmit={guardar} className="space-y-4">
          <input name="cliente" placeholder="Nombre del cliente" className="w-full p-2 border rounded bg-white" required />
          <input name="placa" placeholder="Placa" className="w-full p-2 border rounded bg-white" required />
          <textarea name="falla" placeholder="Falla detectada..." className="w-full p-2 border rounded bg-white" required />
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <label className="text-xs font-bold text-blue-800 block mb-2">FOTO DEL VEHÍCULO:</label>
            <input type="file" id="foto" accept="image/*" capture="environment" className="w-full text-sm" />
          </div>

          <button disabled={enviando} className="w-full bg-green-600 text-white p-4 rounded-xl font-bold shadow-md">
            {enviando ? 'GUARDANDO...' : '💾 GUARDAR Y ENVIAR'}
          </button>
        </form>

        <div className="mt-12 border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-extrabold text-gray-800">📋 HISTORIAL</h2>
            {!esAdmin && (
              <div className="flex gap-1">
                <input 
                  type="password" 
                  placeholder="PIN" 
                  className="w-16 p-1 border rounded text-center text-xs bg-gray-50"
                  onChange={(e) => setPin(e.target.value)}
                />
                <button onClick={verificarPin} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded font-bold">ENTRAR</button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!esAdmin ? (
              <p className="text-center text-gray-400 text-xs italic">Ingresa el PIN (1212) para ver registros</p>
            ) : (
              registros.map((r) => (
                <div key={r.id} className="p-4 bg-white rounded-lg border-l-4 border-blue-600 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900 uppercase text-sm">{r.cliente}</span>
                    <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{r.placa}</span>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{r.falla}</p>
                  {r.foto_url && (
                    <a href={r.foto_url} target="_blank" className="inline-block mt-3 text-[10px] font-bold text-blue-600 underline">📸 VER FOTO</a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}