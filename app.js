// --- CÓDIGO COMPLETO PARA TU API DE VIDEOJUEGOS ---

// 1. Pega tu clave API de RAWG.io aquí
const API_KEY = 'b008bfe85f3b4d948fdd39d209a62264';

// 2. Función principal asíncrona para obtener los juegos
async function obtenerJuegos() {
  console.log('Iniciando carga de juegos...');
  
  // Buscamos el contenedor en el HTML donde mostraremos los juegos
  const container = document.getElementById('juegos-container');
  if (!container) {
    console.error('Error: No se encontró el elemento #juegos-container en el HTML.');
    return;
  }
  
  // Mostramos un mensaje de "Cargando..."
  container.innerHTML = '<p class="loading">Cargando juegos...</p>';

  try {
    // 3. Construimos la URL. Pedimos 12 juegos (page_size=12)
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`;

    // 4. Hacemos la llamada a la API usando fetch y esperamos la respuesta
    const response = await fetch(url);

    // 5. Verificamos si la respuesta fue exitosa (ej. no fue un error 404 o 401)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    // 6. Convertimos la respuesta a un objeto JSON
    const data = await response.json();

    // 7. ¡Éxito! Limpiamos el "Cargando..." y mostramos los juegos
    container.innerHTML = ''; // Limpiamos el contenedor
    
    // 'data.results' es el array que contiene la lista de juegos
    const juegos = data.results;
    
    juegos.forEach(juego => {
      // 8. CUMPLIMOS REQUISITO DE SEGURIDAD (XSS)
      // Limpiamos el título de cualquier etiqueta HTML antes de mostrarlo
      const tituloSeguro = juego.name.replace(/<[^>]*>?/gm, '');

      // 9. Creamos el HTML para cada juego
      const juegoElement = document.createElement('article');
      juegoElement.className = 'game-card';
      juegoElement.innerHTML = `
        <img 
          src="${juego.background_image}" 
          alt="Portada de ${tituloSeguro}" 
          loading="lazy" 
        />
        <h3>${tituloSeguro}</h3>
        <p>Valoración: ${juego.rating} / 5</p>
      `;
      
      // 10. CUMPLIMOS REQUISITO DE RENDIMIENTO
      // La propiedad 'loading="lazy"' en la <img> de arriba
      // hace que la imagen solo se cargue cuando esté cerca de verse.

      // Añadimos la tarjeta del juego al contenedor
      container.appendChild(juegoElement);
    });

  } catch (error) {
    // 11. Manejamos cualquier error (problema de red, API key incorrecta, etc.)
    console.error('Error al obtener los juegos:', error);
    // Mostramos un error amigable al usuario
    container.innerHTML = `<p class="error">Error al cargar los juegos. Inténtalo de nuevo más tarde.</p>`;
  }
}

// 12. Llamamos a la función para que se ejecute al cargar el script
obtenerJuegos();
