# Taller-3-movilHub
   
   php artisan serve --host 192.168.56.1

   abrir carpeta de proyecto con "code ."

   abrir 2 terminales:

   en terminal-1:
     1- "cd back"   (presionar tab luego enter)
     2- "composer install" (2 min)
     3-  configurar .env:
         3.1- copiar .env.example y renombrarlo como .env
         3.2  configurar base de datos , nombre database, password si corresponde
     4- "php artisan key:generate"
     5- "php artisan migrate"  (para crear la bd si no existe)
     6- "php artisan jwt:secret"
     7- "php artisan serve --host 192.168.56.1 " ( esa ip debes colocar la de tu ipconfig )
      

   ** POSTMAN **
   al probar postman luego de iniciar el back
   recuerda cambiar la ip por la tuya :O
   Se usa esta ip a que al usar el emulador android o expo-go de un celular, estos no se conectan a localhost, sino a la ip de tu red

   
   en terminal-2:
      1- "cd fro"  (pres tab luego enter)
      1- "npm install"


