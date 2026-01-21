# Proyecto: Invitación Web de Dinosaurios - Cumpleaños 5 años

## Objetivo
Crear una landing page interactiva, mobile-first, para una invitación de cumpleaños con temática de dinosaurios, incluyendo animaciones de entrada, video y formulario de confirmación (RSVP).

## Stack Tecnológico
- **Framework:** React + Vite
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Iconos:** Lucide-react

## Requerimientos Funcionales

### 1. Animación de Entrada (Jungle Reveal)
- Al cargar la app, la pantalla debe estar cubierta por dos capas de follaje selvático (PNGs transparentes).
- Un botón central que diga "¡Abrir Invitación!".
- Al hacer clic: 
    - Sonido de selva/rugido.
    - Las hojas se desplazan hacia los lados (Framer Motion `animate={{ x: '-100%' }}` y `animate={{ x: '100%' }}`).
    - Se revela el "Ojo del Dinosaurio" de fondo.

### 2. Sección de Video
- Implementar un componente de video responsivo.
- Debe tener `muted`, `autoPlay`, `loop` y `playsInline` para asegurar compatibilidad en móviles.
- Incluir un botón flotante para "Activar Sonido" tras la interacción inicial.

### 3. Información del Evento (Mobile-First)
- Layout de una sola columna.
- Tipografía temática (puedes usar fuentes de Google Fonts como 'Luckiest Guy' o 'Bangers').
- Datos: Fecha, Hora, Lugar (con enlace a Google Maps).

### 4. Formulario RSVP
- Campos: 
    - Nombre del niño invitado (input text).
    - Confirmación (Radio: "¡Ahí estaré!" / "No puedo ir").
    - Cantidad de personas (Adultos y Niños).
- Acción: Por ahora, manejar el submit con un `console.log` de los datos en formato JSON.

## Guía de Estilos
- Colores: Verdes selva (#1A4314), Naranjas volcánicos, Cafés tierra.
- Componentes: Bordes redondeados, sombras suaves, botones interactivos con escalas al hacer hover/tap.