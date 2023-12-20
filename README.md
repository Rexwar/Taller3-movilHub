# Taller-3-movilHub

Instrucciones para configurar y ejecutar el proyecto:

## Configurar y Ejecutar el Backend

1. Abre una terminal y sigue estos pasos:
   1. Cambia al directorio del backend:
      ```
      cd back  (presionar tab autocompletado)
      ```
   2. Instala las dependencias de Composer:
      ```
      composer install
      ```
   3. Configura el archivo `.env`:
      - Copia `.env.example` y renómbralo a `.env`.
      - Configura la base de datos, nombre de la base de datos y contraseña, si corresponde.
   4. Genera la clave de la aplicación:
      ```
      php artisan key:generate
      ```
   5. Ejecuta las migraciones para crear la base de datos:
      ```
      php artisan migrate
      ```
   6. Genera la clave JWT:
      ```
      php artisan jwt:secret
      ```
   7. Inicia el servidor:
      ```
      php artisan serve --host 192.168.56.1
      ```
      Nota: Reemplaza `192.168.56.1` con la IP de tu configuración de `ipconfig`.

### POSTMAN

- Al probar con Postman después de iniciar el backend, recuerda cambiar la IP por la tuya.
- Esta IP se utiliza porque al usar un emulador Android o Expo Go en un celular, estos no se conectan a `localhost`, sino a la IP de tu red.

## Configurar y Ejecutar el Frontend

1. Abre otra terminal y sigue estos pasos:
   1. Cambia al directorio del frontend:
      ```
      cd fro  (presionar tab autocompletado)
      ```
   2. Instala las dependencias de NPM:
      ```
      npm install
      ```
   3. Inicia Expo:
      ```
      npx expo start
      ```
   4. Presiona `a` cuando cargue.
   5. Selecciona el dispositivo y presiona enter.
   6. La primera ejecución tarda aproximadamente 40 segundos, luego baja a 5 segundos.
