# MarketLink
#Nombre integrantes: Julian Del Rio, Cristóbal Reyes, Cristóbal Cameron.

MarketLink es una página web tipo marketplace para la compra y venta de productos. 

## Funcionalidades del proyecto 
- **Registro e inicio de sesión de usuarios**: Los usuarios pueden registrarse e iniciar sesión en la plataforma.
- **Publicación de productos**: Los usuarios pueden publicar productos con imágenes y descripciones a través de una solicitud enviada a el usuario administrador.
- **Borrar productos**:Los usuarios pueden eliminar sus propios productos publicados. 
- **Búsqueda avanzada**: Permite filtrar productos por categorías.
- **Ver detalles**: Se pueden ver los detalles de cada producto.




## Uso y funciones disponibles.
1. Se puede registrar usuario, cada usuario puede enviar una solicitud para publicar un producto con su descripción, categoría, fotos,etc. Cada usuario puede dar de baja sus propios productos publicados.

2. IMPORTANTE, para aceptar solicitudes se deben aceptar desde el usuario único administrador:
usuario: admin
contraseña: admin123

3. El usuario administrador puede aceptar o rechazar solicitudes de productos y  y a su vez puede eliminar productos si lo desea desde el panel del administrador. El usuario administrador también puede publicar sus propios productos desde el home.

##ENTREGA PARCIAL 2
EP2.2 Logramos hacer lectura desde un archivo json local para productos y estos se muestran en la pantalla home.html.(Recomiendo iniciar sesion desde el administrador para que cargue correctamente el archivo)

EP2.3.
Elegí PostgreSQL por su robustez y flexibilidad como sistema de gestión de bases de datos relacional. Ofrece características avanzadas como transacciones ACID y soporte nativo para JSON, lo que lo hace ideal para manejar tanto datos estructurados como no estructurados. Su escalabilidad y alto rendimiento son esenciales para aplicaciones en crecimiento, mientras que su fuerte enfoque en la seguridad asegura la protección de los datos. Además, al ser un software de código abierto, permite reducir costos sin comprometer la calidad. Ademas tenemos experiencia en este.
1. Tabla usuarios
Propósito: Almacena la información de los usuarios que se registran en la plataforma.
Detalles:
Cada usuario tiene un ID único, un RUT que sirve como identificación (único por usuario en Chile), y su información básica como nombre, correo electrónico, y contraseña.
Además, incluye datos personales adicionales como la fecha de nacimiento, comuna, y región de residencia, lo cual es útil para saber dónde están ubicados.
Fecha de registro guarda la fecha en que se unieron a la plataforma.
Función en el sistema: Representa a los usuarios que pueden enviar solicitudes de publicación de productos y realizar pedidos de los productos disponibles.
2. Tabla administradores
Propósito: Almacena la información de los administradores, quienes tienen permisos especiales para gestionar la plataforma.
Detalles:
Cada administrador tiene su propio ID, nombre, correo electrónico, y una contraseña, como en la tabla de usuarios.
La fecha de registro se guarda para mantener un historial de cuándo ingresaron los administradores.
Función en el sistema: Los administradores son responsables de revisar y aprobar o rechazar las solicitudes de publicación de productos. Esto asegura que solo ellos tienen el control sobre qué productos se publican.
3. Tabla productos
Propósito: Almacena los productos que ya han sido aprobados para su publicación en la plataforma.
Detalles:
Cada producto tiene un ID único, un nombre, descripción, precio, y fecha de publicación.
El ID del usuario que publicó el producto está aquí para vincularlo con la persona que lo solicitó.
También se almacenan la comuna y la región del usuario que lo publicó, para que cualquier interesado pueda ver la ubicación general del producto.
El estado indica si el producto está activo o ha sido eliminado (por un administrador).
Función en el sistema: Una vez que los productos han sido aprobados, están disponibles en esta tabla para que los usuarios los vean y realicen pedidos.
4. Tabla solicitudes_productos
Propósito: Contiene las solicitudes que los usuarios envían para publicar productos en la plataforma, las cuales los administradores pueden aprobar o rechazar.
Detalles:
Cada solicitud tiene un ID y está asociada al ID del usuario que hizo la solicitud y al ID del administrador que la procesó.
Contiene los detalles del producto solicitado, como el nombre, descripción, y precio.
Fecha de solicitud indica cuándo fue enviada la solicitud.
Estado de solicitud indica si la solicitud está pendiente, aprobada o rechazada.
Función en el sistema: Esta tabla es fundamental para que los usuarios soliciten la publicación de sus productos. Los administradores revisan las solicitudes aquí y deciden si el producto se publica o no. Si se aprueba, el producto se transfiere a la tabla productos.


EP2.4.Logramos que todas las pantallas sean responsivas, logramos un patron de diseño distinto en el home.html, en el caso de telefonos celulares(828x1792px)tenemos un menu hamburguesa en vez de una barra navegadora y los productos ya no se muestran en filas de a 4 productos sino que en filas de a 2 productos, tambien logramos otro patron de diseño en el panel del administrador admin.html en el cual ahora se pueden seleccionar los productos tocandolos para poder verlos de mas cerca y el boton de eliminar es mas grande.