import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';

const regiones = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
  'Valparaíso', 'Metropolitana de Santiago', 'O’Higgins', 'Maule', 'Ñuble',
  'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén del General Carlos Ibáñez del Campo', 'Magallanes y de la Antártica Chilena'
];

const comunas: { [key: string]: string[] } = {
  'Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
  'Antofagasta': ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Baquedano'],
  'Atacama': ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Freirina', 'Huasco'],
  'Coquimbo': ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Vicuña', 'Paiguano', 'Monte Patria', 'Punitaqui', 'Ovalle', 'Combarbalá', 'Los Vilos', 'Salamanca'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Concón', 'Quillota', 'Villa Alemana', 'La Calera', 'La Ligua', 'San Felipe', 'Los Andes', 'Quilpué', 'Olmué', 'Casablanca'],
  'Metropolitana de Santiago': ['Santiago', 'Maipú', 'La Florida', 'Puente Alto', 'Las Condes', 'Ñuñoa', 'Providencia', 'Vitacura'],
  'O’Higgins': ['Rancagua', 'Machalí', 'Pichilemu', 'San Fernando', 'Chimbarongo', 'San Vicente de Tagua Tagua'],
  'Maule': ['Talca', 'Curicó', 'Linares', 'Molina', 'San Javier', 'San Clemente', 'Pencahue'],
  'Ñuble': ['Chillán', 'Bulnes', 'San Carlos', 'Cobquecura', 'Quirihue', 'Yungay'],
  'Biobío': ['Concepción', 'Chillán', 'Los Ángeles', 'Hualpén', 'Coronel', 'Penco'],
  'La Araucanía': ['Temuco', 'Villarrica', 'Pucón', 'Cautín', 'Freire'],
  'Los Ríos': ['Valdivia', 'Lago Ranco', 'La Unión', 'Río Bueno'],
  'Los Lagos': ['Puerto Montt', 'Puerto Varas', 'Osorno', 'Ancud'],
  'Aysén del General Carlos Ibáñez del Campo': ['Coyhaique', 'Chile Chico', 'Aysén'],
  'Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Puerto Natales', 'Porvenir']
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [newRegion, setNewRegion] = useState<string>('');
  const [newComuna, setNewComuna] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener los datos del usuario desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
    setUser(storedUser);
    if (storedUser) {
      setNewRegion(storedUser.region || '');
      setNewComuna(storedUser.comuna || '');
    }
  }, []);

  // Función para manejar el cambio de región y actualizar la lista de comunas
  const handleRegionChange = (e: CustomEvent) => {
    const selectedRegion = e.detail.value;
    setNewRegion(selectedRegion);
    setNewComuna(''); // Resetear comuna al cambiar de región
  };

  const handleUpdateLocation = async () => {
    if (!newRegion || !newComuna) {
      alert('Por favor, ingrese una región y una comuna válidas.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/auth/ProfilePage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          region: newRegion,
          comuna: newComuna,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        alert(data.message);
      } else {
        setError(data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error al actualizar la región y comuna:', err);
      setError('Error al actualizar la región y comuna');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {user ? (
          <IonCard>
            <IonCardContent>
              <h2>Perfil de {user.nombre}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>RUT:</strong> {user.rut}</p>
              <p><strong>Fecha de Nacimiento:</strong> {user.fechanacimiento}</p>
              <p><strong>Región:</strong> {user.region}</p>
              <p><strong>Comuna:</strong> {user.comuna}</p>

              <h3>Editar Información de Ubicación</h3>
              <IonSelect value={newRegion} placeholder="Seleccione una región" onIonChange={handleRegionChange}>
                {regiones.map((region, index) => (
                  <IonSelectOption key={index} value={region}>{region}</IonSelectOption>
                ))}
              </IonSelect>

              {newRegion && (
                <IonSelect value={newComuna} placeholder="Seleccione una comuna" onIonChange={e => setNewComuna(e.detail.value || '')}>
                  {comunas[newRegion].map((comuna, index) => (
                    <IonSelectOption key={index} value={comuna}>{comuna}</IonSelectOption>
                  ))}
                </IonSelect>
              )}

              <IonButton onClick={handleUpdateLocation} disabled={loading}>
                {loading ? 'Actualizando...' : 'Actualizar'}
              </IonButton>

              {error && <p style={{ color: 'red' }}>{error}</p>}
            </IonCardContent>
          </IonCard>
        ) : (
          <p>Cargando perfil...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
