import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButton, IonFooter, IonText, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css'; // Asegúrate de que este archivo esté importado correctamente

const Home: React.FC = () => {
  const history = useHistory();

  const goToLogin = () => {
    history.push('./login');
  };

  const goToRegister = () => {
    history.push('./registro');
  };

  const goToMainPage = () => {
    history.push('/principal'); // Ruta para la página principal
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
              <span className="marketlink-title">MarketLink</span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Bienvenido a MarketLink</h1>
          <p>Tu tienda de confianza para todo lo que necesitas</p>
        </div>

        {/* Tarjetas para los botones */}
        <IonRow className="ion-text-center action-cards">
          <IonCol size="12" sizeMd="4">
            <IonCard onClick={goToLogin} button>
              <IonCardContent>
                <h3>Iniciar Sesión</h3>
                <p>Accede a tu cuenta para explorar productos exclusivos.</p>
                <IonButton className="iniciar-sesion-btn" expand="block">
                  Iniciar Sesión
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard onClick={goToRegister} button>
              <IonCardContent>
                <h3>Crear Cuenta</h3>
                <p>Únete a MarketLink y empieza a vender o comprar productos.</p>
                <IonButton className="crear-cuenta-btn" expand="block">
                  Crear Cuenta
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard onClick={goToMainPage} button>
              <IonCardContent>
                <h3>Página Principal</h3>
                <p>Explora todas nuestras categorías y productos destacados.</p>
                <IonButton className="main-page-btn" expand="block">
                  Ir a Página Principal
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>

      <IonFooter>
        <IonText>
          <p className="footer-text">
            &copy; 2024 MarketLink. Todos los derechos reservados.
          </p>
        </IonText>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
