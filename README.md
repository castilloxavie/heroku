# Heroku Automation Project

Un proyecto de automatización web utilizando Puppeteer para navegar en páginas web, extraer información y generar PDFs, con registro de acciones en una base de datos MySQL mediante Sequelize.

## Descripción

Este proyecto automatiza la navegación en el sitio web [The Internet](https://the-internet.herokuapp.com/), extrae texto de elementos específicos, genera un PDF de la página y registra todas las acciones realizadas en una base de datos para seguimiento y auditoría.

## Características

- **Automatización Web**: Navegación automática en páginas web usando Puppeteer.
- **Extracción de Datos**: Obtención de texto de elementos HTML específicos.
- **Generación de PDFs**: Creación de archivos PDF de las páginas visitadas.
- **Registro de Acciones**: Almacenamiento de todas las acciones (navegación, extracción, creación de PDF) en una base de datos MySQL.
- **Configuración Flexible**: Uso de variables de entorno para configuración segura.
- **Manejo de Errores**: Registro de errores y estados de las operaciones.

## Tecnologías Utilizadas

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white" alt="Puppeteer" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white" alt="Dotenv" />
</p>

- **Node.js**: Entorno de ejecución.
- **Puppeteer**: Para automatización de navegadores.
- **Sequelize**: ORM para interacción con MySQL.
- **MySQL2**: Driver para MySQL.
- **Dotenv**: Gestión de variables de entorno.

## Requisitos Previos

- Node.js (versión 14 o superior)
- MySQL (servidor de base de datos)
- npm o yarn

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd heroku
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto:
   ```env
   DB_NAME=tu_base_de_datos
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   DB_PORT=3306
   BASE_URL=https://the-internet.herokuapp.com/
   ```

## Configuración de la Base de Datos

1. Asegúrate de que MySQL esté ejecutándose y crea una base de datos.

2. Ejecuta el script de sincronización para crear la tabla de acciones:
   ```bash
   node src/models/syn.js
   ```

   Esto creará la tabla `accion` con los campos necesarios.

## Uso

1. Ejecuta el script principal:
   ```bash
   npm run entrada
   ```

   O directamente:
   ```bash
   node src/index.js
   ```

2. El script realizará las siguientes acciones:
   - Navega a la página principal de The Internet.
   - Espera 2 segundos.
   - Extrae el texto del elemento h1.
   - Crea un PDF de la página en `src/pdf/archivoPrincipal.pdf`.
   - Registra todas las acciones en la base de datos.

## Estructura del Proyecto

```
heroku/
├── src/
│   ├── config/
│   │   ├── browser.js    # Configuración del navegador Puppeteer
│   │   └── env.js        # Variables de entorno
│   ├── databases/
│   │   └── db.js         # Conexión a la base de datos
│   ├── models/
│   │   ├── Accion.js     # Modelo de la tabla de acciones
│   │   └── syn.js        # Script de sincronización de DB
│   ├── heruko/
│   │   └── gestion.js    # Lógica principal de automatización
│   ├── utils/
│   │   └── wait.js       # Utilidad para esperas
│   └── index.js          # Punto de entrada
├── .env                  # Variables de entorno (no versionado)
├── package.json
└── README.md
```

## Modelo de Datos

La tabla `accion` almacena las siguientes informaciones:

- `id`: Identificador único (auto-incremental)
- `tipo_accion`: Tipo de acción (navigate, get_text, create_pdf, error)
- `url`: URL de la página donde se realizó la acción
- `selector`: Selector CSS del elemento (si aplica)
- `timestamp`: Fecha y hora de la acción
- `status`: Estado de la acción (success, error)
- `detalles`: Información adicional sobre la acción

## Desarrollo

Para extender la funcionalidad:

1. Agrega nuevas acciones en `src/heruko/gestion.js` usando la función `logAction` para registrar en DB.
2. Crea nuevos modelos en `src/models/` si necesitas tablas adicionales.
3. Actualiza las utilidades en `src/utils/` según sea necesario.

## Contribución

1. Fork el proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia ISC.

## Contacto

Para preguntas o soporte, por favor contacta al desarrollador.
