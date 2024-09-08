// Función de registro de usuario que ya habías agregado
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario
    
    const username = document.querySelector('input[name="username"]').value;
    const Rut = document.querySelector('input[name="Rut"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
    
    // Validación del formato del RUT
    const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
    if (!rutRegex.test(Rut)) {
        alert('Por favor, ingrese un RUT válido en el formato 12345678-9.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, intenta de nuevo.');
        return;
    }

    // Crear un objeto usuario
    const newUser = {
        username: username,
        Rut: Rut,
        email: email,
        password: password

    };

    // Obtener usuarios existentes de localStorage o iniciar con un array vacío
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Agregar el nuevo usuario
    users.push(newUser);

    // Guardar el array de usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario creado exitosamente');

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    
    // Rellenar días
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Rellenar meses
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1; // Meses de 1 a 12
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Rellenar años
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    // Datos de regiones y comunas
    const regionesComunas = {
        1: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
        2: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica', 'Huara', 'Camiña', 'Colchane'],
        3: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama'],
        4: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Freirina', 'Huasco'],
        5: ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'],
        6: ['Valparaíso', 'Viña del Mar', 'Concón', 'Quintero', 'Puchuncaví', 'Casablanca', 'Juan Fernández', 'Quilpué', 'Villa Alemana', 'Limache', 'Olmué', 'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'La Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María'],
        7: ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente', 'Pichilemu', 'La Estrella', 'Litueche', 'Marchigüe', 'Navidad', 'Paredones', 'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz'],
        8: ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas'],
        9: ['Cobquecura', 'Coelemu', 'Ninhue', 'Portezuelo', 'Quirihue', 'Ránquil', 'Treguaco', 'Bulnes', 'Chillán', 'Chillán Viejo', 'El Carmen', 'Pemuco', 'Quillón', 'San Ignacio', 'Yungay', 'Coihueco', 'Ñiquén', 'San Carlos', 'San Fabián', 'San Nicolás'],
        10: ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío'],
        11: ['Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria'],
        12: ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno'],
        13: ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Llanquihue', 'Los Muermos', 'Maullín', 'Puerto Varas', 'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena'],
        14: ['Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O\'Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez'],
        15: ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine'],
        16: ['Santiago', 'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo']
    };
    // Rellenar el select de regiones
    const regiones = [
        'Región de Arica y Parinacota',
        'Región de Tarapacá',
        'Región de Antofagasta',
        'Región de Atacama',
        'Región de Coquimbo',
        'Región de Valparaíso',
        'Región Metropolitana de Santiago',
        'Región del Libertador General Bernardo O\'Higgins',
        'Región del Maule',
        'Región de Ñuble',
        'Región del Biobío',
        'Región de La Araucanía',
        'Región de Los Ríos',
        'Región de Los Lagos',
        'Región de Aysén del General Carlos Ibáñez del Campo',
        'Región de Magallanes y de la Antártica Chilena'
    ];

    regiones.forEach((region, index) => {
        const option = document.createElement('option');
        option.value = index + 1; // El valor será el número de la región
        option.textContent = region;
        regionSelect.appendChild(option);
    });

    // Actualizar las comunas cuando se seleccione una región
    regionSelect.addEventListener('change', function() {
        const regionId = this.value;

        // Limpiar las comunas previas
        comunaSelect.innerHTML = '<option value="" disabled selected>Comuna</option>';

        // Obtener las comunas de la región seleccionada
        const comunas = regionesComunas[regionId];

        // Rellenar el select de comunas
        comunas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    });
});

