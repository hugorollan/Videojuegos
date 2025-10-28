# Videojuegos - API RAWG.io Integration

Este proyecto es una Single Page Application (SPA) que integra la API de RAWG.io para mostrar información sobre videojuegos populares y permite a los usuarios añadir sus propias reseñas.

## Características

- **API Integration**: Conexión con RAWG.io API para obtener datos de videojuegos
- **SPA (Single Page Application)**: Navegación sin recarga de página usando hash routing
- **Filtro por Consolas**: Dropdown para filtrar juegos por plataforma (PC, PlayStation, Xbox, Nintendo Switch, etc.)
- **Detalles de Juegos**: Modal interactivo con información completa al hacer clic en un juego
- **Sistema de Reseñas**: Formulario para añadir reseñas de juegos con validación
- **Mock API**: Integración con json-server para persistir reseñas
- **Seguridad (XSS Protection)**: Sanitización de contenido HTML para prevenir ataques XSS
- **Optimización de Rendimiento**: Carga perezosa (lazy loading) de imágenes
- **Interfaz Responsive**: Diseño adaptable para diferentes tamaños de pantalla
- **Manejo de Errores**: Gestión robusta de errores con mensajes amigables y datos de fallback

## Aplicación Desplegada

🌐 **URL:** [Próximamente en Vercel/Netlify]

## Instalación y Ejecución Local

### Requisitos Previos

- Node.js (versión 12 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/hugorollan/Videojuegos.git
   cd Videojuegos
   ```

2. **Instalar json-server (si no está instalado globalmente):**
   ```bash
   npm install -g json-server
   ```
   
   O instalarlo localmente en el proyecto:
   ```bash
   npm install json-server --save-dev
   ```

3. **Iniciar json-server (API Mock):**
   ```bash
   json-server --watch db.json --port 3000
   ```
   
   Esto iniciará el servidor mock en `http://localhost:3000`

4. **Iniciar un servidor web local:**
   
   Opción A - Usando Python 3:
   ```bash
   python -m http.server 8000
   ```
   
   Opción B - Usando Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Opción C - Usando Live Server (VS Code extension)
   - Instala la extensión "Live Server" en VS Code
   - Click derecho en `index.html` → "Open with Live Server"

5. **Abrir la aplicación:**
   
   Navega a `http://localhost:8000` en tu navegador

### Uso de la Aplicación

1. **Ver Juegos**: La página de inicio muestra una galería de videojuegos populares
2. **Filtrar por Plataforma**: Usa el dropdown para filtrar juegos por consola
3. **Ver Detalles**: Haz clic en cualquier juego para ver información detallada
4. **Añadir Reseña**: Navega a "Añadir Reseña" para publicar tu propia reseña
5. **Ver Reseñas**: Las reseñas publicadas se muestran en la misma página del formulario

## Estructura del Proyecto

```
Videojuegos/
├── index.html          # Página principal con estructura HTML
├── app.js              # Lógica JavaScript (router SPA, API, formularios)
├── styles.css          # Estilos CSS para la interfaz
├── db.json             # Base de datos mock para json-server
└── README.md           # Este archivo
```

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- RAWG.io API
- json-server (Mock REST API)
- Hash-based routing (SPA)

## API Key

El proyecto incluye una API key de RAWG.io: `b008bfe85f3b4d948fdd39d209a62264`

Para obtener tu propia clave, regístrate en [RAWG.io](https://rawg.io/apidocs)

## Despliegue

### Opción 1: Vercel

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones

### Opción 2: Netlify

1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. O usa Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

**Nota:** Para el despliegue en producción, considera usar una API backend real en lugar de json-server, ya que json-server es solo para desarrollo local.

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.