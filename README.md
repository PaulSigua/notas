# Introducción #

Mi aplicación fue realizada utilizando Angular 16.
Utilice herramientas como firebase de Google y PWA.
Mi aplicación está enfocada en guardar notas o tareas, es posible guardarlas en secciones y determinar una fecha.

# Instalación de Angular #

Instalar las dependencias del proyecto
1) Ejecutar el comando npm install.

Agregar Firebase Hosting al proyecto
1) Crear un proyecto en firebase.
2) Desde el sitio web de firebase agregamos el hosting al proyecto.
3) Instalamos firebase CLI con el comando npm install -g firebase-tools. Este paso se realiza si 
no tenemos instalado firebase CLI.
4) Ejecutamos el comando firebase login, para realizar la autenticación en la cuenta.
5) Después de ejecutar el comando firebase init, seleccionamos el servicio Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys.
6) Seleccionamos el proyecto que creamos en firebase.
7) Ejecutamos el comando npm run build.
8) En el archivo firebase.json, en el campo public del hosting ponemos la ruta de la carpeta que se creo en en la carpeta dist. La ruta sería dist/pwa-tareas, esta ruta puede variar.
9) Ejecutamos el comando firebase deploy para desplegar la aplicación.

# Configuración de Firebase # 

1) Ejecutar el comando firebase init, seleccionamos el servicio de firestore.
2) Creamos la base de datos.
3) Ejecutamos el comando ng add @angular/fire.
4) Seleccionamos solamente firestore.
5) Seleccionamos el proyecto creado en firebase.
6) Creamos una nueva aplicación.
7) En la configuración del proyecto, en la sección Tus Apps, tenemos la apliación que creamos en 
el paso 6. En la configuración del SDK seleccionamos npm, copiamos los campos del firebaseConfig 
en el archivo enviroment.ts

# ¿Mi código utiliza? #

1) Utilizo tecnicas de redimensión
2) Estilos con colores no tan profundos
3) Métodos simples pero efectivos
4) Conexión a una base de datos

# Configuración de la herrmienta PWA #

Para hacer que la aplicación sea pwa 
1) ejecutamos el comando ng add @angular/pwa.
2) Instalamos en una PC
3) Instalamos en un dispositivo movil