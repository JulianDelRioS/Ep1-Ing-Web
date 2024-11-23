import React, { useState } from "react";
import {
  IonPopover,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar, // Importa IonSearchbar
} from "@ionic/react";
import { useHistory } from "react-router-dom"; // Importar useHistory para redirigir

const MainPage: React.FC = () => {
  // Estados para manejar qué categoría está activa
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [popoverState, setPopoverState] = useState<{
    show: boolean;
    event: Event | undefined;
  }>({ show: false, event: undefined });
  const [searchText, setSearchText] = useState<string>("");

  // Definir categorías y subcategorías
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

  const history = useHistory(); // Usamos useHistory para redirigir

  const handleCategoryClick = (event: any, category: string) => {
    setSelectedCategory(category);
    setPopoverState({ show: true, event });
  };

  const handleProfileClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // Verificar si hay sesión activa en localStorage

    if (isLoggedIn) {
      // Si está logueado, muestra el mensaje
      alert("¡Accediendo a tu perfil!");
    } else {
      // Si no está logueado, redirige a la página de login
      history.push("/login");
    }
  };

  return (
    <IonPage>
      {/* Menú hamburguesa */}
      <IonMenu contentId="main-content" side="start" type="reveal">
        <IonHeader>
          <IonToolbar color="black">
            <IonTitle>
              <div className="header-logo-title" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281397.png"
                  alt="Logo de MarketLink"
                  className="logo"
                  style={{ width: "40px", marginRight: "5px" }} // Ajusta el margen para acercarlo más
                />
                <span className="marketlink-title">MarketLink</span>
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* Menú de categorías */}
          <IonList>
            {categories.map((category) => (
              <IonItem button key={category.name} onClick={(e) => handleCategoryClick(e, category.name)}>
                <IonLabel>{category.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Contenido principal */}
      <IonContent id="main-content" className="ion-padding">
        <IonHeader>
          <IonToolbar color="black">
            <IonButtons slot="start">
              {/* Botón hamburguesa solo en móviles */}
              <IonMenuButton />
            </IonButtons>
            <IonTitle>MarketLink</IonTitle>

            <IonButtons slot="end">
              {/* Barra de búsqueda */}
              <IonSearchbar
                value={searchText}
                onIonInput={(e: any) => setSearchText(e.target.value)}
                debounce={0} // Ajusta el tiempo de espera para actualizar el texto
                placeholder="Buscar productos..."
                style={{ width: "180px", marginLeft: "5px" }} // Reducir el ancho y acercar con marginLeft
              />
              {/* Icono de perfil */}
              <IonButton onClick={handleProfileClick} style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                  alt="Perfil"
                  style={{ width: "30px", marginLeft: "10px" }}
                />
                <span style={{ marginLeft: "5px" }}>Mi Perfil</span>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <h1>Bienvenido a MarketLink</h1>
        <p>Explora nuestras categorías y encuentra lo que necesitas.</p>

        {/* Popover para mostrar subcategorías */}
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
