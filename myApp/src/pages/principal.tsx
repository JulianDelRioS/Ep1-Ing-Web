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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [popoverState, setPopoverState] = useState<{ show: boolean; event: Event | undefined }>({
    show: false,
    event: undefined,
  });
  const [searchText, setSearchText] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<{ nombre: string; email: string; rut: string; fechanacimiento: string; region: string; comuna: string } | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Cargar productos desde la base de datos
        const response = await fetch("http://localhost:3000/api/auth/products");
        if (!response.ok) {
          throw new Error("Error al cargar los productos desde la API");
        }
        const dataFromAPI = await response.json();

        // Cargar productos desde el archivo JSON local
        const responseJson = await fetch("/productos.json");
        if (!responseJson.ok) {
          throw new Error("Error al cargar el archivo JSON de productos");
        }
        const dataFromJson = await responseJson.json();

        // Combinar los productos de ambas fuentes
        setProducts([...dataFromAPI, ...dataFromJson]);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (event: any, categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null); // Contraer si ya está expandido
    } else {
      setExpandedCategory(categoryName);
    }
    setPopoverState({ show: true, event });
  };

  const handleProfileClick = () => {
    history.push("/ProfilePage");
  };

  const handlePublishProductClick = () => {
    if (usuario) {
      history.push("/publicar", {
        nombre: usuario.nombre,
        email: usuario.email,
        region: usuario.region,
        comuna: usuario.comuna,
        rut: usuario.rut,
      });
    } else {
      history.push("/login");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsuario(null);
    history.push("/login");
  };

  return (
    <IonPage>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button onClick={handlePublishProductClick}>
              <IonLabel style={{ color: "green" }}>Publicar un Producto</IonLabel>
            </IonItem>
            {categories.map((category) => (
              <div key={category.name}>
                <IonItem button onClick={(e) => handleCategoryClick(e, category.name)}>
                  <IonLabel>{category.name}</IonLabel>
                </IonItem>
                {expandedCategory === category.name && (
                  <IonList>
                    {category.subcategories.map((subcategory, index) => (
                      <IonItem key={index} button onClick={() => console.log(`Subcategoría seleccionada: ${subcategory}`)}>
                        <IonLabel>{subcategory}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                )}
              </div>
            ))}
            <IonItem button onClick={handleLogout} style={{ marginTop: "auto", color: "red" }}>
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonHeader>
        <IonToolbar color="black">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281397.png"
                alt="Logo de MarketLink"
                style={{ width: "40px", marginRight: "5px" }}
              />
              MarketLink
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonSearchbar
              value={searchText}
              onIonInput={(e: any) => setSearchText(e.target.value)}
              debounce={0}
              placeholder="Buscar productos..."
            />
            <IonButton onClick={handleProfileClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                alt="Perfil"
                style={{ width: "30px" }}
              />
              {usuario && <span style={{ marginLeft: "10px" }}>{usuario.email}</span>}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content">
        <IonGrid>
          <IonRow>
            {products.map((product) => (
              <IonCol size="12" size-md="6" size-lg="4" key={product.id}>
                <IonCard>
                  <IonImg src={product.imagen1} alt={product.nombre_producto} />
                  <IonCardHeader>
                    <IonCardTitle>{product.nombre_producto}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p><strong>Precio:</strong> ${product.precio}</p>
                    <p>{product.descripcion}</p>
                    <p><strong>Categoría:</strong> {product.categoria}</p>
                    <p><strong>Región:</strong> {product.region}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
