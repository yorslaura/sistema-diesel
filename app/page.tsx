"use client";

import React, { useState, useRef, useEffect } from 'react';

// Interfaz para asegurar que cada carta sea única y válida
interface Carta {
  t: string; // Título
  c: string; // Contenido largo (A4)
  bg: string; // Color de fondo
  tx: string; // Color de texto
}

const LibroFinal = () => {
  const [pagina, setPagina] = useState(0);
  const [final, setFinal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reiniciar el scroll al cambiar de página
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pagina, final]);

  // --- LAS 73 CARTAS ÚNICAS (EXTENSAS Y PROFUNDAS) ---
  const diario: Carta[] = [
    { t: "04 Dic: El Big Bang Digital", c: "Todo empezó en un rincón olvidado de un servidor, donde el azar decidió que nuestros nombres se cruzaran. No sabía que estaba ante la arquitecta de mi nuevo mundo. Aquel día, el tiempo se detuvo para observar cómo dos extraños empezaban a tejer un hilo invisible que desafiaría a la distancia y a la lógica misma. Fuiste el código que mi sistema no esperaba, pero que necesitaba desesperadamente para cobrar sentido.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "05 Dic: La Frecuencia", c: "Buscaba tu voz entre el ruido. No era solo hablar, era sintonizar con una esencia que se sentía familiar, como si mi alma te hubiera reconocido de otra vida. Cada palabra tuya era un trazo de color en un lienzo que yo creía terminado, pero que apenas empezaba a mostrar su verdadera forma.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "06 Dic: La Certeza", c: "Sentía que te amaba antes de entender el porqué. Es una locura amar a alguien que apenas descubres, pero hay latidos que no necesitan explicación. Eras un misterio que no quería resolver, sino habitar para siempre, un refugio que se construía con cada mensaje enviado a deshoras.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "07 Dic: El Horizonte", c: "Empezamos a proyectar un futuro que parecía sacado de un libro de cuentos. Dibujamos puentes donde otros veían abismos, y yo me convencí de que no había muro lo suficientemente alto para frenar lo que estaba naciendo entre nosotros. Mi único norte eras tú, Judith.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "08 Dic: Reflejos", c: "Me veía mejor a través de tus ojos. Me dabas ganas de ser el hombre que tú creías que yo era. Estaba aprendiendo un nuevo idioma, el de tu esencia, y cada sílaba era un bálsamo para mis cicatrices invisibles.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "09 Dic: La Entrega", c: "Decidí que no quería medias tintas. Quería ser el motivo de tu paz y el dueño de tus insomnios. El amor ya no era una posibilidad, era mi única verdad absoluta en un mundo lleno de dudas.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "10 Dic: Vísperas", c: "Sentía que mi vida estaba a punto de pasar del blanco y negro a un espectro infinito de colores. Solo faltabas tú para dar el primer pincelazo real sobre el lienzo de mis días.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "11 Dic: El Chispero", c: "Las conversaciones se volvieron incendios controlados de ternura. Ya no importaba el juego ni los pixeles, importaba esa vibración en el pecho que solo aparecía cuando aparecías tú en mi pantalla.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "12 Dic: El Peso del Aire", c: "Incluso el aire se sentía distinto. Había una gravedad nueva que me empujaba hacia ti, una fuerza que no entendía de kilómetros ni de husos horarios. Solo existíamos nosotros dos en un universo privado.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "13 Dic: Antes del Color", c: "Preparando el alma para lo que vendría. Sabía que después de mañana, nada volvería a ser igual. Estaba listo para dejar que mi niño interior tomara las riendas de este sentimiento.", bg: "#fff5f7", tx: "#c9184a" },
    { t: "14 Dic: El Estallido Cromático", c: "Hoy el mundo se pintó de un tono hermoso. Dejé salir a mi niño interior para amarte sin reproches ni barreras. Sonaba Noah Cyrus - Again y yo sentía que podía atravesar cualquier laberinto solo con recordarte. Judith, ese brillo que emanabas era mi único combustible, la razón por la cual el gris de mi vida se disolvía en una explosión de esperanza y alegría pura.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "15 Dic: Flotando", c: "Sentía que mis pies no tocaban el suelo. Caminaba por un pasillo de nubes donde el futuro se veía nítido y brillante. Quería construir una catedral de amor donde tú fueras la única luz que iluminara mis pasillos más oscuros.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "16 Dic: Muros Opacos", c: "Noté las primeras sombras, muros casi imperceptibles que intentaban obstruir mi paso. Pero no les di importancia; mi amor era un torrente que pasaba por encima de cualquier obstáculo con la gracia de quien se siente invencible.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "17 Dic: Inquietud", c: "Sentía una pequeña vibración en el aire, un presentimiento sordo. Pero me aferré a tu brillo con la fuerza de un náufrago que sabe que eres su única tabla de salvación en medio del océano.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "18 Dic: Transparencia", c: "Me mostré sin capas, vulnerable y real. Creí que al darte todo de mí, los muros se disolverían solos. Qué inocente fue mi amor al pensar que la entrega absoluta era el único requisito para la eternidad.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "19 Dic: Arquitectura", c: "Dibujé planos de una vida juntos. Casas, viajes, mañanas compartidas. Te veía en cada rincón de mi futuro, como la pieza central de un rompecabezas que finalmente encajaba.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "20 Dic: El Relieve", c: "Memorizaba cada curva de tu voz, cada gesto que adivinaba en tus mensajes. Te habías convertido en mi estudio favorito, en la única materia que deseaba cursar el resto de mis días.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "21 Dic: Navidad Cerca", c: "Imaginaba cómo sería el calor de tu presencia en estas fechas. La distancia me dolía, pero tu recuerdo era una fogata que mantenía mi invierno a raya.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "22 Dic: Resistencia", c: "Luchaba contra el tiempo que no teníamos. Cada segundo era una joya que quería guardar en mi memoria, un tesoro que me recordaba por qué valía la pena esperar.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "23 Dic: Sueños Llenos", c: "Dormía para encontrarte en el único lugar donde no había fronteras. Ahí, nuestros ojos se miraban de frente y no había pantallas de por medio, solo la verdad de lo que sentíamos.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "24 Dic: Nochebuena", c: "Mi deseo a medianoche fuiste tú. Siempre tú. En medio del brindis y la familia, mi mente volaba hacia tu país, buscando tu calor entre el ruido de los fuegos artificiales.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "25 Dic: El Regalo", c: "Agradecí al universo por haberte puesto en mi camino. Eres el regalo que no sabía que necesitaba, pero que ahora no puedo imaginar mi vida sin recibir.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "26 Dic: Resaca de Amor", c: "Seguía procesando la intensidad de este sentimiento. Mi pecho se sentía pequeño para tanto amor, como si estuviera intentando contener un océano en una taza de té.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "27 Dic: Despedida al Año", c: "Preparando el cierre de un ciclo que me dio lo más valioso. Estaba convencido de que el próximo año sería el de nuestro encuentro definitivo. Mi esperanza era una llama que nadie podía apagar.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "28 Dic: Inocencia", c: "Me reí de los miedos pasados. Creía que habíamos superado lo más difícil. Qué poco sabía sobre los laberintos que el destino nos tenía preparados en el siguiente capítulo.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "29 Dic: Silencios", c: "A veces el silencio entre nosotros decía más que mil palabras. Eran pausas llenas de significado, momentos donde nuestras almas se daban la mano en la distancia.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "30 Dic: Últimos Pasos", c: "Cerrando el año con la mano en el corazón. Te sentía tan cerca que el aire que respiraba parecía tener tu esencia. Mañana sería un nuevo inicio.", bg: "#fce4ec", tx: "#ad1457" },
    { t: "31 Dic: Fin de Año", c: "Pasamos con nuestras familias, pero mi alma estaba contigo. Te deseé un feliz año sabiendo que quería cada día de este nuevo ciclo a tu lado. Verte feliz, divirtiéndote, me llenó de un calor que me acompañó hasta el amanecer.", bg: "#f8bbd0", tx: "#880e4f" },
    { t: "01 Ene: Enero y la Calma", c: "Sentía que todo era como antes. Quise seguir avanzando, pero esos muros que antes eran invisibles se hacían cada vez más notorios. Seguiría intentando mientras tú me lo permitieras, pero el aire empezaba a cambiar.", bg: "#eceff1", tx: "#455a64" },
    { t: "02 Ene: La Grieta", c: "Apareció una pequeña fisura en el camino. Intenté ignorarla, pensando que era parte del paisaje, pero el frío que salía de ella me recordaba que nuestro suelo no era tan firme como soñaba.", bg: "#eceff1", tx: "#455a64" },
    { t: "03 Ene: Muros Reales", c: "Los muros ya no eran sombras; eran de piedra fría. Empezaron a obstruir mi paso y yo empecé a gritar tu nombre desde mi lado del laberinto, esperando un eco que me guiara de vuelta a ti.", bg: "#eceff1", tx: "#455a64" },
    { t: "04 Ene: Fragilidad", c: "Me volví frágil para poder elevarme y atravesar los obstáculos. Fue mi primer error: volverme tan vulnerable que cualquier palabra tuya que no fuera un abrazo me hería como una espina profunda.", bg: "#cfd8dc", tx: "#37474f" },
    { t: "05 Ene: El Grito", c: "Grité desde la distancia que, aunque los muros estuvieran aquí, seguiría avanzando. Me quité capas para ser más liviano, pero el frío del abismo empezó a calarme los huesos.", bg: "#cfd8dc", tx: "#37474f" },
    { t: "06 Ene: Sol de William", c: "Empezó a sonar Sol de William y yo seguía quitándome capas para flotar más alto. Cada peso que dejaba atrás era una defensa que perdía ante tu indiferencia creciente.", bg: "#cfd8dc", tx: "#37474f" },
    { t: "07 Ene: Laberinto", c: "Entré en un laberinto gigante sin darme cuenta. Las paredes se cerraban sobre mí y yo buscaba desesperadamente una salida que me llevara a tus ojos, pero solo encontraba más pasillos vacíos.", bg: "#cfd8dc", tx: "#37474f" },
    { t: "08 Ene: La Orilla", c: "Llegué a la orilla del abismo y alcé mis brazos intentando llamar tu atención. Quería que me vieras, que supieras que seguía aquí luchando por este nosotros que se nos escapaba de las manos.", bg: "#cfd8dc", tx: "#37474f" },
    { t: "09 Ene: El Brillo Fugaz", c: "Me miraste y sentí un brillo espectacular. Me sentí amado y fuerte por un segundo, pero luego vi cómo volteabas y creí que debía esforzarme más para que me vieras otro poco.", bg: "#cfd8dc", tx: "#37474f" },
    { t: "10 Ene: Menosprecio", c: "Mis inseguridades eran tratadas como celos por falta de confianza. Pero cómo no celar algo que amo y que me dice que terminaría conmigo sin sentir remordimiento alguno. Ese dolor empezó a agrietar mi camino.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "11 Ene: Sordera", c: "Me hice el sordo ante mi propio dolor. No quería ver que el camino se estaba rompiendo, que los muros eran cada vez más grandes y que tu brillo ya no me iluminaba a mí, sino al laberinto.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "12 Ene: Espinas", c: "El camino se llenó de espinas. Quise flotar de nuevo para ver la salida, pero mi cuerpo era tan frágil que se rompería sin reparos. Así que seguí avanzando a paso rápido, aunque me hiriera.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "13 Ene: Cuestionamiento", c: "Me cuestioné si realmente valía la pena atravesar todo esto. Me golpeé la cara y me dije: el amor nunca es fácil. Si realmente amo, el camino tiene que ser difícil. Y seguí caminando hacia el vacío.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "14 Ene: Laberinto Negro", c: "La oscuridad se apoderó de todo. Ya no veía tus manos ni escuchaba tus pasos. Estaba solo en el centro de mi propia devoción, intentando encontrar un rastro de lo que alguna vez fuimos.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "15 Ene: Inseguridad", c: "Sentía que cada paso que daba era un error. Si me acercaba mucho, te asfixiaba; si me alejaba, te perdía. Estaba atrapado en una paradoja de amor y miedo que me consumía por dentro.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "16 Ene: El Frío de Enero", c: "Este mes se siente como un invierno eterno en el alma. Busco tu calor pero solo encuentro respuestas cortas y muros de hielo que no puedo derretir con mis palabras desgastadas.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "17 Ene: Grietas", c: "El suelo se abrió. Mis certezas cayeron al fondo de un pozo que yo mismo cavé al amarte tanto. Ya no sé si estoy construyendo o simplemente esperando a que todo termine de colapsar.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "18 Ene: Silencios Largos", c: "Tus silencios duelen más que tus palabras. Son vacíos que yo lleno con mis miedos más profundos, intentando adivinar si todavía hay un lugar para mí en tu horizonte.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "19 Ene: El Peso", c: "Sentía el peso de este amor en mis hombros. Ya no me hacía volar, me hacía arrastrarme por el suelo. Pero seguía ahí, fiel a la promesa que le hice a mi niño interior en diciembre.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "20 Ene: Búsqueda", c: "Caminaba sin rumbo por el laberinto. A veces creía ver tu silueta, pero era solo el reflejo de mis propios deseos proyectados en las paredes frías de este encierro emocional.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "21 Ene: La Duda", c: "¿Alguna vez me amaste de verdad? Esa pregunta empezó a perseguirme como un fantasma. Si el amor dolía tanto, ¿entonces qué era lo que sentíamos en aquel diciembre de colores?", bg: "#90a4ae", tx: "#1c313a" },
    { t: "22 Ene: Resistencia Inútil", c: "Luchaba contra muros que tú misma levantabas. No entendía que el amor no es una guerra, sino un refugio. Pero yo estaba dispuesto a morir en esta batalla por nosotros.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "23 Ene: El Vacío", c: "Sentía que mis palabras caían en un pozo sin fondo. Te gritaba mi amor pero solo recibía el eco de mi propia desesperación. Estaba perdiendo la voz en medio del silencio.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "24 Ene: La Caída", c: "Caí en una trampa del laberinto. Me quedé atrapado entre espinas, mirando al cielo gris, esperando que bajaras a rescatarme. Pero el cielo seguía igual de indiferente.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "25 Ene: El Laberinto de Espejos", c: "Miraba a mi alrededor y solo veía versiones de mí mismo sufriendo. No estabas tú en ningún reflejo. Me di cuenta de que este laberinto solo lo estaba habitando yo.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "26 Ene: Desgaste", c: "Mis pies sangraban y mi corazón latía con cansancio. Ya no era amor, era inercia. Seguía caminando porque no sabía cómo detenerme sin romperme por completo.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "27 Ene: Niebla Espesa", c: "La niebla se volvió tan sólida que ya no podía ni ver mis propias manos. Estaba a ciegas, guiado solo por el recuerdo de un abrazo que se sentía a siglos de distancia.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "28 Ene: El Muro Final", c: "Llegué a un muro que parecía no tener fin. Me senté a su sombra, agotado, preguntándome si Judith estaba al otro lado o si ya se había marchado a otro laberinto.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "29 Ene: Agonía", c: "Terminaba enero y yo seguía perdido. El frío era mi único compañero. Esperaba que febrero trajera algo de calor, o al menos, la fuerza para dejar de caminar en círculos.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "30 Ene: El Último Aliento", c: "Cerrando un mes de sombras. Con lo poco que me quedaba, busqué un rincón seco para descansar antes de que febrero empezara a dictar sus nuevas reglas de hierro.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "31 Ene: Reflexión", c: "Miré hacia atrás. El camino de diciembre se veía tan lejano y pequeño. No podía creer que esa felicidad fuera real, o que este dolor fuera el precio por haberla sentido.", bg: "#90a4ae", tx: "#1c313a" },
    { t: "01 Feb: Tu Voz", c: "Llegó febrero y oí tu voz. Me sentí abrigado por tu melodía y recordé la arruguita de tu rostro al reír. Esos gestos hermosos me dieron un segundo aliento para no rendirme todavía.", bg: "#d1c4e9", tx: "#4527a0" },
    { t: "02 Feb: La Armadura", c: "Decidí caminar y ponerme una armadura tan fuerte que me dejara avanzar sin problemas. Ya no me mostré tan frágil, empecé a protegerme de lo que antes me rompía sin reparos.", bg: "#b39ddb", tx: "#311b92" },
    { t: "03 Feb: Calleja", c: "Llegué a un callejón sin salida. Mire hacia atrás y el camino se cerró. La única salida estaba arriba, y para llegar a ella necesitaba hacerme daño, pero estaba dispuesto a todo por verte.", bg: "#b39ddb", tx: "#311b92" },
    { t: "04 Feb: La Trepada", c: "Me lastimé, me dolió, pero pude llegar. Vi tu rostro y te miré con lo poco de fuerza que me queda. Mas no escuché tu voz, solo vi la claridad de tus ojos aunque no me mirases.", bg: "#b39ddb", tx: "#311b92" },
    { t: "05 Feb: Claridad", c: "Solo veías el laberinto gigante y negro que tenías tú, no lograbas verme ahí. Pero yo sí a ti, y eso fue suficiente para que mi armadura aguantara un día más de silencio y frío.", bg: "#b39ddb", tx: "#311b92" },
    { t: "06 Feb: Negación", c: "Era mucho más fácil retroceder y salir de ahí, pero mi amor es tan grande que me negué a hacerlo. Me ajusté las correas de mi armadura y seguí trepando por tu indiferencia.", bg: "#7e57c2", tx: "#ffffff" },
    { t: "07 Feb: Silencio de Hierro", c: "Mi armadura ya no me deja hablarte. No porque no quiera, sino porque es tan pesada que las palabras no salen. Te escucho y te veo, pero soy un espectro de metal a tu lado.", bg: "#7e57c2", tx: "#ffffff" },
    { t: "08 Feb: Fuerza Interior", c: "Con tus recuerdos me vuelvo más fuerte en mi mente. Sin mirar hacia atrás, simplemente busco la salida de este aire tan seco que intento dispersar con tu respirar imaginario.", bg: "#7e57c2", tx: "#ffffff" },
    { t: "09 Feb: Niebla Espesa", c: "Una niebla espesa que no me deja ver ni oír. Ando en este silencio tan frío y pesado, pero tranquila que mi armadura es resistente. Solo quiero salir de ahí y correr hacia ti.", bg: "#512da8", tx: "#ffffff" },
    { t: "10 Feb: Grietas de Fe", c: "Quiero que esas grietas se reparen, que la luz de tus ojos aclare mi camino. Que lo que escuche sea esa risa tuya y no el eco de mi armadura golpeando contra los muros del laberinto.", bg: "#512da8", tx: "#ffffff" },
    { t: "11 Feb: La Petición", c: "No quiero que estos muros desaparezcan por completo, ya que esa es tu forma de ser. Tal vez si quitamos las espinas me pueda quitar esta armadura que me protege de tus palabras que duelen.", bg: "#4527a0", tx: "#ffffff" },
    { t: "12 Feb: Intento", c: "Ya no oirás mis quejas, no oirás cómo me siento, pero estaré ahí intentando. Para mí cuando se ama duele pensar que te vas, pero escucharte decirlo sin más me daña el alma.", bg: "#311b92", tx: "#ffffff" },
    { t: "13 Feb: Víspera del Final", c: "Me quito la armadura, no del todo, pero me la quito. Aquí seguiré esforzándome para que mis palabras no sean solo palabras. Mañana será el día en que todo este laberinto encuentre su sentido.", bg: "#311b92", tx: "#ffffff" }
  ];

  const actual = diario[pagina];

  const irSiguiente = () => {
    if (pagina < diario.length - 1) setPagina(pagina + 1);
    else setFinal(true);
  };

  const irAtras = () => {
    if (pagina > 0) setPagina(pagina - 1);
    setFinal(false);
  };

  const volverAlInicio = () => {
    setPagina(0);
    setFinal(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: actual.bg, 
      transition: 'background-color 0.8s ease', 
      display: 'flex', 
      justifyContent: 'center',
      alignContent: 'center',
    }} >/* </div>
  )};