// --- CÓDIGO COMPLETO PARA TU API DE VIDEOJUEGOS ---

// 1. Pega tu clave API de RAWG.io aquí
const API_KEY = 'b008bfe85f3b4d948fdd39d209a62264';

// URL de la API Mock (json-server)
const MOCK_API_URL = 'http://localhost:3000/reseñas';
const USERS_API_URL = 'http://localhost:3000/usuarios';

// Variables globales
let platformaSeleccionada = '';
let searchQuery = '';
let currentUser = null;

// Función de sanitización mejorada para prevenir XSS
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Datos de demostración (fallback si la API no está disponible)
const MOCK_PLATFORMS = [
  { id: 4, name: 'PC' },
  { id: 187, name: 'PlayStation 5' },
  { id: 18, name: 'PlayStation 4' },
  { id: 1, name: 'Xbox One' },
  { id: 7, name: 'Nintendo Switch' },
  { id: 16, name: 'PlayStation 3' },
  { id: 14, name: 'Xbox 360' }
];

const MOCK_GAMES = [
  {
    id: 3498,
    name: 'Grand Theft Auto V',
    background_image: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    rating: 4.47,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 1, name: 'Xbox One' } }
    ],
    genres: [{ name: 'Action' }, { name: 'Adventure' }],
    released: '2013-09-17',
    metacritic: 92,
    playtime: 74,
    ratings_count: 6500,
    description_raw: 'Grand Theft Auto V es un videojuego de acción-aventura en mundo abierto desarrollado por Rockstar North.',
    developers: [{ name: 'Rockstar North' }],
    publishers: [{ name: 'Rockstar Games' }],
    website: 'http://www.rockstargames.com/V/'
  },
  {
    id: 3328,
    name: 'The Witcher 3: Wild Hunt',
    background_image: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
    rating: 4.66,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 1, name: 'Xbox One' } },
      { platform: { id: 7, name: 'Nintendo Switch' } }
    ],
    genres: [{ name: 'Action' }, { name: 'RPG' }],
    released: '2015-05-18',
    metacritic: 92,
    playtime: 46,
    ratings_count: 5800,
    description_raw: 'The Witcher 3: Wild Hunt es un juego de rol de acción y aventuras desarrollado por CD Projekt RED.',
    developers: [{ name: 'CD PROJEKT RED' }],
    publishers: [{ name: 'CD PROJEKT RED' }],
    website: 'https://www.thewitcher.com/en/witcher3'
  },
  {
    id: 4200,
    name: 'Portal 2',
    background_image: 'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',
    rating: 4.61,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 16, name: 'PlayStation 3' } },
      { platform: { id: 14, name: 'Xbox 360' } }
    ],
    genres: [{ name: 'Shooter' }, { name: 'Puzzle' }],
    released: '2011-04-18',
    metacritic: 95,
    playtime: 11,
    ratings_count: 4200,
    description_raw: 'Portal 2 es un videojuego de lógica y plataformas en primera persona desarrollado por Valve Corporation.',
    developers: [{ name: 'Valve Software' }],
    publishers: [{ name: 'Valve' }],
    website: 'http://www.thinkwithportals.com/'
  },
  {
    id: 5286,
    name: 'Tomb Raider (2013)',
    background_image: 'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg',
    rating: 4.05,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 1, name: 'Xbox One' } }
    ],
    genres: [{ name: 'Action' }, { name: 'Adventure' }],
    released: '2013-03-05',
    metacritic: 86,
    playtime: 10,
    ratings_count: 3500,
    description_raw: 'Tomb Raider explora los intensos orígenes de Lara Croft y su ascenso para convertirse en una superviviente.',
    developers: [{ name: 'Crystal Dynamics' }],
    publishers: [{ name: 'Square Enix' }],
    website: 'http://www.tombraider.com'
  },
  {
    id: 13536,
    name: 'Portal',
    background_image: 'https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg',
    rating: 4.51,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 16, name: 'PlayStation 3' } },
      { platform: { id: 14, name: 'Xbox 360' } }
    ],
    genres: [{ name: 'Shooter' }, { name: 'Puzzle' }],
    released: '2007-10-09',
    metacritic: 90,
    playtime: 4,
    ratings_count: 3200,
    description_raw: 'Portal es un videojuego de lógica y plataformas en primera persona desarrollado por Valve Corporation.',
    developers: [{ name: 'Valve Software' }],
    publishers: [{ name: 'Valve' }],
    website: 'http://www.thinkwithportals.com/'
  },
  {
    id: 12020,
    name: 'Left 4 Dead 2',
    background_image: 'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg',
    rating: 4.09,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 14, name: 'Xbox 360' } }
    ],
    genres: [{ name: 'Shooter' }, { name: 'Action' }],
    released: '2009-11-17',
    metacritic: 89,
    playtime: 9,
    ratings_count: 2800,
    description_raw: 'Left 4 Dead 2 es un videojuego de disparos en primera persona cooperativo desarrollado por Valve Corporation.',
    developers: [{ name: 'Valve Software' }],
    publishers: [{ name: 'Valve' }],
    website: 'http://www.l4d.com/blog/'
  },
  {
    id: 802,
    name: 'Borderlands 2',
    background_image: 'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg',
    rating: 4.01,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 1, name: 'Xbox One' } }
    ],
    genres: [{ name: 'Shooter' }, { name: 'RPG' }],
    released: '2012-09-18',
    metacritic: 89,
    playtime: 10,
    ratings_count: 2600,
    description_raw: 'Borderlands 2 es un videojuego de acción en primera persona con elementos de rol desarrollado por Gearbox Software.',
    developers: [{ name: 'Gearbox Software' }],
    publishers: [{ name: '2K Games' }],
    website: 'http://www.borderlands2.com/'
  },
  {
    id: 58175,
    name: 'God of War (2018)',
    background_image: 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg',
    rating: 4.57,
    platforms: [
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 4, name: 'PC' } }
    ],
    genres: [{ name: 'Action' }, { name: 'Adventure' }],
    released: '2018-04-20',
    metacritic: 94,
    playtime: 12,
    ratings_count: 3800,
    description_raw: 'God of War es un videojuego de acción-aventura desarrollado por Santa Monica Studio y publicado por Sony Interactive Entertainment.',
    developers: [{ name: 'SCE Santa Monica Studio' }],
    publishers: [{ name: 'Sony Computer Entertainment' }],
    website: 'https://www.playstation.com/en-us/games/god-of-war-ps4/'
  },
  {
    id: 22509,
    name: 'Minecraft',
    background_image: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg',
    rating: 4.42,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 1, name: 'Xbox One' } },
      { platform: { id: 7, name: 'Nintendo Switch' } }
    ],
    genres: [{ name: 'Adventure' }, { name: 'Indie' }],
    released: '2011-11-18',
    metacritic: 83,
    playtime: 68,
    ratings_count: 3400,
    description_raw: 'Minecraft es un videojuego de construcción de tipo sandbox desarrollado por Mojang Studios.',
    developers: [{ name: 'Mojang' }],
    publishers: [{ name: 'Mojang' }],
    website: 'http://www.minecraft.net/'
  },
  {
    id: 1030,
    name: 'Limbo',
    background_image: 'https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg',
    rating: 4.14,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 1, name: 'Xbox One' } },
      { platform: { id: 7, name: 'Nintendo Switch' } }
    ],
    genres: [{ name: 'Puzzle' }, { name: 'Indie' }],
    released: '2010-07-21',
    metacritic: 90,
    playtime: 3,
    ratings_count: 2100,
    description_raw: 'Limbo es un videojuego de plataformas y rompecabezas desarrollado por Playdead.',
    developers: [{ name: 'Playdead' }],
    publishers: [{ name: 'Playdead' }],
    website: 'http://limbogame.org/'
  },
  {
    id: 3939,
    name: "PAYDAY 2",
    background_image: 'https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg',
    rating: 3.5,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 1, name: 'Xbox One' } },
      { platform: { id: 7, name: 'Nintendo Switch' } }
    ],
    genres: [{ name: 'Shooter' }, { name: 'Action' }],
    released: '2013-08-13',
    metacritic: 79,
    playtime: 7,
    ratings_count: 2000,
    description_raw: 'Payday 2 es un videojuego de disparos en primera persona cooperativo desarrollado por Overkill Software.',
    developers: [{ name: 'OVERKILL Software' }],
    publishers: [{ name: '505 Games' }],
    website: 'http://www.paydaythegame.com/'
  },
  {
    id: 326292,
    name: 'Fall Guys',
    background_image: 'https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg',
    rating: 3.74,
    platforms: [
      { platform: { id: 4, name: 'PC' } },
      { platform: { id: 18, name: 'PlayStation 4' } },
      { platform: { id: 1, name: 'Xbox One' } },
      { platform: { id: 7, name: 'Nintendo Switch' } }
    ],
    genres: [{ name: 'Action' }, { name: 'Casual' }],
    released: '2020-08-04',
    metacritic: 77,
    playtime: 4,
    ratings_count: 1800,
    description_raw: 'Fall Guys es un videojuego multijugador masivo online de plataformas desarrollado por Mediatonic.',
    developers: [{ name: 'Mediatonic' }],
    publishers: [{ name: 'Devolver Digital' }],
    website: 'https://fallguys.com/'
  }
];

// 2. Función para cargar las plataformas disponibles
async function cargarPlataformas() {
  try {
    const url = `https://api.rawg.io/api/platforms?key=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    const selectElement = document.getElementById('platform-filter');
    
    // Agregamos las plataformas al select
    data.results.forEach(platform => {
      const option = document.createElement('option');
      option.value = platform.id;
      option.textContent = platform.name;
      selectElement.appendChild(option);
    });
    
    // Listener para cuando cambie el filtro
    selectElement.addEventListener('change', (e) => {
      platformaSeleccionada = e.target.value;
      obtenerJuegos();
    });
    
  } catch (error) {
    console.error('Error al cargar plataformas, usando datos de demostración:', error);
    // Fallback: usar plataformas de demostración
    const selectElement = document.getElementById('platform-filter');
    MOCK_PLATFORMS.forEach(platform => {
      const option = document.createElement('option');
      option.value = platform.id;
      option.textContent = platform.name;
      selectElement.appendChild(option);
    });
    
    // Listener para cuando cambie el filtro
    selectElement.addEventListener('change', (e) => {
      platformaSeleccionada = e.target.value;
      obtenerJuegos();
    });
  }
}

// 3. Función principal asíncrona para obtener los juegos
async function obtenerJuegos(options = {}) {
  console.log('Iniciando carga de juegos...');
  
  const { 
    ordering = '-rating',
    dates = '',
    metacritic = '',
    page_size = 12,
    search = searchQuery 
  } = options;
  
  // Buscamos el contenedor en el HTML donde mostraremos los juegos
  const container = document.getElementById('juegos-container');
  if (!container) {
    console.error('Error: No se encontró el elemento #juegos-container en el HTML.');
    return;
  }
  
  // Mostramos un mensaje de "Cargando..."
  const skeletonHTML = '<div class="skeleton-card"></div>'.repeat(6); // Muestra 6 esqueletos
  container.innerHTML = skeletonHTML;

  try {
    // 4. Construimos la URL
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}&ordering=${ordering}`;
    
    // Si hay una plataforma seleccionada, la agregamos al filtro
    if (platformaSeleccionada) {
      url += `&platforms=${platformaSeleccionada}`;
    }

    // Si hay búsqueda, la agregamos
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    // Si hay filtro de fechas
    if (dates) {
      url += `&dates=${dates}`;
    }

    // Si hay filtro de metacritic
    if (metacritic) {
      url += `&metacritic=${metacritic}`;
    }

    // 5. Hacemos la llamada a la API usando fetch y esperamos la respuesta
    const response = await fetch(url);

    // 6. Verificamos si la respuesta fue exitosa (ej. no fue un error 404 o 401)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    // 7. Convertimos la respuesta a un objeto JSON
    const data = await response.json();

    // 8. ¡Éxito! Limpiamos el "Cargando..." y mostramos los juegos
    container.innerHTML = ''; // Limpiamos el contenedor
    
    // 'data.results' es el array que contiene la lista de juegos
    const juegos = data.results;
    
    if (juegos.length === 0) {
      container.innerHTML = `
  <div class="empty-state">
    <div class="empty-state-icon">🎮</div>
    <p>No se encontraron juegos</p>
  </div>
`;
      return;
    }
    
    juegos.forEach(juego => {
      // 9. CUMPLIMOS REQUISITO DE SEGURIDAD (XSS)
      // Limpiamos el título de cualquier etiqueta HTML antes de mostrarlo
      const tituloSeguro = sanitizeHTML(juego.name);

      // 10. Creamos el HTML para cada juego
      const juegoElement = document.createElement('article');
      juegoElement.className = 'game-card';
      juegoElement.innerHTML = `
        <img 
          src="${juego.background_image}" 
          alt="Portada de ${tituloSeguro}" 
          loading="lazy" 
        />
        <h3>${tituloSeguro}</h3>
        <p class="rating">⭐ ${juego.rating} / 5</p>
      `;
      
      // 11. Agregamos evento click para mostrar detalles
      juegoElement.addEventListener('click', () => {
        mostrarDetallesJuego(juego.id);
      });
      
      // 12. CUMPLIMOS REQUISITO DE RENDIMIENTO
      // La propiedad 'loading="lazy"' en la <img> de arriba
      // hace que la imagen solo se cargue cuando esté cerca de verse.

      // Añadimos la tarjeta del juego al contenedor
      container.appendChild(juegoElement);
    });

  } catch (error) {
    // 13. Manejamos cualquier error (problema de red, API key incorrecta, etc.)
    console.error('Error al obtener los juegos, usando datos de demostración:', error);
    
    // Fallback: usar juegos de demostración
    container.innerHTML = ''; // Limpiamos el contenedor
    
    // Filtramos por plataforma si es necesario
    let juegosFiltrados = MOCK_GAMES;
    if (platformaSeleccionada) {
      juegosFiltrados = MOCK_GAMES.filter(juego => 
        juego.platforms.some(p => p.platform.id == platformaSeleccionada)
      );
    }
    
    // Filtramos por búsqueda si es necesario
    if (search) {
      juegosFiltrados = juegosFiltrados.filter(juego =>
        juego.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (juegosFiltrados.length === 0) {
      container.innerHTML = `
  <div class="empty-state">
    <div class="empty-state-icon">🎮</div>
    <p>No se encontraron juegos</p>
  </div>
`;
      return;
    }
    
    juegosFiltrados.forEach(juego => {
      const tituloSeguro = sanitizeHTML(juego.name);
      const juegoElement = document.createElement('article');
      juegoElement.className = 'game-card';
      juegoElement.innerHTML = `
        <img 
          src="${juego.background_image}" 
          alt="Portada de ${tituloSeguro}" 
          loading="lazy" 
        />
        <h3>${tituloSeguro}</h3>
        <p class="rating">⭐ ${juego.rating} / 5</p>
      `;
      
      juegoElement.addEventListener('click', () => {
        mostrarDetallesJuego(juego.id);
      });
      
      container.appendChild(juegoElement);
    });
  }
}

// 14. Función para mostrar los detalles de un juego en el modal
async function mostrarDetallesJuego(gameId) {
  const modal = document.getElementById('game-modal');
  const modalBody = document.getElementById('modal-body');
  
  // Mostramos el modal con un mensaje de carga
  modal.style.display = 'block';
  modalBody.innerHTML = '<p class="loading">Cargando detalles...</p>';
  
  try {
    // Obtenemos los detalles completos del juego
    const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const juego = await response.json();
    
    // Sanitizamos los datos
    const tituloSeguro = sanitizeHTML(juego.name);
    const descripcionSegura = sanitizeHTML(juego.description_raw || 'No hay descripción disponible.');
    
    // Construimos el HTML con toda la información del juego
    modalBody.innerHTML = `
      <div class="modal-header">
        ${juego.background_image ? `<img src="${juego.background_image}" alt="${tituloSeguro}">` : ''}
        <h2 class="modal-title">${tituloSeguro}</h2>
      </div>
      
      <div class="info-grid">
        <div class="info-item">
          <strong>Fecha de lanzamiento:</strong>
          ${juego.released || 'No disponible'}
        </div>
        <div class="info-item">
          <strong>Valoración:</strong>
          ${juego.rating} / 5 (${juego.ratings_count} votos)
        </div>
        <div class="info-item">
          <strong>Metacritic:</strong>
          ${juego.metacritic || 'N/A'}
        </div>
        <div class="info-item">
          <strong>Tiempo de juego:</strong>
          ${juego.playtime || 0} horas (promedio)
        </div>
      </div>
      
      ${juego.platforms && juego.platforms.length > 0 ? `
        <div class="modal-section">
          <h3>Plataformas</h3>
          <div class="platforms-list">
            ${juego.platforms.map(p => `<span class="platform-tag">${p.platform.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      ${juego.genres && juego.genres.length > 0 ? `
        <div class="modal-section">
          <h3>Géneros</h3>
          <div class="genres-list">
            ${juego.genres.map(g => `<span class="genre-tag">${g.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      ${juego.developers && juego.developers.length > 0 ? `
        <div class="modal-section">
          <h3>Desarrolladores</h3>
          <ul>
            ${juego.developers.map(d => `<li>${d.name}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${juego.publishers && juego.publishers.length > 0 ? `
        <div class="modal-section">
          <h3>Distribuidores</h3>
          <ul>
            ${juego.publishers.map(p => `<li>${p.name}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      <div class="modal-section">
        <h3>Descripción</h3>
        <p>${descripcionSegura}</p>
      </div>
      
      ${juego.website ? `
        <div class="modal-section">
          <h3>Sitio web</h3>
          <p><a href="${juego.website}" target="_blank" rel="noopener">${juego.website}</a></p>
        </div>
      ` : ''}
    `;
    
  } catch (error) {
    console.error('Error al obtener detalles del juego, usando datos de demostración:', error);
    
    // Fallback: buscar en los datos de demostración
    const juego = MOCK_GAMES.find(g => g.id === gameId);
    
    if (!juego) {
      modalBody.innerHTML = '<p class="error">Error al cargar los detalles del juego.</p>';
      return;
    }
    
    const tituloSeguro = sanitizeHTML(juego.name);
    const descripcionSegura = sanitizeHTML(juego.description_raw || 'No hay descripción disponible.');
    
    modalBody.innerHTML = `
      <div class="modal-header">
        ${juego.background_image ? `<img src="${juego.background_image}" alt="${tituloSeguro}">` : ''}
        <h2 class="modal-title">${tituloSeguro}</h2>
      </div>
      
      <div class="info-grid">
        <div class="info-item">
          <strong>Fecha de lanzamiento:</strong>
          ${juego.released || 'No disponible'}
        </div>
        <div class="info-item">
          <strong>Valoración:</strong>
          ${juego.rating} / 5 (${juego.ratings_count} votos)
        </div>
        <div class="info-item">
          <strong>Metacritic:</strong>
          ${juego.metacritic || 'N/A'}
        </div>
        <div class="info-item">
          <strong>Tiempo de juego:</strong>
          ${juego.playtime || 0} horas (promedio)
        </div>
      </div>
      
      ${juego.platforms && juego.platforms.length > 0 ? `
        <div class="modal-section">
          <h3>Plataformas</h3>
          <div class="platforms-list">
            ${juego.platforms.map(p => `<span class="platform-tag">${p.platform.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      ${juego.genres && juego.genres.length > 0 ? `
        <div class="modal-section">
          <h3>Géneros</h3>
          <div class="genres-list">
            ${juego.genres.map(g => `<span class="genre-tag">${g.name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      
      ${juego.developers && juego.developers.length > 0 ? `
        <div class="modal-section">
          <h3>Desarrolladores</h3>
          <ul>
            ${juego.developers.map(d => `<li>${d.name}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${juego.publishers && juego.publishers.length > 0 ? `
        <div class="modal-section">
          <h3>Distribuidores</h3>
          <ul>
            ${juego.publishers.map(p => `<li>${p.name}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      <div class="modal-section">
        <h3>Descripción</h3>
        <p>${descripcionSegura}</p>
      </div>
      
      ${juego.website ? `
        <div class="modal-section">
          <h3>Sitio web</h3>
          <p><a href="${juego.website}" target="_blank" rel="noopener">${juego.website}</a></p>
        </div>
      ` : ''}
    `;
  }
}

// 15. Configurar el modal
function configurarModal() {
  const modal = document.getElementById('game-modal');
  const closeBtn = document.querySelector('.close');
  
  // Cerrar modal al hacer click en la X
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }
  
  // Cerrar modal al hacer click fuera del contenido
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

// 16. Inicialización: ejecutamos todo al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  configurarModal();
  configurarLoginModal();
  configurarRegisterModal();
  cargarPlataformas();
  configurarBusqueda();
  configurarAuth();
  iniciarRouter();
  cargarUsuarioSesion();
});

// 17. IMPLEMENTACIÓN DEL ROUTER SPA
function iniciarRouter() {
  // Función router principal
  function router() {
    const hash = window.location.hash || '#/';
    const appContent = document.getElementById('app-content');
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Limpiar contenido previo
    appContent.innerHTML = '';
    
    if (hash === '#/' || hash === '') {
      // Vista de galería de juegos
      document.querySelector('[data-route="home"]')?.classList.add('active');
      renderizarVistaJuegos('Todos los Juegos');
    } else if (hash === '#/top-games') {
      document.querySelector('[data-route="top-games"]')?.classList.add('active');
      renderizarVistaJuegos('Top Juegos', { ordering: '-rating', metacritic: '80,100' });
    } else if (hash === '#/best-year') {
      document.querySelector('[data-route="best-year"]')?.classList.add('active');
      const currentYear = new Date().getFullYear();
      renderizarVistaJuegos(`Best of ${currentYear}`, { dates: `${currentYear}-01-01,${currentYear}-12-31`, ordering: '-rating' });
    } else if (hash === '#/popular-2024') {
      document.querySelector('[data-route="popular-2024"]')?.classList.add('active');
      renderizarVistaJuegos('Popular en 2024', { dates: '2024-01-01,2024-12-31', ordering: '-added' });
    } else if (hash === '#/all-time-250') {
      document.querySelector('[data-route="all-time-250"]')?.classList.add('active');
      renderizarVistaJuegos('All Time Top 250', { ordering: '-rating', page_size: 20, metacritic: '85,100' });
    } else if (hash === '#/resenas') {
      document.querySelector('[data-route="resenas"]')?.classList.add('active');
      renderizarVistaResenas();
    } else {
      // Vista de error 404
      appContent.innerHTML = '<p class="error">Página no encontrada</p>';
    }
  }
  
  // Detectar cambios en el hash
  window.addEventListener('hashchange', router);
  
  // Ejecutar router al inicio
  router();
}

// 18. Vista de galería de juegos
function renderizarVistaJuegos(titulo = 'Todos los Juegos', options = {}) {
  const appContent = document.getElementById('app-content');
  
  // Crear el título y contenedor de juegos
  appContent.innerHTML = `
    <h1 class="page-title">${titulo}</h1>
    <div id="juegos-container"></div>
  `;
  
  // Cargar los juegos con las opciones proporcionadas
  obtenerJuegos(options);
}

// 19. Vista de reseñas (renombrado de renderizarVistaFormulario)
function renderizarVistaResenas() {
  const appContent = document.getElementById('app-content');
  
  appContent.innerHTML = `
    <div class="form-container">
      <h2>Reseñas de Juegos</h2>
      
      <div class="reviews-section">
        <h3>Todas las Reseñas</h3>
        <div id="reviews-list"></div>
      </div>
      
      ${currentUser ? `
        <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #333;">
          <h3 style="color: var(--text-primary); margin-bottom: 20px;">Añadir Nueva Reseña</h3>
          <form id="review-form" class="review-form">
            <div class="form-group">
              <label for="titulo">Título del Juego:</label>
              <input type="text" id="titulo" name="titulo" required placeholder="Ej: The Legend of Zelda">
            </div>
            
            <div class="form-group">
              <label for="comentario">Comentario:</label>
              <textarea id="comentario" name="comentario" rows="6" required placeholder="Escribe tu reseña aquí..."></textarea>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-submit">Publicar Reseña</button>
            </div>
          </form>
          
          <div id="form-message" class="form-message"></div>
        </div>
      ` : `
        <div style="margin-top: 40px; padding: 20px; background: var(--bg-dark); border-radius: 8px; text-align: center;">
          <p style="color: var(--text-secondary); margin-bottom: 15px;">Debes iniciar sesión para añadir reseñas</p>
          <button id="login-prompt-btn" class="btn-submit">Iniciar Sesión</button>
        </div>
      `}
    </div>
  `;
  
  // Cargar reseñas existentes
  cargarResenas();
  
  // Configurar el manejador del formulario si el usuario está logueado
  if (currentUser) {
    const form = document.getElementById('review-form');
    form.addEventListener('submit', manejarEnvioFormulario);
  } else {
    const loginPromptBtn = document.getElementById('login-prompt-btn');
    if (loginPromptBtn) {
      loginPromptBtn.addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'block';
      });
    }
  }
}

// 21. Cargar reseñas existentes
async function cargarResenas() {
  const reviewsList = document.getElementById('reviews-list');
  
  if (!reviewsList) return;
  
  reviewsList.innerHTML = `
  <div class="skeleton-review"></div>
  <div class="skeleton-review"></div>
`;
  
  try {
    const response = await fetch(MOCK_API_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const resenas = await response.json();
    
    if (resenas.length === 0) {
      reviewsList.innerHTML = `
  <div class="empty-state-review">
    <div class="empty-state-icon">💬</div>
    <p>No hay reseñas publicadas aún</p>
  </div>
`;
      return;
    }
    
    // Mostrar las reseñas con sanitización
    reviewsList.innerHTML = resenas.map(resena => {
      // Sanitizar datos de usuario para prevenir XSS
      const tituloSeguro = sanitizeHTML(String(resena.titulo || ''));
      const comentarioSeguro = sanitizeHTML(String(resena.comentario || ''));
      const fechaSegura = new Date(resena.fecha).toLocaleString('es-ES');
      const usuarioSeguro = sanitizeHTML(String(resena.usuario || 'Anónimo'));
      
      return `
        <div class="review-card">
          <h4>${tituloSeguro}</h4>
          <p>${comentarioSeguro}</p>
          <small>Publicado por: ${usuarioSeguro} | ${fechaSegura}</small>
          ${currentUser && currentUser.role === 'admin' ? `
            <button class="btn-delete" data-id="${resena.id}">Eliminar Reseña</button>
          ` : ''}
        </div>
      `;
    }).join('');
    
    // Añadir event listeners a los botones de eliminar
    if (currentUser && currentUser.role === 'admin') {
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.target.getAttribute('data-id');
          if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
            await eliminarResena(id);
          }
        });
      });
    }
    
  } catch (error) {
    console.error('Error al cargar las reseñas:', error);
    reviewsList.innerHTML = '<p class="error-message">Error al cargar las reseñas. Asegúrate de que json-server esté ejecutándose.</p>';
  }
}

// 22. Eliminar reseña (solo admin)
async function eliminarResena(id) {
  try {
    const response = await fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    // Recargar reseñas
    cargarResenas();
    
  } catch (error) {
    console.error('Error al eliminar la reseña:', error);
    alert('Error al eliminar la reseña.');
  }
}

// 23. Configurar búsqueda
function configurarBusqueda() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  if (!searchInput || !searchBtn) return;
  
  const realizarBusqueda = () => {
    searchQuery = searchInput.value.trim();
    // Si estamos en una vista de juegos, recargar
    const hash = window.location.hash || '#/';
    if (hash === '#/' || hash === '' || hash.startsWith('#/top-') || hash.startsWith('#/best-') || hash.startsWith('#/popular-') || hash.startsWith('#/all-time-')) {
      const container = document.getElementById('juegos-container');
      if (container) {
        obtenerJuegos();
      }
    }
  };
  
  searchBtn.addEventListener('click', realizarBusqueda);
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      realizarBusqueda();
    }
  });
}

// 24. Configurar modal de login
function configurarLoginModal() {
  const modal = document.getElementById('login-modal');
  const closeBtn = document.querySelector('.close-login');
  const loginForm = document.getElementById('login-form');
  
  // Cerrar modal al hacer click en la X
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    }
  }
  
  // Cerrar modal al hacer click fuera del contenido
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
    // También cerrar register modal
    const registerModal = document.getElementById('register-modal');
    if (event.target == registerModal) {
      registerModal.style.display = 'none';
    }
  }
  
  // Manejar envío del formulario de login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await manejarLogin();
    });
  }
  
  // Añadir listener para el enlace de registro
  document.getElementById('show-register-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'block';
  });
}

// 24b. Configurar modal de registro
function configurarRegisterModal() {
  const modal = document.getElementById('register-modal');
  const closeBtn = document.querySelector('.close-register');
  const registerForm = document.getElementById('register-form');
  
  // Cerrar modal al hacer click en la X
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    }
  }
  
  // Manejar envío del formulario de registro
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await manejarRegistro();
    });
  }
  
  // Añadir listener para el enlace de login
  document.getElementById('show-login-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('login-modal').style.display = 'block';
  });
}

// 25. Manejar login
async function manejarLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const errorDiv = document.getElementById('login-error');
  
  try {
    const response = await fetch(USERS_API_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const usuarios = await response.json();
    
    // Buscar usuario
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    
    if (usuario) {
      // Login exitoso
      currentUser = usuario;
      localStorage.setItem('currentUser', JSON.stringify(usuario));
      actualizarUIAuth();
      document.getElementById('login-modal').style.display = 'none';
      errorDiv.style.display = 'none';
      
      // Recargar la vista actual si es la de reseñas
      const hash = window.location.hash || '#/';
      if (hash === '#/resenas') {
        renderizarVistaResenas();
      }
    } else {
      errorDiv.textContent = 'Usuario o contraseña incorrectos';
      errorDiv.style.display = 'block';
    }
    
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    errorDiv.textContent = 'Error al iniciar sesión. Asegúrate de que json-server esté ejecutándose.';
    errorDiv.style.display = 'block';
  }
}

// 25b. Manejar registro
async function manejarRegistro() {
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();
  const passwordConfirm = document.getElementById('register-password-confirm').value.trim();
  const errorDiv = document.getElementById('register-error');
  const successDiv = document.getElementById('register-success');
  
  // Limpiar mensajes previos
  errorDiv.style.display = 'none';
  successDiv.style.display = 'none';
  
  // Validar que las contraseñas coincidan
  if (password !== passwordConfirm) {
    errorDiv.textContent = 'Las contraseñas no coinciden';
    errorDiv.style.display = 'block';
    return;
  }
  
  // Validar longitud mínima
  if (username.length < 3) {
    errorDiv.textContent = 'El usuario debe tener al menos 3 caracteres';
    errorDiv.style.display = 'block';
    return;
  }
  
  if (password.length < 4) {
    errorDiv.textContent = 'La contraseña debe tener al menos 4 caracteres';
    errorDiv.style.display = 'block';
    return;
  }
  
  try {
    // Verificar si el usuario ya existe
    const response = await fetch(USERS_API_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const usuarios = await response.json();
    
    // Buscar si el usuario ya existe
    const usuarioExiste = usuarios.find(u => u.username === username);
    
    if (usuarioExiste) {
      errorDiv.textContent = 'El nombre de usuario ya está en uso';
      errorDiv.style.display = 'block';
      return;
    }
    
    // Crear nuevo usuario
    // Note: In a production environment, passwords should be hashed
    // before storing. For this demo using json-server, we store plain text.
    const nuevoUsuario = {
      username: sanitizeHTML(username),
      password: password,
      role: 'user'
    };
    
    // Enviar POST para crear el usuario
    const createResponse = await fetch(USERS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoUsuario)
    });
    
    if (!createResponse.ok) {
      throw new Error(`Error HTTP: ${createResponse.status}`);
    }
    
    // Registro exitoso
    successDiv.textContent = '¡Registro exitoso! Ya puedes iniciar sesión.';
    successDiv.style.display = 'block';
    
    // Limpiar formulario
    document.getElementById('register-form').reset();
    
    // Cerrar modal después de 2 segundos y abrir login
    const REDIRECT_DELAY_MS = 2000;
    setTimeout(() => {
      document.getElementById('register-modal').style.display = 'none';
      document.getElementById('login-modal').style.display = 'block';
      successDiv.style.display = 'none';
    }, REDIRECT_DELAY_MS);
    
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    errorDiv.textContent = 'Error al registrar. Asegúrate de que json-server esté ejecutándose.';
    errorDiv.style.display = 'block';
  }
}

// 26. Configurar autenticación
function configurarAuth() {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      document.getElementById('login-modal').style.display = 'block';
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      currentUser = null;
      localStorage.removeItem('currentUser');
      actualizarUIAuth();
      
      // Recargar la vista actual si es la de reseñas
      const hash = window.location.hash || '#/';
      if (hash === '#/resenas') {
        renderizarVistaResenas();
      }
    });
  }
}

// 27. Cargar usuario de sesión
function cargarUsuarioSesion() {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    try {
      currentUser = JSON.parse(userData);
      actualizarUIAuth();
    } catch (error) {
      console.error('Error al cargar usuario de sesión:', error);
      localStorage.removeItem('currentUser');
    }
  }
}

// 28. Actualizar UI de autenticación
function actualizarUIAuth() {
  const loginBtn = document.getElementById('login-btn');
  const userInfo = document.getElementById('user-info');
  const usernameDisplay = document.getElementById('username-display');
  
  if (currentUser) {
    loginBtn?.style.setProperty('display', 'none');
    userInfo?.style.setProperty('display', 'flex');
    if (usernameDisplay) {
      usernameDisplay.textContent = `👤 ${currentUser.username}${currentUser.role === 'admin' ? ' (Admin)' : ''}`;
    }
  } else {
    loginBtn?.style.setProperty('display', 'block');
    userInfo?.style.setProperty('display', 'none');
  }
}

// 29. Actualizar envío del formulario para incluir usuario
async function manejarEnvioFormulario(event) {
  event.preventDefault(); // Prevenir recarga de página
  
  const formMessage = document.getElementById('form-message');
  const tituloInput = document.getElementById('titulo');
  const comentarioInput = document.getElementById('comentario');
  
  // Validar y sanitizar los campos
  const titulo = tituloInput.value.trim();
  const comentario = comentarioInput.value.trim();
  
  if (!titulo || !comentario) {
    formMessage.innerHTML = '<p class="error-message">⚠️ Por favor, completa todos los campos.</p>';
    return;
  }
  
  if (!currentUser) {
    formMessage.innerHTML = '<p class="error-message">⚠️ Debes iniciar sesión para añadir reseñas.</p>';
    return;
  }
  
  // Sanitizar el contenido para prevenir XSS antes de enviar
  const tituloSanitizado = sanitizeHTML(titulo);
  const comentarioSanitizado = sanitizeHTML(comentario);
  
  // Crear el objeto de la reseña
  const resena = {
    titulo: tituloSanitizado,
    comentario: comentarioSanitizado,
    fecha: new Date().toISOString(),
    usuario: currentUser.username
  };
  
  try {
    // Enviar POST a la API mock
    const response = await fetch(MOCK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resena)
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    // Éxito
    formMessage.innerHTML = '<p class="success-message">✅ ¡Reseña publicada con éxito!</p>';
    
    // Limpiar formulario
    tituloInput.value = '';
    comentarioInput.value = '';
    
    // Recargar la lista de reseñas
    setTimeout(() => {
      cargarResenas();
      formMessage.innerHTML = '';
    }, 2000);
    
  } catch (error) {
    console.error('Error al publicar la reseña:', error);
    formMessage.innerHTML = '<p class="error-message">❌ Error al publicar la reseña. Asegúrate de que json-server esté ejecutándose.</p>';
  }
}
