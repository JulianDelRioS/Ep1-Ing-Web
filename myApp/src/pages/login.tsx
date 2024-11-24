import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButton, IonFooter, 
  IonItem, IonLabel, IonInput, IonRow, IonCol, IonCard, IonCardContent, 
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // Importa el componente reCAPTCHA
import './login.css';

const Login: React.FC = () => {
  const history = useHistory();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleLogin = async () => {
    // Validaciones antes de enviar
    if (!email || !password) {
      setMensaje('Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Validar el CAPTCHA
    if (!captchaValue) {
      setMensaje('Por favor, verifica que no eres un robot.');
      return;
    }

    // Enviar los datos al backend
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          captcha: captchaValue,  // Enviar el valor del CAPTCHA
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Inicio de sesión exitoso.');
        setTimeout(() => history.push('/principal'), 2000); // Redirige después de 2 segundos a la página de inicio
      } else {
        setMensaje(data.error || 'Error al iniciar sesión.');
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
          <h1>Inicia Sesión</h1>
          <p>Accede a tu cuenta para comprar o vender productos.</p>
        </div>

        {/* Formulario de Login */}
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonLabel>Correo Electrónico:</IonLabel>
                  <IonInput 
                    value={email} 
                    onIonChange={e => setEmail(e.detail.value!)} 
                    type="email"
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
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            {/* CAPTCHA de Google */}
            <IonRow>
              <IonCol size="12">
                <ReCAPTCHA
                  sitekey="6LfM9IcqAAAAAEprABk8l-YZLx1SLbZKj1lZJvrl"  // Reemplaza con tu clave de sitio
                  onChange={setCaptchaValue}
                />
              </IonCol>
            </IonRow>

            {/* Botón de Login */}
            <IonButton expand="full" onClick={handleLogin}>
              Iniciar sesión
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Mensaje */}
        {mensaje && <IonText color={mensaje.includes('exitoso') ? 'success' : 'danger'}>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>{mensaje}</p>
        </IonText>}
      </IonContent>

      <IonFooter>
        <IonButton fill="clear" onClick={() => history.push('/registro')}>
          ¿No tienes cuenta? Regístrate
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
