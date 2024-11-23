import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButton, IonFooter, 
  IonItem, IonLabel, IonInput, IonRow, IonCol, IonCard, IonCardContent, 
  IonSelect, IonSelectOption, IonDatetime, IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './registro.css';

const Registro: React.FC = () => {
  const history = useHistory();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [region, setRegion] = useState<string>('');
  const [comuna, setComuna] = useState<string>('');
  const [mensaje, setMensaje] = useState('');

  const regiones = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
    'Valparaíso', 'Metropolitana de Santiago', 'O’Higgins', 'Maule', 'Ñuble',
    'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén del General Carlos Ibáñez del Campo', 'Magallanes y de la Antártica Chilena'
  ];
  const comunas: { [key: string]: string[] } = {
    'Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
    'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
    'Antofagasta': ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Baquedano', 'Antofagasta'],
    'Atacama': ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Freirina', 'Huasco'],
    'Coquimbo': ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Vicuña', 'Paiguano', 'Monte Patria', 'Punitaqui', 'Ovalle', 'Combarbalá', 'Los Vilos', 'Salamanca'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Concón', 'Quillota', 'Villa Alemana', 'La Calera', 'La Ligua', 'San Felipe', 'Los Andes', 'Quilpué', 'Olmué', 'Casablanca', 'San Antonio', 'Cartagena', 'El Quisco', 'El Tabo', 'Algarrobo'],
    'Metropolitana de Santiago': ['Santiago', 'Maipú', 'La Florida', 'Puente Alto', 'Las Condes', 'Ñuñoa', 'Providencia', 'Vitacura', 'San Miguel', 'Estación Central', 'Renca', 'Macul', 'La Pintana', 'La Reina', 'Pudahuel', 'Cerrillos', 'Pedro Aguirre Cerda', 'El Bosque', 'Lo Espejo', 'La Granja', 'Cerro Navia', 'Quilicura', 'Pudahuel', 'San Joaquín', 'Ñuñoa'],
    'O’Higgins': ['Rancagua', 'Machalí', 'Pichilemu', 'San Fernando', 'Chimbarongo', 'San Vicente de Tagua Tagua', 'Rengo', 'Graneros', 'Mostazal', 'Codegua', 'Las Cabras', 'Cauquenes', 'Coltauco'],
    'Maule': ['Talca', 'Curicó', 'Linares', 'Molina', 'San Javier', 'San Clemente', 'Pencahue', 'Constitución', 'Yerbas Buenas', 'Chanco', 'Cauquenes', 'Villa Alegre'],
    'Ñuble': ['Chillán', 'Bulnes', 'San Carlos', 'Cobquecura', 'Quirihue', 'Yungay', 'Pemuco', 'Ránquil', 'Ñiquén'],
    'Biobío': ['Concepción', 'Chillán', 'Los Ángeles', 'Hualpén', 'Coronel', 'Penco', 'Lota', 'Talcahuano', 'Hualqui', 'San Pedro de la Paz', 'Tome', 'Nacimiento', 'Laja', 'Antuco', 'Santa Bárbara'],
    'La Araucanía': ['Temuco', 'Villarrica', 'Pucón', 'Cautín', 'Freire', 'Loncoche', 'Curarrehue', 'Toltén', 'Teodoro Schmidt'],
    'Los Ríos': ['Valdivia', 'Lago Ranco', 'La Unión', 'Río Bueno', 'Los Lagos'],
    'Los Lagos': ['Puerto Montt', 'Puerto Varas', 'Osorno', 'Ancud', 'Castro', 'Chiloé', 'Puyehue'],
    'Aysén del General Carlos Ibáñez del Campo': ['Coyhaique', 'Chile Chico', 'Aysén', 'Cerro Castillo'],
    'Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos', 'Antártica']
  };

  const handleRegister = async () => {
    // Validaciones antes de enviar
    if (!nombre || !email || !password || !confirmPassword || !rut || !fechaNacimiento || !region || !comuna) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }

    // Enviar los datos al backend
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nombre,
          email,
          password,
          rut,
          fechaNacimiento,
          region,
          comuna,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Usuario creado exitosamente.');
        setTimeout(() => history.push('/login'), 2000); // Redirige después de 2 segundos
      } else {
        setMensaje(data.error || 'Error al crear el usuario.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al conectar con el servidor.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="black">
          <IonTitle>
            <div className="header-logo-title">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/281/281397.png" 
                alt="Logo de MarketLink"
                className="logo"
              />
              MarketLink
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="hero-section">
          <h1>Crea tu Cuenta</h1>
          <p>Únete a nuestra plataforma y empieza a comprar o vender productos.</p>
        </div>

        {/* Formulario de Registro */}
        <IonCard>
          <IonCardContent>
            <IonRow>
              {/* Campos del formulario */}
              <IonCol size="12">
                <IonItem>
                  <IonLabel>Nombre Completo:</IonLabel>
                  <IonInput 
                    value={nombre} 
                    onIonChange={e => setNombre(e.detail.value!)} 
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem>
                    <IonLabel>Correo Electrónico:</IonLabel>
                    <IonInput 
                        value={email} 
                        onIonChange={e => setEmail(e.detail.value!)} 
                        style={{ marginLeft: '2%' }}
                    />
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem>
                
                    <IonLabel>Contraseña:</IonLabel>
                    <IonInput 
                        type="password" 
                        value={password} 
                        onIonChange={e => setPassword(e.detail.value!)} 
                        style={{ marginLeft: '2%' }}
                    />
                </IonItem>
              </IonCol>

              <IonCol size="12">

                <IonItem>
                    <IonLabel>Confirmar Contraseña:</IonLabel>
                    <IonInput 
                        type="password" 
                        value={confirmPassword} 
                        onIonChange={e => setConfirmPassword(e.detail.value!)} 
                        style={{ marginLeft: '2%' }}
                    />
                </IonItem>
              </IonCol>

              <IonCol size="12">
              <IonItem>
                <IonLabel>RUT:</IonLabel>
                <IonInput
                    value={rut}
                    onIonChange={e => {
                    let input = e.detail.value!;
                    // Agregar el guion y el dígito verificador después de los 8 primeros dígitos
                    if (input.length > 8) {
                        input = `${input.slice(0, 8)}-${input.slice(8)}`;
                    }
                    setRut(input);
                    }}
                    maxlength={9} // El atributo correcto es "maxlength"
                    style={{ marginLeft: '1%' }}
                />
                </IonItem>


              </IonCol>

              <IonCol size="12">
                <IonItem>
                  <IonLabel position="floating">Fecha de Nacimiento:</IonLabel>
                  <IonDatetime 
                    value={fechaNacimiento} 
                    onIonChange={e => setFechaNacimiento(e.detail.value as string)} // Asegúrate de que el valor sea string
                    style={{ marginLeft: 'auto' }} 
                  />
                </IonItem>
              </IonCol>

              {/* Select de Región */}
              <IonCol size="12">
                <IonItem>
                  <IonLabel>Región</IonLabel>
                  <IonSelect 
                    value={region} 
                    onIonChange={e => setRegion(e.detail.value!)} 
                    placeholder="Seleccione una región"
                  >
                    {regiones.map((regionName, index) => (
                      <IonSelectOption key={index} value={regionName}>
                        {regionName}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>

              {/* Select de Comuna */}
              <IonCol size="12">
                <IonItem>
                  <IonLabel>Comuna</IonLabel>
                  <IonSelect 
                    value={comuna} 
                    onIonChange={e => setComuna(e.detail.value!)} 
                    placeholder="Seleccione una comuna"
                    disabled={!region}
                  >
                    {region && comunas[region].map((comunaName, index) => (
                      <IonSelectOption key={index} value={comunaName}>
                        {comunaName}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>                          
            </IonRow>

            {/* Botón de Registro */}
            <IonButton expand="full" onClick={handleRegister}>
              Registrarse
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Mensaje */}
        {mensaje && <IonText color={mensaje.includes('exitosamente') ? 'success' : 'danger'}>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>{mensaje}</p>
        </IonText>}
      </IonContent>

      <IonFooter>
        <IonButton fill="clear" onClick={() => history.push('/login')}>
          ¿Ya tienes cuenta? Inicia sesión
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Registro;
