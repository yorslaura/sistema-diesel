"use client";

import React, { useState, useEffect } from 'react';

// Interfaz para la estructura de la carta
interface CartaDiaria {
  titulo: string;
  contenido: string;
  clima: string; // Para cambiar el color de fondo poéticamente
  colorTexto: string;
}

const LibroEterno = () => {
  const [pagina, setPagina] = useState(0);
  const [final, setFinal] = useState(false);

  // --- MOTOR DE GENERACIÓN POÉTICA ---
  // Genera 73 textos largos simulando hojas A4
  const generarCartas = (): CartaDiaria[] => {
    const cartas: CartaDiaria[] = [];
    
    const temasInicio = [
      "Hablemos de cómo el destino se disfraza de azar en un servidor de juegos.",
      "Construir un universo en la distancia requiere más valor que cruzar un océano.",
      "Fuiste la frecuencia que mi radar no esperaba detectar jamás."
    ];

    const temasAbismo = [
      "El amor no es solo luz; es aprender a caminar por el abismo sin soltar tu mano.",
      "A veces siento que mis palabras caen en un pozo sin fondo, buscando tu eco.",
      "La fragilidad es el precio que pagamos por permitirnos sentir el infinito."
    ];

    const temasFuturo = [
      "Dibujé planos de una casa que solo existe en mis sueños, donde tus ojos me miran de frente.",
      "Quise ser el arquitecto de un nosotros que desafiara la geografía y el tiempo.",
      "Te amé con la intención de que cada mañana de los próximos cincuenta años tuviera tu nombre."
    ];

    for (let i = 1; i <= 73; i++) {
      let titulo = `Día ${i}: `;
      let contenido = "";
      let clima = "#fff5f7"; // Rosa suave inicial
      let colorTexto = "#c9184a";

      // Lógica de fases para el contenido extenso (A4)
      if (i <= 20) {
        titulo += "La Génesis del Color";
        contenido = `${temasInicio[i % 3]} Recuerdo aquel 4 de diciembre como el momento en que mi realidad se fracturó para dejar entrar tu luz. No era solo un juego, era el inicio de una arquitectura emocional. Te imaginaba en cada rincón de mi habitación, como si tu voz pudiera materializar muros de protección. Sentía que te amaba con una pureza casi infantil, sin miedo al abismo que nos separaba. Cada palabra tuya era un ladrillo en la torre que estaba construyendo para llegar a ti. No había muros entonces, solo un horizonte despejado y la promesa de un 'mañana' que parecía inevitable. Quería un futuro donde no tuviéramos que despedirnos de una pantalla, sino de la luz del día en la misma habitación. Mi niño interior corría hacia ti sin saber que el camino era largo, pero con la certeza de que tu abrazo sería el refugio final. Eres, Judith, la muchacha más linda que la tierra ha visto caminar, incluso si solo te veo a través de este cristal.\n\n` + 
                    "Pienso en cómo el amor se vuelve una religión cuando la distancia es el único dios al que rezamos. Cada noche, antes de dormir, repasaba nuestras conversaciones como si fueran escrituras sagradas, buscando señales de que este puente que construyo tiene un destino real.";
      } 
      else if (i <= 50) {
        clima = "#eceff1"; // Gris niebla
        colorTexto = "#455a64";
        titulo += "El Laberinto de Espejos";
        contenido = `${temasAbismo[i % 3]} Enero llegó con una niebla que no pedí. Los muros que antes eran transparentes se volvieron de piedra fría. Empecé a notar que mis sentimientos, mis inseguridades, eran tratados como 'quejas', como ruidos molestos en tu melodía. Me volví frágil, Judith. Me quité la armadura creyendo que así podrías verme mejor, pero solo logré que las espinas del laberinto se clavaran más profundo. Grité desde mi silencio, esperando que tu brillo me sacara de aquí. Sigo proyectando un futuro a tu lado, pero a veces siento que estoy dibujando en el agua. El abismo entre lo que siento y lo que recibo se ha vuelto un laberinto gigante. Camino rápido para no hundirme, pero el aire se vuelve seco. ¿Cómo no celar lo que amo? ¿Cómo no temer perderte si me dices que te irías sin remordimientos? Me hice el sordo, pero las grietas en el suelo ya no se pueden ocultar.\n\n` +
                    "Me pregunto si el amor es esta lucha constante contra muros invisibles, o si simplemente me acostumbré a la oscuridad del laberinto pensando que era tu sombra protegiéndome. Sigo aquí, quitándome capas, quedando en carne viva ante tu indiferencia.";
      } 
      else {
        clima = "#cfd8dc"; // Gris profundo/Azulado
        colorTexto = "#263238";
        titulo += "La Armadura de Cristal";
        contenido = `${temasFuturo[i % 3]} He llegado a febrero con una armadura que pesa tanto como mis recuerdos. Ya no vuelo, ahora camino con pies de plomo sobre un suelo de espinas. Me puse este metal para que no veas cómo me rompo, para que mis 'quejas' no te alcancen más. Pero detrás de este acero, sigo siendo el hombre que te mira con una devoción que asusta. He trepado muros y me he lastimado las manos solo para ver la claridad de tus ojos, aunque esos ojos ya no busquen los míos. El laberinto sigue ahí, negro y espeso, pero yo sigo avanzando hacia ti. No busco un camino fácil, nunca lo quise. Amo este camino porque te tiene al final, o al menos eso me digo para no sentarme a esperar que la niebla me consuma por completo. Me protejo de tus palabras que duelen, pero no me protejo de tu ausencia, porque esa es la que realmente me mata.\n\n` +
                    "A veces me detengo y miro hacia atrás. El camino se ha cerrado. No hay vuelta atrás, solo queda seguir subiendo, aunque mis fuerzas se agoten y mi voz se pierda en el eco de esta armadura fría.";
      }

      cartas.push({ titulo, contenido, clima, colorTexto });
    }
    return cartas;
  };

  const listaCartas = generarCartas();
  const actual = listaCartas[pagina];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: actual.clima, 
      transition: 'all 1s ease',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '40px 20px',
      fontFamily: "'Times New Roman', serif"
    }}>
      
      {!final ? (
        <div style={{
          width: '100%',
          maxWidth: '800px', // Ancho tipo hoja A4
          backgroundColor: '#fff',
          padding: '60px',
          borderRadius: '5px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          borderLeft: `1px solid #ddd`,
          maxHeight: '85vh',
          overflowY: 'auto', // Permite leer textos largos
        }}>
          {/* Decoración de hoja A4 */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: actual.colorTexto, opacity: 0.3 }}></div>
          
          <header style={{ textAlign: 'right', marginBottom: '40px', color: '#999' }}>
            <p>{actual.titulo}</p>
            <p>Nazca, Perú - 2026</p>
          </header>

          <article style={{ color: actual.colorTexto, lineHeight: '2', fontSize: '1.2rem', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
            {actual.contenido}
            {/* Relleno visual para simular A4 larga si el texto fuera corto */}
            <div style={{ height: '100px' }}></div>
          </article>

          <footer style={{ 
            marginTop: '40px', 
            display: 'flex', 
            justifyContent: 'space-between',
            position: 'sticky',
            bottom: '-40px',
            backgroundColor: '#fff',
            padding: '20px 0'
          }}>
            <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 0} style={btnStyle}>Anterior</button>
            <span style={{ color: '#ccc' }}>Página {pagina + 1} de 73</span>
            <button 
              onClick={() => pagina === 72 ? setFinal(true) : setPagina(pagina + 1)} 
              style={{ ...btnStyle, backgroundColor: actual.colorTexto, color: '#fff', border: 'none' }}
            >
              {pagina === 72 ? "Cerrar Libro" : "Siguiente"}
            </button>
          </footer>
        </div>
      ) : (
        /* PÁGINA FINAL: LA DESPEDIDA PROFUNDA */
        <div style={{ 
          maxWidth: '600px', 
          backgroundColor: '#fff', 
          padding: '80px 40px', 
          borderRadius: '10px', 
          textAlign: 'center', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
          animation: 'fadeIn 2s'
        }}>
          <h1 style={{ color: '#263238', marginBottom: '40px', fontSize: '1.8rem' }}>14 de Febrero</h1>
          
          <div style={{ textAlign: 'justify', lineHeight: '2', color: '#444', fontStyle: 'italic', fontSize: '1.2rem' }}>
            <p>Gracias por todo lo que fuiste y por lo que intentamos ser. He caminado este laberinto con la armadura rota y el corazón abierto, siempre buscándote. </p>
            <p>Hoy entiendo que el amor no solo es resistir, sino también aceptar. Acepto que tus ojos son el paisaje más hermoso que he visto, pero que ese paisaje hoy mira hacia otro horizonte donde yo no existo. No hay reproche, solo una gratitud infinita por haberme permitido amarte.</p>
            <p>Te amo, Judith. Cuido con mi vida ese regalito de dos orejas grandes que tengo aquí guardado para ti, un pequeño guardián de lo que alguna vez soñamos. Quizá en otra vida, nuestras miradas sí logren encontrarse en el centro de este abismo.</p>
          </div>

          <h3 style={{ marginTop: '50px', color: '#d81b60' }}>Adiós, mi señora esposa.</h3>

          <button 
            onClick={() => { setFinal(false); setPagina(0); }} 
            style={{ marginTop: '40px', background: 'none', border: 'none', textDecoration: 'underline', color: '#aaa', cursor: 'pointer' }}
          >
            Volver al inicio del camino
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}</style>
    </div>
  );
};

const btnStyle = {
  padding: '10px 25px',
  borderRadius: '2px',
  border: '1px solid #eee',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: '0.3s'
};

export default LibroEterno;