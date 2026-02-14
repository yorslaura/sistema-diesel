"use client";

import React, { useState, useRef, useEffect } from 'react';

// Interfaz para que TypeScript no de errores
interface PaginaCarta {
  titulo: string;
  contenido: string;
  fondo: string;
  colorTexto: string;
}

const LibroParaJudith = () => {
  const [pagina, setPagina] = useState(0);
  const [mostrarFinal, setMostrarFinal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reinicia el scroll al cambiar de página
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pagina, mostrarFinal]);

  // --- AQUÍ ESTÁN LAS 73 PÁGINAS PARA RELLENAR ---
  const diario: PaginaCarta[] = [
    { titulo: "04 Dic: El Inicio", contenido: "Escribe aquí cómo empezó todo...", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 2", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 3", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 4", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 5", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 6", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 7", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 8", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 9", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "Día 10", contenido: "", fondo: "#fff5f7", colorTexto: "#c9184a" },
    { titulo: "14 Dic: El Color", contenido: "Escribe aquí sobre el día del niño interior y la música de Noah Cyrus...", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 12", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 13", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 14", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 15", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 16", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 17", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 18", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 19", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 20", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 21", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 22", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 23", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 24", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 25", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 26", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "Día 27", contenido: "", fondo: "#fce4ec", colorTexto: "#ad1457" },
    { titulo: "31 Dic: Fin de Año", contenido: "Escribe aquí sobre la fiesta y tus deseos para ella...", fondo: "#f8bbd0", colorTexto: "#880e4f" },
    { titulo: "01 Ene", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 30", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 31", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 32", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 33", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 34", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 35", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 36", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 37", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 38", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 39", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 40", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 41", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 42", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 43", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 44", contenido: "", fondo: "#eceff1", colorTexto: "#455a64" },
    { titulo: "Día 45", contenido: "Enero: La fragilidad y Sol de William...", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 46", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 47", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 48", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 49", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 50", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 51", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 52", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 53", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 54", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 55", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 56", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 57", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 58", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 59", contenido: "", fondo: "#cfd8dc", colorTexto: "#37474f" },
    { titulo: "Día 60", contenido: "Febrero: La voz y la armadura...", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 61", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 62", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 63", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 64", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 65", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 66", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 67", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 68", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 69", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 70", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 71", contenido: "", fondo: "#b39ddb", colorTexto: "#311b92" },
    { titulo: "Día 72", contenido: "Mañana es el gran día...", fondo: "#b39ddb", colorTexto: "#311b92" },
  ];

  const actual = diario[pagina];

  // Estilo de los botones para que no se pierdan
  const btnStyle: React.CSSProperties = {
    padding: '12px 25px',
    borderRadius: '30px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: actual.colorTexto === "#ffffff" ? "#512da8" : actual.colorTexto
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: actual.fondo, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px',
      fontFamily: 'serif',
      transition: 'background-color 0.8s ease'
    }}>
      
      {!mostrarFinal ? (
        <div style={{
          width: '100%', maxWidth: '750px', backgroundColor: '#fff', borderRadius: '5px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)', height: '85vh', display: 'flex', flexDirection: 'column'
        }}>
          {/* Cabecera */}
          <div style={{ padding: '30px', borderBottom: '1px solid #eee', textAlign: 'right', color: '#999' }}>
            <p>{actual.titulo}</p>
          </div>

          {/* Cuerpo con Scroll para tus textos largos */}
          <div ref={scrollRef} style={{ padding: '40px', overflowY: 'auto', flex: 1, textAlign: 'justify' }}>
            <p style={{ color: actual.colorTexto === "#ffffff" ? "#333" : actual.colorTexto, lineHeight: '2.2', fontSize: '1.2rem' }}>
              {actual.contenido}
            </p>
            <div style={{ height: '50px' }}></div>
          </div>

          {/* Navegación */}
          <footer style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee' }}>
            <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 0} style={btnStyle}>Atrás</button>
            <span style={{ alignSelf: 'center', color: '#ccc' }}>Página {pagina + 1} de 73</span>
            <button 
              onClick={() => pagina === 71 ? setMostrarFinal(true) : setPagina(pagina + 1)} 
              style={{ ...btnStyle, backgroundColor: actual.colorTexto === "#ffffff" ? "#512da8" : actual.colorTexto, color: '#fff' }}
            >
              {pagina === 71 ? "Llegar al Final" : "Siguiente"}
            </button>
          </footer>
        </div>
      ) : (
        /* --- PÁGINA 73: EL FINAL --- */
        <div style={{ 
          maxWidth: '650px', backgroundColor: '#fff', padding: '60px', borderRadius: '15px', 
          textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', animation: 'aparecer 1.5s' 
        }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>14 de Febrero</h1>
          <div style={{ textAlign: 'justify', lineHeight: '2.2', color: '#333', fontStyle: 'italic', fontSize: '1.2rem' }}>
            <p>Gracias por todo, Judith. Por los colores de diciembre y la armadura de febrero.</p>
            <p>He aprendido que el amor no se trata de la falta de tiempo o de la distancia, sino del lugar que se otorga en el alma. Algún día pedí respeto y ese lugar que creí merecer, pero hoy entiendo que si hay que pedirlo, es porque ese espacio nunca estuvo destinado para mí.</p>
            <p>Ya no oirás mis quejas, Judith. He entendido que mis palabras eran ruido en un horizonte donde tus ojos ya no me buscan. Acepto que mi silueta ya no encaja en tu mirada, y por ese mismo amor que te tengo, hoy decido dejar de suplicar por lo que no nace de ti.</p>
            <p>Te amo infinitamente. Cuido conmigo ese regalito de dos orejas grandes, guardado para cuando llegues o yo vaya. Él será el único testigo de lo que quise construir contigo y no pudo ser.</p>
            <p style={{ textAlign: 'center', marginTop: '30px', fontWeight: 'bold' }}>Adiós, mi señora esposa. ❤️</p>
          </div>
          <button onClick={() => { setMostrarFinal(false); setPagina(0); }} style={{ marginTop: '40px', border: 'none', background: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#aaa' }}>
            Volver a leer
          </button>
        </div>
      )}

      <style>{`
        @keyframes aparecer { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LibroParaJudith;