import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

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

const Paneladmin: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<{ nombre: string; email: string; rut: string; fechanacimiento: string; region: string; comuna: string } | null>(null);

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

        // Combinar los productos de ambas fuentes y almacenarlos en un solo estado
        setAllProducts([...dataFromAPI, ...dataFromJson]);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos por categoría y subcategoría seleccionada
  useEffect(() => {
    const matchesCategory = (product: any) => !selectedCategory || product.categoria === selectedCategory;
    const matchesSubcategory = (product: any) => !selectedSubcategory || product.subcategoria === selectedSubcategory;

    setFilteredProducts(allProducts.filter(product => matchesCategory(product) && matchesSubcategory(product)));
  }, [selectedCategory, selectedSubcategory, allProducts]);

  const handleProfileClick = () => {
    history.push("/ProfilePage");
  };

  const handleLogout = () => {
    localStorage.clear(); // Elimina todos los datos almacenados en localStorage.
    setUsuario(null); // Limpia el estado del usuario.
    history.push("/login"); // Redirige a la página de inicio de sesión.
  };

  const subcategories = selectedCategory
    ? categories.find(category => category.name === selectedCategory)?.subcategories || []
    : [];

  return (
    <IonPage>
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
              Panel de Administrador
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleProfileClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                alt="Perfil"
                style={{ width: "30px" }}
              />
              {usuario && <span style={{ marginLeft: "10px" }}>{usuario.email}</span>}
            </IonButton>
            <IonButton color="danger" onClick={handleLogout}>
              Cerrar sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content">
        {/* Selector de categoría */}
        <IonSelect
          placeholder="Selecciona una categoría"
          value={selectedCategory}
          onIonChange={e => {
            setSelectedCategory(e.detail.value);
            setSelectedSubcategory(null); // Resetear subcategoría al cambiar de categoría
          }}
        >
          {categories.map((category) => (
            <IonSelectOption key={category.name} value={category.name}>
              {category.name}
            </IonSelectOption>
          ))}
        </IonSelect>

        {/* Selector de subcategoría */}
        {selectedCategory && subcategories.length > 0 && (
          <IonSelect
            placeholder="Selecciona una subcategoría"
            value={selectedSubcategory}
            onIonChange={e => setSelectedSubcategory(e.detail.value)}
          >
            {subcategories.map((subcat) => (
              <IonSelectOption key={subcat} value={subcat}>
                {subcat}
              </IonSelectOption>
            ))}
          </IonSelect>
        )}

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

export default Paneladmin;
