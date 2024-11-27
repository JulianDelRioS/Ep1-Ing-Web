import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonInput, IonSelect, IonSelectOption, IonButton, IonImg } from '@ionic/react';

if (process.env.NODE_ENV === 'development') {
  console.log('Modo desarrollo activado');
}

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

const Publicar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
    setUser(storedUser);
  }, []);

  const handleCategoryChange = (event: CustomEvent) => {
    const category = event.detail.value;
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (event: CustomEvent) => {
    setSelectedSubcategory(event.detail.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + productImages.length <= 3) {
      setProductImages([...productImages, ...files]);
    } else {
      alert('Solo se pueden cargar hasta 3 imágenes.');
    }
  };

  const handleSubmit = async () => {
    if (!productName || !productPrice || !productDescription || !selectedCategory || !selectedSubcategory || productImages.length === 0) {
      alert('Por favor, complete todos los campos y cargue al menos una imagen.');
      return;
    }

    const productData = {
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      images: productImages,
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const result = await response.json();
      alert('Producto publicado exitosamente');
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setProductImages([]);
    } catch (error) {
      console.error('Error al publicar el producto:', error);
      alert('Hubo un error al publicar el producto. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publicar un producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {user ? (
          <IonCard>
            <IonCardContent>
              <h2>Publicación de {user.nombre}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Región:</strong> {user.region}</p>
              <p><strong>Comuna:</strong> {user.comuna}</p>
              <p><strong>Rut:</strong> {user.rut}</p>

              {/* Formulario para publicar un producto */}
              <IonInput
                value={productName}
                placeholder="Nombre del producto"
                onIonChange={(e) => setProductName(e.detail.value!)}
              />
              <IonInput
                type="number"
                value={productPrice}
                placeholder="Precio ($)"
                onIonChange={(e) => setProductPrice(e.detail.value!)}
              />
              <IonInput
                value={productDescription}
                placeholder="Descripción"
                onIonChange={(e) => setProductDescription(e.detail.value!)}
              />
              <IonSelect
                value={selectedCategory}
                placeholder="Selecciona una categoría"
                onIonChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <IonSelectOption key={category.name} value={category.name}>
                    {category.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
              {selectedCategory && (
                <IonSelect
                  value={selectedSubcategory}
                  placeholder="Selecciona una subcategoría"
                  onIonChange={handleSubcategoryChange}
                >
                  {categories.find(cat => cat.name === selectedCategory)?.subcategories.map((subcategory) => (
                    <IonSelectOption key={subcategory} value={subcategory}>
                      {subcategory}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div>
                {productImages.map((image, index) => (
                  <IonImg key={index} src={URL.createObjectURL(image)} style={{ width: '100px', height: '100px', margin: '5px' }} />
                ))}
              </div>
              <IonButton expand="full" onClick={handleSubmit}>Publicar producto</IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          <p>Cargando publicar...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Publicar;
