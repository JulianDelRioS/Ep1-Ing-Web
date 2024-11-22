import React, { useState } from "react";
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
} from "@ionic/react";

const MainPage: React.FC = () => {
  // Estados para manejar qué categoría está activa
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [popoverState, setPopoverState] = useState<{
    show: boolean;
    event: Event | undefined;
  }>({ show: false, event: undefined });

  // Definir categorías y subcategorías
  const categories = [
    {
      name: "Electrónica",
      subcategories: ["Celulares", "Televisores", "Computadoras", "Cámaras"],
    },
    {
      name: "Ropa",
      subcategories: ["Hombres", "Mujeres", "Niños"],
    },
    {
      name: "Hogar",
      subcategories: ["Muebles", "Electrodomésticos", "Decoración"],
    },
  ];

  const handleCategoryClick = (event: any, category: string) => {
    setSelectedCategory(category);
    setPopoverState({ show: true, event });
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
          <IonButtons slot="end">
            {categories.map((category) => (
              <IonButton
                key={category.name}
                onClick={(e) => handleCategoryClick(e, category.name)}
              >
                {category.name}
              </IonButton>
            ))}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Bienvenido a MarketLink</h1>
        <p>Explora nuestras categorías y encuentra lo que necesitas.</p>
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
