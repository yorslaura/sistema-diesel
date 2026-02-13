"use client";

import React, { useState } from 'react';

interface PaginaNarrativa {
  t: string;
  c: string;
  bg: string;
  texto: string;
  musica?: string;
}

const LibroJudith = () => {
  const [pagina, setPagina] = useState(0);
  const [final, setFinal] = useState(false);

  const diario: PaginaNarrativa[] = [
    // --- DICIEMBRE: EL CHISPAZO (1-10) ---
    { t: "Día 1: El Encuentro", c: "Todo empezó entre pixeles. Un simple juego nos cruzó, y sin saberlo, estaba conociendo a la mujer que cambiaría mi mundo.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 2: La Curiosidad", c: "Aún no hablábamos mucho, pero ya buscaba tu nombre en la pantalla. Había algo en ti que me llamaba sin palabras.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 3: El Primer Latido", c: "Sentía una conexión extraña. No te conocía del todo, pero mi corazón ya se adelantaba a decirte que te amaba.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 4: Los Saludos", c: "Esperar un mensaje tuyo se volvió mi parte favorita del día. Empezaba a imaginar cómo sería tu voz.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 5: La Intuición", c: "Dicen que el amor tarda, pero yo ya sentía que eras tú. Una certeza silenciosa que crecía entre nosotros.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 6: Reflejos", c: "Me veía reflejado en tus ganas de jugar y compartir. Éramos dos extraños volviéndose indispensables.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 7: La Espera", c: "Cada hora que no hablábamos se sentía como un siglo. Ya no era un juego, era una necesidad de ti.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 8: Sintonía", c: "Empezamos a reír de lo mismo. La conexión se hacía más fuerte que cualquier código de programación.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 9: El Salto", c: "Decidí que no quería solo una compañera de juego, quería a la dueña de mis pensamientos.", bg: "#fff0f3", texto: "#c9184a" },
    { t: "Día 10: Vísperas", c: "Mañana sería el día. El día en que todo cambiaría y dejaría que mi alma se abriera por completo.", bg: "#fff0f3", texto: "#c9184a" },

    // --- DICIEMBRE: EL COLOR Y EL NIÑO INTERIOR (11-27) ---
    { t: "14 Dic: Mi Niño Interior", c: "Hoy dejé salir todo lo que soy. Te amé sin reproches, sin barreras. Mi vida se pintó de un color que nunca había visto. (Música: Again - Noah Cyrus)", bg: "#ffccd5", texto: "#a4133c", musica: "https://open.spotify.com/track/2S97p3XUqM8Nn591G1pYy6" },
    { t: "Día 12: Sin Frenos", c: "Esa vulnerabilidad de amarte como un niño me dio una paz inmensa. Todo a mi alrededor era hermoso.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 13: El Tono Perfecto", c: "Tu risa se volvió mi melodía favorita. El mundo tenía sentido porque tú estabas en él.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 14: Flotando", c: "Empecé a sentir que mis pies no tocaban el suelo. Caminaba hacia ti en un camino de nubes.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 15: Primeros Muros", c: "Noté unas sombras opacas en el camino. Eran muros delgados, pero no les di importancia. Eras más fuerte que ellos.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 16: Traspasando", c: "Atravesé esos primeros obstáculos con facilidad. Estaba tan lleno de ti que nada podía frenarme.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 17: Inquietud", c: "A veces sentía una pequeña duda en el aire, pero la borraba pensando en tu mirada.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 18: Seguridad", c: "Me convencí de que nuestro amor era invencible. Los muros solo eran pruebas que pasaríamos juntos.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 19: Brillo Perpetuo", c: "Cada día despertaba con un sol nuevo. Judith, te volviste mi razón para mejorar.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 20: El Camino", c: "Seguía avanzando hacia ti, ignorando cualquier señal de peligro. Estaba cegado por lo lindo de tu alma.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 21: Transparencia", c: "Me mostré tal cual soy. Te entregué mis miedos y mis sueños en una bandeja de plata.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 22: Luz Pura", c: "Tu amor me hacía sentir que podía con todo. El sistema de mi vida estaba finalmente optimizado.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 23: Navidad Cerca", c: "Solo pensaba en cómo sería compartir estas fechas contigo, aunque fuera en la distancia.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 24: Nochebuena", c: "Mi deseo de medianoche fuiste tú. Siempre tú, Judith.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 25: Regalos del Alma", c: "El mejor regalo no estaba bajo el árbol, estaba en los mensajes que me enviabas.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 26: Resaca de Amor", c: "Seguía procesando lo mucho que te amo. Es un sentimiento que no deja de crecer.", bg: "#ffccd5", texto: "#a4133c" },
    { t: "Día 27: El Último Empuje", c: "Preparándome para cerrar el año. Con la esperanza de que el próximo fuera aún mejor a tu lado.", bg: "#ffccd5", texto: "#a4133c" },

    // --- FIN DE AÑO (28-30) ---
    { t: "31 Dic: Fin de Año", c: "Pasamos con nuestras familias. Te deseé un feliz año con todo mi ser. Verte divertirte me llenó de alegría.", bg: "#f8bbd0", texto: "#880e4f" },
    { t: "Día 29: El Amanecer", c: "1 de enero. Un libro en blanco para nosotros. Estaba listo para escribir 365 páginas contigo.", bg: "#f8bbd0", texto: "#880e4f" },
    { t: "Día 30: Como Antes", c: "Los primeros días de enero se sentían perfectos. El amor seguía intacto, o eso creía yo.", bg: "#f8bbd0", texto: "#880e4f" },

    // --- ENERO: LA NIEBLA Y LA FRAGILIDAD (31-59) ---
    { t: "Día 31: Los Muros Reales", c: "Esos muros opacos se volvieron sólidos. Ya no era tan fácil pasar. Empecé a sentir el esfuerzo.", bg: "#eceff1", texto: "#455a64" },
    { t: "Día 32: Mi Grito", c: "Te grité desde la distancia: ¡Seguiré avanzando mientras tú me lo permitas! No me rendiría.", bg: "#eceff1", texto: "#455a64" },
    { t: "Día 33: Primer Error", c: "Me volví frágil para intentar 'volar' sobre los muros. Creí que ser transparente me ayudaría, pero me dolió.", bg: "#cfd8dc", texto: "#37474f" },
    { t: "Día 34: Vulnerabilidad", c: "Cualquier cosa me afectaba. Mi camino se llenó de pequeñas grietas que intentaba ignorar.", bg: "#cfd8dc", texto: "#37474f" },
    { t: "Día 35: Laberinto", c: "Sin darme cuenta, entré en un laberinto gigante. Los muros se levantaban por todas partes.", bg: "#cfd8dc", texto: "#37474f" },
    { t: "Día 36: Quitando Capas", c: "Me quité peso de encima para flotar más alto. Me desnudé de defensas, pero el frío del laberinto era fuerte.", bg: "#b0bec5", texto: "#263238" },
    { t: "Día 37: La Orilla", c: "Llegué a un borde y alcancé mis brazos. Quería que me vieras, Judith. Solo eso.", bg: "#b0bec5", texto: "#263238" },
    { t: "Día 38: Tu Mirada", c: "Me miraste y sentí un brillo espectacular. Me sentí fuerte por un segundo, amado de verdad.", bg: "#b0bec5", texto: "#263238" },
    { t: "Día 39: El Giro", c: "Pero luego volteaste. Creí que debía esforzarme más. Quizá no me habías visto lo suficiente.", bg: "#b0bec5", texto: "#263238" },
    { t: "Día 40: Menosprecio", c: "Mis inseguridades eran 'celos' para ti. Mis sentimientos eran 'quejas'. Empezó a doler el silencio.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 41: Silencio Sordo", c: "Me hice el sordo ante mis propios dolores. No quería ver que el camino se estaba rompiendo.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 42: Grietas", c: "El suelo bajo mis pies se agrietaba. Los muros crecían. Pero tu recuerdo aún me daba luz.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 43: Perdido", c: "Me perdí en el laberinto. Quise flotar de nuevo, pero mis alas estaban cansadas de intentarlo.", bg: "#cfd8dc", texto: "#37474f" },
    { t: "Día 44: Thorns", c: "Empezaron a salir espinas. Si flotaba, mi cuerpo se rompería. Si caminaba, me pincharía.", bg: "#cfd8dc", texto: "#37474f" },
    { t: "Día 45: Sol de Invierno", c: "Sonaba 'Sol' de William. Me sentía tan frágil que cualquier viento me quebraría. (Música: Sol - William)", bg: "#cfd8dc", texto: "#37474f", musica: "https://open.spotify.com/track/4" },
    { t: "Día 46: Cuestionamiento", c: "¿Vale la pena todo esto? Me golpeé la cara y me dije: El amor nunca es fácil. Seguiré.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 47: Paso Rápido", c: "Apreté el paso. Quería salir de aquí y encontrarte, sin importar las espinas.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 48: Laberinto Negro", c: "La oscuridad se cerró. Buscaba la salida, pero solo encontraba más muros de piedra fría.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 49: Sin Eco", c: "Gritaba tu nombre, pero mi voz no regresaba. Estaba solo en este tramo del camino.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 50: Memoria", c: "Cerré los ojos para recordarte. Fue lo único que evitó que me sentara a llorar en el suelo.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 51: Resistencia", c: "Mis manos sangraban por los muros, pero mi corazón seguía latiendo con tu nombre.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 52: Sombras de Celos", c: "Me dolía que pensaras que no confiaba. Solo te amaba tanto que me daba pavor perderte.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 53: La Herida", c: "Escucharte decir que podrías terminar sin remordimiento me hirió más que cualquier espina.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 54: Inseguridad", c: "¿Alguna vez me amaste de verdad? Esa pregunta empezó a perseguirme en la oscuridad.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 55: Persistencia", c: "Aun así, seguí. El amor no se trata de que sea fácil, sino de que sea real.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 56: Luz Lejana", c: "Vi un pequeño destello al fondo. No sabía si era la salida o una ilusión.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 57: Fatiga", c: "Mis piernas pesaban. El laberinto parecía no tener fin. Pero Judith estaba al final.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 58: El Desvío", c: "Queria regresar del camino, pero me obligué a volver. Mi único destino eres tú.", bg: "#90a4ae", texto: "#1c313a" },
    { t: "Día 59: Agonía de Enero", c: "Terminaba el mes más largo de mi vida. Esperando que febrero trajera algo de calor.", bg: "#90a4ae", texto: "#1c313a" },

    // --- FEBRERO: LA ARMADURA Y EL FINAL (60-72) ---
    { t: "Día 60: Tu Voz", c: "Llegó febrero y escuché tu melodía. Tu voz me abrigó de nuevo. Recordé tu risa.", bg: "#d1c4e9", texto: "#4527a0" },
    { t: "Día 61: La Armadura", c: "Decidí dejar de ser frágil. Me puse una armadura de acero para avanzar sin que las espinas me mataran.", bg: "#b39ddb", texto: "#311b92" },
    { t: "Día 62: El Segundo Aliento", c: "Esa arruguita en tu rostro al reír me dio la fuerza que me faltaba. Volví a caminar.", bg: "#b39ddb", texto: "#311b92" },
    { t: "Día 63: Callejo sin Salida", c: "Llegué a un tope. Miré atrás y el camino se había cerrado. Solo quedaba subir.", bg: "#b39ddb", texto: "#311b92" },
    { t: "Día 64: La Trepada", c: "Me lastimé las manos subiendo ese muro, pero logré llegar arriba. Te vi de nuevo.", bg: "#b39ddb", texto: "#311b92" },
    { t: "Día 65: Claridad", c: "Vi la claridad de tus ojos, aunque no me mirabas a mí. Veías el laberinto negro que tenías tú.", bg: "#b39ddb", texto: "#311b92" },
    { t: "Día 66: Negación al Retroceso", c: "Era fácil volver atrás, pero me negué. Mi amor es más grande que mi cansancio.", bg: "#7e57c2", texto: "#ffffff" },
    { t: "Día 67: Armadura Pesada", c: "Mi armadura se hizo más gruesa. Ya no me escuchabas quejarme. No porque no sufriera, sino porque no podía salir la voz.", bg: "#7e57c2", texto: "#ffffff" },
    { t: "Día 68: Silencio Frío", c: "Avanzo en este silencio pesado. Protegiéndome de todo, incluso de mis propias palabras.", bg: "#7e57c2", texto: "#ffffff" },
    { t: "Día 69: Niebla Espesa", c: "Una niebla lo cubrió todo. No veo ni oigo. Pero mi armadura es resistente.", bg: "#512da8", texto: "#ffffff" },
    { t: "Día 70: Tu Suspiro", c: "Solo quiero que tu suspiro se lleve esta niebla. Que tu luz repare mis grietas.", bg: "#512da8", texto: "#ffffff" },
    { t: "Día 71: Mi Intento", c: "Sigo aquí, intentándolo. No quiero que los muros desaparezcan si son parte de ti, solo quiero que me mires.", bg: "#4527a0", texto: "#ffffff" },
    { t: "Día 72: Vísperas de Valentín", c: "Me quito la armadura, no del todo, para decirte que mañana es nuestro día. Aquí te traigo en mi alma.", bg: "#311b92", texto: "#ffffff" }
  ];

  const irSiguiente = () => {
    if (pagina < diario.length - 1) setPagina(pagina + 1);
    else setFinal(true);
  };

  const irAtras = () => {
    if (pagina > 0) setPagina(pagina - 1);
    setFinal(false);
  };

  const p = diario[pagina];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: p.bg, transition: 'background-color 0.8s', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'serif' }}>
      {!final ? (
        <div style={{
          width: '100%', maxWidth: '420px', backgroundColor: '#fff', borderRadius: '20px 50px 50px 20px', 
          padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', borderLeft: `15px solid ${p.texto}`,
          minHeight: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ color: '#aaa', fontSize: '0.8rem', letterSpacing: '2px' }}>PÁGINA {pagina + 1}</h3>
            <h2 style={{ color: p.texto === "#ffffff" ? "#512da8" : p.texto, fontSize: '1.8rem', margin: '15px 0' }}>{p.t}</h2>
            <hr style={{ border: 'none', borderTop: `1px solid ${p.bg}`, marginBottom: '20px' }} />
            <p style={{ lineHeight: '1.8', color: '#444', fontSize: '1.1rem', fontStyle: 'italic' }}>
              "{p.c}"
            </p>
            {p.musica && (
              <a href={p.musica} target="_blank" rel="noreferrer" style={{ color: '#1DB954', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ marginRight: '8px' }}>🎧</span> Escuchar melodía de este día
              </a>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button onClick={irAtras} disabled={pagina === 0} style={btnS}>Atrás</button>
            <button 
              onClick={irSiguiente} 
              style={{ 
                ...btnS, 
                backgroundColor: p.texto === "#ffffff" ? "#ff4d6d" : p.texto, 
                color: '#fff', 
                border: 'none' 
              }}
            >
              {pagina === 72 ? "Abrir Corazón" : "Siguiente"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '600px', backgroundColor: '#fff', padding: '60px', borderRadius: '40px', textAlign: 'center', boxShadow: '0 20px 60px rgba(216, 27, 96, 0.3)', animation: 'fadeUp 1s' }}>
          <h1 style={{ color: '#d81b60', fontSize: '2.5rem' }}>14 de Febrero</h1>
          <p style={{ fontSize: '1.3rem', color: '#333', marginBottom: '30px' }}>
            <strong>Mi pedacito de coconut,</strong> eres la persona más valiente y hermosa que he conocido en mi vida.
          </p>
          <div style={{ textAlign: 'left', color: '#555', lineHeight: '1.7', marginBottom: '30px' }}>
            <p>Ya no oirás mis "quejas", porque esta armadura es pesada. Pero aquí sigo, esforzándome para que mis palabras no sean solo eso.</p>
            <p>Me enamoré de un camino difícil porque tú estás en él. Solo te pido una cosa: <strong>¿Puedes mirarme hacer el intento? ¿Soy el hombre que esperas?</strong></p>
          </div>
          <h2 style={{ color: '#ff4d6d' }}>Te amo infinitamente ❤️</h2>
          
          <div style={{ marginTop: '40px', padding: '30px', borderTop: '2px solid #eee' }}>
            <p style={{ fontStyle: 'italic', color: '#777', fontSize: '1.1rem' }}>
              "Tengo un regalito que lo voy a cuidar mucho hasta que llegues (o yo vaya)... es de dos orejas grandes, así como tú me gustas."
            </p>
          </div>

          <button 
            onClick={() => { setFinal(false); setPagina(0); }} 
            style={{ marginTop: '30px', background: 'none', border: 'none', textDecoration: 'underline', color: '#d81b60', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Volver a leer desde el inicio
          </button>
        </div>
      )}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        button:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

const btnS = { padding: '12px 24px', borderRadius: '30px', border: '1px solid #ddd', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' };

export default LibroJudith;