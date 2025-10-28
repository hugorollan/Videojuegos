# Videojuegos - API RAWG.io Integration

Este proyecto integra la API de RAWG.io para mostrar información sobre videojuegos populares.

## Características

- **API Integration**: Conexión con RAWG.io API para obtener datos de videojuegos
- **Filtro por Consolas**: Dropdown para filtrar juegos por plataforma (PC, PlayStation, Xbox, Nintendo Switch, etc.)
- **Detalles de Juegos**: Modal interactivo con información completa al hacer clic en un juego
- **Seguridad (XSS Protection)**: Sanitización de contenido HTML para prevenir ataques XSS
- **Optimización de Rendimiento**: Carga perezosa (lazy loading) de imágenes
- **Interfaz Responsive**: Diseño adaptable para diferentes tamaños de pantalla
- **Manejo de Errores**: Gestión robusta de errores con mensajes amigables y datos de fallback

## Estructura del Proyecto

- `index.html` - Página principal con estructura HTML
- `app.js` - Código JavaScript con la integración de la API
- `styles.css` - Estilos CSS para la interfaz

## Cómo Usar

1. Abre `index.html` en un navegador web
2. La aplicación cargará automáticamente 12 videojuegos populares
3. Usa el dropdown "Filtrar por consola" para ver juegos de una plataforma específica
4. Haz clic en cualquier juego para ver información detallada en un modal
5. Las imágenes se cargarán de forma perezosa para optimizar el rendimiento

## API Key

El proyecto incluye una API key de RAWG.io: `b008bfe85f3b4d948fdd39d209a62264`

## Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- RAWG.io API