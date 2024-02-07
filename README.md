#  JSONfy
JSONfy es un servicio web generador de datos aleatorios con posibilidad de descargarlos en formato JSON
##  Siga estos pasos para ejecutar el programa
sudo docker build -t jsonfy .   
sudo docker run -d -it -p 5003:80 --restart unless-stopped --name jsonfy-app jsonfy

## Consideraciones
JSONfy fue creado con el objetivo de ser un servicio escalable, ya que no solo se quiere descargar archivos 
JSON sino en implementaciones posteriores archivos como xml, csv y SQL.

En la carpeta de "img", se encuentran los logos de los 3 formatos del programa que se implementarían a futuro.
##  Autores
-  **[Judithpc23](https://github.com/Judithpc23)**
-  **[Alinsonp](https://github.com/Alinsonp)**
-  **[Edadul](https://github.com/Edadul)**
