import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonMenu,
  IonMenuButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { menu } from "ionicons/icons"; // Importa el ícono de menú hamburguesa

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [popoverState, setPopoverState] = useState<{
    show: boolean;
    event: Event | undefined;
  }>({ show: false, event: undefined });
  const [searchText, setSearchText] = useState<string>("");
  const [usuario, setUsuario] = useState<{ email: string } | null>(null); // Estado para el usuario

  const categories = [
    { name: "Electrónica", subcategories: ["Celulares", "Televisores", "Computadoras", "Cámaras"] },
    { name: "Ropa", subcategories: ["Hombres", "Mujeres", "Niños"] },
    { name: "Hogar", subcategories: ["Muebles", "Electrodomésticos", "Decoración"] },
    { name: "Deportes", subcategories: ["Fútbol", "Ciclismo", "Running", "Natación", "Gimnasia"] },
    { name: "Automotriz", subcategories: ["Accesorios para autos", "Neumáticos", "Herramientas", "Repuestos"] },
    { name: "Juguetes", subcategories: ["Juguetes educativos", "Muñecas", "Juguetes de construcción", "Juguetes para bebé"] },
    { name: "Libros", subcategories: ["Ficción", "No Ficción", "Infantiles", "Cómics", "Educación"] },
    { name: "Arte y Manualidades", subcategories: ["Pinturas", "Escultura", "Materiales para manualidades", "Lanas y hilos"] },
  ];

  const history = useHistory();

  useEffect(() => {
    // Obtener los datos del usuario desde localStorage
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleCategoryClick = (event: any, category: string) => {
    setSelectedCategory(category);
    setPopoverState({ show: true, event });
  };

  const handleProfileClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      alert("¡Accediendo a tu perfil!");
    } else {
      history.push("/login");
    }
  };

  const handlePublishProductClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    history.push("./publicar"); // Asegúrate de tener esta ruta configurada
  };

  return (
    <IonPage>
      {/* Menú hamburguesa */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {/* Botón para publicar un producto */}
            <IonItem button onClick={handlePublishProductClick}>
              <IonLabel style={{ color: "green" }}>Publicar un Producto</IonLabel>
            </IonItem>

            {/* Categorías */}
            {categories.map((category) => (
              <IonItem
                button
                key={category.name}
                onClick={(e) => handleCategoryClick(e, category.name)}
              >
                <IonLabel>{category.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>

      <IonHeader>
        <IonToolbar color="black" className="toolbar-desktop">
          <IonButtons slot="start">
            {/* Icono de menú hamburguesa */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <div className="header-logo-title" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281397.png"
                alt="Logo de MarketLink"
                className="logo"
                style={{ width: "40px", marginRight: "5px" }}
              />
              <span className="marketlink-title">MarketLink</span>
            </div>
          </IonTitle>
          <IonButtons slot="end" style={{ display: "flex", alignItems: "center" }}>
            <IonSearchbar
              value={searchText}
              onIonInput={(e: any) => setSearchText(e.target.value)}
              debounce={0}
              placeholder="Buscar productos..."
              style={{ width: "180px", marginLeft: "5px" }}
            />
            {/* Icono de perfil */}
            <IonButton onClick={handleProfileClick} style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                alt="Perfil"
                style={{ width: "30px" }}
              />
              {/* Mostrar el correo solo si el usuario está logueado */}
              {usuario && <span style={{ marginLeft: "10px", fontWeight: "bold" }}>{usuario.email}</span>}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" id="main-content">
        <h1>Bienvenido a MarketLink</h1>
        {usuario ? (
          <p>Hola, {usuario.email}</p> // Mostrar el email del usuario si está logueado
        ) : (
          <p>No hay datos de sesión. Inicia sesión.</p> // Mensaje si no hay usuario logueado
        )}

        <IonPopover
          isOpen={popoverState.show}
          event={popoverState.event}
          onDidDismiss={() => setPopoverState({ show: false, event: undefined })}
        >
          <IonList>
            {categories
              .find((cat) => cat.name === selectedCategory)
              ?.subcategories.map((subcategory) => (
                <IonItem button key={subcategory}>
                  <IonLabel>{subcategory}</IonLabel>
                </IonItem>
              ))}
          </IonList>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
