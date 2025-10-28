# Videojuegos - API RAWG.io Integration

Este proyecto integra la API de RAWG.io para mostrar información sobre videojuegos populares.

## Características

- **API Integration**: Conexión con RAWG.io API para obtener datos de videojuegos
- **Seguridad (XSS Protection)**: Sanitización de contenido HTML para prevenir ataques XSS
- **Optimización de Rendimiento**: Carga perezosa (lazy loading) de imágenes
- **Interfaz Responsive**: Diseño adaptable para diferentes tamaños de pantalla
- **Manejo de Errores**: Gestión robusta de errores con mensajes amigables

## Estructura del Proyecto

- `index.html` - Página principal con estructura HTML
- `app.js` - Código JavaScript con la integración de la API
- `styles.css` - Estilos CSS para la interfaz

## Cómo Usar

1. Abre `index.html` en un navegador web
2. La aplicación cargará automáticamente 12 videojuegos populares
3. Las imágenes se cargarán de forma perezosa para optimizar el rendimiento

## API Key

El proyecto incluye una API key de RAWG.io: `b008bfe85f3b4d948fdd39d209a62264`

## Tecnologías

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- RAWG.io API