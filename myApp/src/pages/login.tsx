import React, { useState } from "react";
import './login.css'; // Asegúrate de importar el archivo CSS

import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    if (data.username === "admin" && data.password === "1234") {
      alert("Inicio de sesión exitoso");
      history.push("/home"); // Redirige al usuario a la página principal
    } else {
      setShowToast(true); // Muestra un mensaje de error
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
              Inicio de sesion
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="login-container">
          {/* Formulario de inicio de sesión */}
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <h2 className="login-title">Iniciar Sesión</h2>

            {/* Campo Usuario */}
            <IonItem className="login-item">
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <IonInput
                    {...field}
                    placeholder="Ingrese su usuario"
                    required
                  />
                )}
              />
            </IonItem>

            {/* Campo Contraseña */}
            <IonItem className="login-item">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <IonInput
                    {...field}
                    type="password"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                )}
              />
            </IonItem>

            {/* Botón de iniciar sesión */}
            <IonButton expand="block" type="submit" className="login-button">
              Iniciar Sesión
            </IonButton>

            {/* Botón de registro */}
            <IonButton
              expand="block"
              fill="outline"
              className="register-button"
              onClick={() => history.push("/registro")}
            >
              Crear Cuenta
            </IonButton>
          </form>
        </div>

        {/* Mensaje de error */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Usuario o contraseña incorrectos"
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
