Enlaces, CI/CD e Instrucciones 

1. Enlace del Repositorio (Código Fuente y CI/CD): 

GitHub URL: https://github.com/santiagovalle1245-ship-it/Act4-gestion-productos  

Nota: Dentro del repositorio se encuentra el código fuente completo y el archivo de configuración del pipeline de CI/CD alojado en la ruta: .github/workflows/main.yml. 



2. Instrucciones para ejecutar la aplicación localmente: Para correr el proyecto en un entorno de desarrollo, sigue estos pasos: 

Clonar el repositorio: Abre una terminal y ejecuta git clone https://github.com/santiagovalle1245-ship-it/Act4-gestion-productos. 

Instalar dependencias: Navega a la carpeta del proyecto y ejecuta el comando npm install. 

Configurar Variables de Entorno: Crea un archivo llamado .env en la raíz del proyecto e incluye las variables necesarias: PORT (ej. 3000), MONGO_URI (tu cadena de conexión de Atlas) y JWT_SECRET (tu palabra secreta). 

Ejecutar pruebas automatizadas: Para verificar la integridad del código ejecutando el entorno de Jest, utiliza el comando npm test. 

Iniciar el servidor: Ejecuta npm run dev para levantar la API mediante Nodemon. La aplicación estará escuchando en http://localhost:3000 y la interfaz gráfica estará disponible en la ruta http://localhost:3000/login.html. 



3. Acceso a la aplicación en vivo (Despliegue en Vercel): Para evaluar el funcionamiento de la aplicación en la nube de forma rápida y sin necesidad de instalación local, puede acceder directamente a la vista del cliente (Frontend) a través del siguiente enlace oficial: 

Enlace de la aplicación: https://act4-gestion-productos.vercel.app/register.html 

Esta vista estática se comunica de forma exitosa con la API Serverless desplegada en Vercel y persiste los datos en el clúster remoto de MongoDB Atlas 
