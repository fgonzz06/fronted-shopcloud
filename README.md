# 🛒 ShopCloud - Frontend

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-Deployed-FF9900?logo=amazonaws)](https://aws.amazon.com/amplify/)

Frontend del proyecto **ShopCloud**, un e-commerce distribuido basado en microservicios. Esta aplicación consume 5 microservicios independientes (Productos, Pedidos, Usuarios, Historial y Analytics) desplegados en AWS.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Microservicios Consumidos](#-microservicios-consumidos)
- [Variables de Entorno](#-variables-de-entorno)
- [Despliegue en AWS Amplify](#-despliegue-en-aws-amplify)
- [Características](#-características)
- [Contribuidores](#-contribuidores)

---

## 🚀 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.3.1 | Biblioteca principal |
| Vite | 5.0.0 | Build tool y dev server |
| Tailwind CSS | 4.0.0 | Estilos y diseño |
| React Router DOM | 6.22.0 | Navegación entre páginas |
| Axios | 1.6.5 | Cliente HTTP |
| JWT Decode | 4.0.0 | Decodificación de tokens |
| AWS Amplify | - | Despliegue continuo |

---

## 📁 Estructura del Proyecto

```
shopcloud-frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx               # Barra de navegación con autenticación
│   ├── context/
│   │   └── AuthContext.jsx          # Contexto de autenticación (JWT)
│   ├── pages/
│   │   ├── Home.jsx                 # Lista de productos (MS1)
│   │   ├── ProductDetail.jsx        # Detalle de producto + carrito (MS1 + MS2)
│   │   ├── Pedidos.jsx              # Lista y creación de pedidos (MS2)
│   │   ├── Perfil.jsx               # Perfil de usuario (MS3)
│   │   ├── Historial.jsx            # Historial de compras (MS4)
│   │   └── Analytics.jsx            # Estadísticas (MS5)
│   ├── services/
│   │   ├── config.js                # Configuración de APIs y axios
│   │   ├── api.js                   # Funciones de consumo de APIs
│   │   └── mockData.js              # Datos mock para desarrollo
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── README.md
```


---

## 📦 Requisitos Previos

- Node.js 18+ o 20+
- npm 9+ o yarn 1.22+
- Cuenta de AWS (para despliegue en Amplify)

---

## 🛠️ Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/shopcloud-frontend.git
cd shopcloud-frontend
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crea un archivo .env en la raíz:
env

VITE_API_GATEWAY_URL=https://tu-api-gateway-url.amazonaws.com

## 4. Modo desarrollo (con datos mock)
bash

npm run dev

Abre http://localhost:5173
## 5. Modo producción (con backends reales)

    En src/services/config.js, cambia:
    javascript

    export const USE_MOCK = false;

    Configura las URLs de los microservicios:
    javascript

    const LOAD_BALANCER_URL = 'https://tu-load-balancer-url';
    export const MS1_URL = LOAD_BALANCER_URL;
    export const MS2_URL = LOAD_BALANCER_URL;
    export const MS3_URL = LOAD_BALANCER_URL;
    export const MS4_URL = LOAD_BALANCER_URL;
    export const MS5_URL = LOAD_BALANCER_URL;

    Ejecuta:
    bash

    npm run build
    npm run preview

## 🔗 Microservicios Consumidos
Microservicio	Tecnología	Endpoints utilizados
MS1 - Productos	FastAPI + MySQL	GET /productos/, GET /productos/{id}, GET /categorias/
MS2 - Pedidos	Spring Boot + PostgreSQL	GET /pedidos/mis-pedidos, POST /pedidos
MS3 - Usuarios	Node.js + MongoDB	POST /usuarios/login, POST /usuarios/signup, GET /usuarios/{id}, PUT /usuarios/{id}/direccion
MS4 - Historial	FastAPI (sin BD)	GET /historial/{usuario_id}, GET /historial/resumen/{usuario_id}
MS5 - Analytics	FastAPI + Athena	GET /ventas-por-categoria, GET /top-productos, GET /usuarios-activos, GET /ingresos-por-mes
Autenticación

    Tipo: JWT (Bearer Token)

    Almacenamiento: localStorage

    Refresh: Automático mediante interceptor de axios

## 🌍 Variables de Entorno
Variable	Descripción	Obligatoria
VITE_API_GATEWAY_URL	URL del API Gateway o Load Balancer	✅ Para producción
☁️ Despliegue en AWS Amplify
Archivo amplify.yml
yaml

version: 1
frontend:
  phases:
    preBuild:
      commands: [npm ci]
    build:
      commands: [npm run build]
  artifacts:
    baseDirectory: dist
    files: ['**/*']
  cache:
    paths: [node_modules/**/*]

## Pasos para desplegar

    Sube el código a GitHub

    Ve a AWS Console → Amplify → "Host web app"

    Conecta tu repositorio (rama main)

    Amplify detectará amplify.yml automáticamente

    Configura variables de entorno en Amplify Console

    Haz clic en "Save and deploy"

## ✨ Características Implementadas

    ✅ Autenticación JWT: Login, registro, logout y persistencia de sesión

    ✅ Listado de productos: Consume MS1 con paginación

    ✅ Detalle de producto: Vista individual + botón de compra

    ✅ Carrito/Pedidos: Creación de pedidos y listado histórico

    ✅ Perfil de usuario: Visualización y actualización de dirección

    ✅ Historial de compras: Vista consolidada de pedidos (MS4)

    ✅ Panel de Analytics: 4 vistas con estadísticas reales

    ✅ Arquitectura multientorno: Modo mock para desarrollo offline

## ROL responsabilidad

| Rol | Responsabilidad |
|-----|-----------------|
| Frontend | Desarrollo completo de la SPA, integración con microservicios, despliegue en AWS Amplify |
| Backend MS1 | API de productos con FastAPI + MySQL |
| Backend MS2 | API de pedidos con Spring Boot + PostgreSQL |
| Backend MS3 | API de usuarios con Node.js + MongoDB |
| Backend MS4 | API de historial (consolidación) |
| Backend MS5 | API de analytics con Athena |
| Infraestructura | VMs EC2, Load Balancer, API Gateway, Networking |
📄 Licencia

Este proyecto es parte del curso de Arquitectura de Software - Todos los derechos reservados.
📞 Contacto

Para dudas o soporte, abrir un issue en el repositorio o contactar al equipo de desarrollo.

Desarrollado con 💻 y ☕ por el equipo ShopCloud
