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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);  // Guardar la categoría seleccionada
  const [popoverState, setPopoverState] = useState<{ show: boolean; event: Event | undefined }>({
    show: false,
    event: undefined,
  });
  const [searchText, setSearchText] = useState<string>("");  // Para la barra de búsqueda
  const [products, setProducts] = useState<any[]>([]);  // Lista de productos
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);  // Productos filtrados por categoría
  const [usuario, setUsuario] = useState<{ nombre: string; email: string; rut: string; fechanacimiento: string; region: string; comuna: string } | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Lista de categorías para el menú
  const [categories, setCategories] = useState<string[]>([]); // Lista dinámica de categorías

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
        // Cargar productos desde la base de datos (API)
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

        // Normalizar y combinar los productos de ambas fuentes
        const allProducts = [...dataFromAPI, ...dataFromJson].map((product: any) => ({
          ...product,
          // Asegurarse de que los productos tengan las mismas propiedades
          categoria: product.categoria || "",  // Asegurarse de que cada producto tenga la propiedad 'categoria'
          precio: product.precio || 0,
          nombre_producto: product.nombre_producto || "",
          descripcion: product.descripcion || "",
          imagen1: product.imagen1 || "",
          region: product.region || "",
        }));

        setProducts(allProducts);
        setFilteredProducts(allProducts); // Inicialmente, mostrar todos los productos

        // Extraer las categorías únicas de los productos
        const uniqueCategories = [
          ...new Set(allProducts.map((product: any) => product.categoria))
        ];
        setCategories(uniqueCategories); // Establecer las categorías para mostrar en el menú

      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos por categoría seleccionada
  useEffect(() => {
    if (selectedCategory === null || selectedCategory === "") {
      setFilteredProducts(products);  // Si no hay categoría seleccionada, mostrar todos los productos
    } else {
      const filtered = products.filter(product => product.categoria === selectedCategory);
      setFilteredProducts(filtered);  // Mostrar solo los productos de la categoría seleccionada
    }
  }, [selectedCategory, products]); // Actualizar los productos filtrados cuando cambian los productos o la categoría seleccionada

  const handleCategoryClick = (event: any, categoryName: string) => {
    setSelectedCategory(categoryName); // Establecer la categoría seleccionada
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
              <div key={category}>
                <IonItem button onClick={(e) => handleCategoryClick(e, category)}>
                  <IonLabel>{category}</IonLabel>
                </IonItem>
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
            {filteredProducts.map((product) => (
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