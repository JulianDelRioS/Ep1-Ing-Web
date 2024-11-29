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

const Paneladmin: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const [usuario, setUsuario] = useState<{
    nombre: string;
    email: string;
    rut: string;
    fechanacimiento: string;
    region: string;
    comuna: string;
  } | null>(null);

  const history = useHistory();

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

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/products");
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Inicializar productos filtrados
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filtrar productos en base a la categoría y subcategoría seleccionadas
    let updatedProducts = products;

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.categoria === selectedCategory
      );
    }
    if (selectedSubcategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.subcategoria === selectedSubcategory
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, selectedSubcategory, products]);

  const handleLogout = () => {
    localStorage.clear();
    setUsuario(null);
    history.push("/login");
  };

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
            <IonButton onClick={handleLogout} color="danger">
              Cerrar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content">
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonSelect
                placeholder="Seleccione una categoría"
                onIonChange={(e) => setSelectedCategory(e.detail.value)}
              >
                {categories.map((category) => (
                  <IonSelectOption key={category.name} value={category.name}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
            <IonCol size="6">
              <IonSelect
                placeholder="Seleccione una subcategoría"
                onIonChange={(e) => setSelectedSubcategory(e.detail.value)}
                disabled={!selectedCategory}
              >
                {categories
                  .find((category) => category.name === selectedCategory)
                  ?.subcategories.map((subcategory) => (
                    <IonSelectOption key={subcategory} value={subcategory}>
                      {subcategory}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonCol>
          </IonRow>
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
                    <p><strong>Subcategoría:</strong> {product.subcategoria}</p>
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
