import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent } from '@ionic/react';

if (process.env.NODE_ENV === 'development') {
    console.log('Modo desarrollo activado');
  }

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  console.log("Mensaje antes de entrar a useEffect");
    // Obtener los datos del usuario desde localStorage
    useEffect(() => {
        console.log("useEffect ejecutado"); // Este debería aparecer si el useEffect se ejecuta correctamente
        const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
        console.log("Usuario almacenado:", storedUser); // Asegúrate de ver si hay algo en localStorage
        setUser(storedUser);
      }, []);

  console.log('User state:', user); // Verificar el estado actual de "user"

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
            </IonCardContent>
          </IonCard>
        ) : (
          <p>Cargando perfil...</p>  // Este mensaje aparecerá hasta que "user" esté cargado
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;