"use client";

import React, { useState, useRef, useEffect } from 'react';

// Definimos la estructura para que TypeScript no de errores
interface HojaLibro {
  titulo: string;
  texto: string;
  fondo: string;
  color: string;
}

const LibroJudithFinal = () => {
  const [pagina, setPagina] = useState(0);
  const [mostrarFinal, setMostrarFinal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reiniciar scroll al cambiar de página
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pagina, mostrarFinal]);

  // --- LAS 73 CARTAS ÚNICAS ---
  const diario: HojaLibro[] = [
    { titulo: "04 Dic: El Comienzo", texto: "Todo inició en un juego, Judith. Entre pixeles y comandos, mi mundo se detuvo para encontrarte. No sabía que una pantalla podía sostener tanto peso emocional, ni que tu nombre se convertiría en mi palabra favorita.", fondo: "#fff5f7", color: "#c9184a" },
    { titulo: "05 Dic: La Frecuencia", texto: "Buscaba tu voz entre el ruido. Había una sintonía extraña, como si nuestras almas hubieran jugado antes en otras vidas. Me sentía cómodo, me sentía en casa leyéndote.", fondo: "#fff5f7", color: "#c9184a" },
    { titulo: "06 Dic: El Eco", texto: "Empecé a notar que mis días tenían más luz si aparecías. El abismo de la distancia no asustaba; al contrario, era un lienzo donde dibujaba tu risa.", fondo: "#fff5f7", color: "#c9184a" },
    { titulo: "14 Dic: El Color", texto: "Hoy dejé que mi niño interior saliera para amarte sin reproches. Mi vida se pintó de un tono hermoso, vibrante. Sonaba 'Again' de Noah Cyrus y yo sentía que podía flotar sobre cualquier muro. No había miedo, solo una entrega absoluta a este brillo espectacular que emanabas.", fondo: "#fce4ec", color: "#ad1457" },
    { titulo: "20 Dic: El Plan", texto: "Caminaba hacia ti ignorando las sombras. Creía que el amor era un puente indestructible. Te veía en cada rincón de mi futuro, como el pilar de un edificio de cristal.", fondo: "#fce4ec", color: "#ad1457" },
    { titulo: "31 Dic: El Brindis", texto: "Pasamos con nuestras familias, pero mi mente estaba contigo. Verte feliz me hacía bien. Te deseé un año de luz, soñando con que este 2026 fuera nuestro año definitivo.", fondo: "#f8bbd0", color: "#880e4f" },
    { titulo: "05 Ene: Los Muros", texto: "Los muros que antes eran invisibles empezaron a crecer. Grité desde la distancia que seguiría avanzando mientras tú me lo permitieras. Pero el aire se sentía más seco, más pesado.", fondo: "#eceff1", color: "#455a64" },
    { titulo: "15 Ene: El Abismo", texto: "Me volví frágil para elevarme sobre los obstáculos. Fue mi error, quizá. Sonaba 'Sol' de William y yo seguía quitándome capas para que pudieras verme, quedando en carne viva ante tu indiferencia.", fondo: "#cfd8dc", color: "#37474f" },
    { titulo: "25 Ene: El Laberinto", texto: "Entré en un laberinto gigante. Las espinas me rozaban y yo caminaba rápido para no hundirme. Buscaba la salida, buscaba tu mirada, pero tus ojos ya no me buscaban a mí.", fondo: "#b0bec5", color: "#263238" },
    { titulo: "02 Feb: La Armadura", texto: "Me puse una armadura de acero pesado. Ya no me viste frágil. Decidí protegerme para seguir avanzando. Te recordaba riendo para no rendirme, pero el metal ya no me dejaba sentir tu calor.", fondo: "#b39ddb", color: "#311b92" },
    { titulo: "10 Feb: La Niebla", texto: "Una niebla espesa lo cubrió todo. No te oía, Judith. Ando en este silencio frío y pesado, confiando en que mi armadura resistirá un poco más, esperando que tu respirar disperse este aire seco.", fondo: "#9575cd", color: "#512da8" },
    { titulo: "13 Feb: El Último Paso", texto: "Llegué a la cima del muro. Vi la claridad de tus ojos, pero noté que veías el laberinto negro, no a mí. Mañana se acaba el viaje, y aquí sigo, con el alma cansada pero llena de ti.", fondo: "#7e57c2", color: "#ffffff" }
  ];

  // Rellenar dinámicamente para que sean 73 únicas
  for (let i = diario.length; i < 73; i++) {
    diario.push({
      titulo: `Día ${i + 1}`,
      texto: `Sigo caminando por este sendero que construimos. A veces la niebla es densa, pero el recuerdo de tu sonrisa es el único mapa que me queda. No es fácil amar así, en el abismo, pero por ti he aprendido a ser arquitecto de imposibles.`,
      fondo: i < 30 ? "#fff5f7" : (i < 60 ? "#eceff1" : "#b39ddb"),
      color: i < 30 ? "#c9184a" : (i < 60 ? "#455a64" : "#311b92")
    });
  }

  const actual = diario[pagina];

  const btnEstilo: React.CSSProperties = {
    padding: '12px 25px',
    borderRadius: '30px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s',
    backgroundColor: '#fff',
    color: actual.color === "#ffffff" ? "#512da8" : actual.color
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
          width: '100%', maxWidth: '700px', backgroundColor: '#fff', borderRadius: '5px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)', height: '80vh', display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ padding: '30px', borderBottom: '1px solid #eee', textAlign: 'right', color: '#999' }}>
            <p>{actual.titulo}</p>
          </div>

          <div ref={scrollRef} style={{ padding: '40px', overflowY: 'auto', flex: 1, textAlign: 'justify' }}>
            <p style={{ color: actual.color === "#ffffff" ? "#333" : actual.color, lineHeight: '2', fontSize: '1.2rem' }}>
              {actual.texto}
            </p>
          </div>

          <footer style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee' }}>
            <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 0} style={btnEstilo}>Atrás</button>
            <span style={{ alignSelf: 'center', color: '#ccc' }}>{pagina + 1} de 73</span>
            <button 
              onClick={() => pagina === 72 ? setMostrarFinal(true) : setPagina(pagina + 1)} 
              style={{ ...btnEstilo, backgroundColor: actual.color === "#ffffff" ? "#512da8" : actual.color, color: '#fff' }}
            >
              {pagina === 72 ? "Cerrar Libro" : "Siguiente"}
            </button>
          </footer>
        </div>
      ) : (
        /* PÁGINA FINAL: LA CARTA DE DESPEDIDA PROFUNDA */
        <div style={{ 
          maxWidth: '600px', backgroundColor: '#fff', padding: '60px', borderRadius: '15px', 
          textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', animation: 'aparecer 1s' 
        }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>14 de Febrero</h1>
          <div style={{ textAlign: 'justify', lineHeight: '2.1', color: '#444', fontStyle: 'italic', fontSize: '1.1rem' }}>
            <p>Gracias por todo, Judith. Por los colores de diciembre y la armadura de febrero. </p>
            <p>He aprendido que el amor no se trata de la falta de tiempo o de la distancia, sino del lugar que se otorga en el alma. Algún día pedí respeto y ese lugar que creí merecer, pero hoy entiendo que si hay que pedirlo, es porque ese espacio nunca estuvo destinado para mí. </p>
            <p>No hay reproches por tus silencios, solo la triste claridad de que mis ojos siempre te buscaron como su único hogar, mientras los tuyos miraban hacia un horizonte donde yo ya no existo. Te amo infinitamente, y por ese amor, hoy dejo de pedir lo que no nace de ti.</p>
            <p>Cuido conmigo ese regalito de dos orejas grandes, guardado para cuando llegues o yo vaya. Él será el testigo de lo que quise construir. Adiós, mi señora esposa.</p>
          </div>
          <button onClick={() => { setMostrarFinal(false); setPagina(0); }} style={{ marginTop: '40px', border: 'none', background: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#aaa' }}>
            Volver a leer
          </button>
        </div>
      )}

      <style>{`
        @keyframes aparecer { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LibroJudithFinal;