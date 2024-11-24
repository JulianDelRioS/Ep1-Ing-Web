import React, { useState } from "react";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonItem, IonLabel, IonButton, IonSelect, IonSelectOption } from "@ionic/react";
import './publicar.css';
// Lista completa de regiones y comunas de Chile
const regionsWithCommunes: { [key: string]: string[] } = {
  "Arica y Parinacota": [
    "Arica", "Camarones", "Putre", "General Lagos"
  ],
  "Tarapacá": [
    "Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Camiña", "Colchane"
  ],
  "Antofagasta": [
    "Antofagasta", "Calama", "Mejillones", "Taltal", "San Pedro de Atacama", "Sierra Gorda", "Loa"
  ],
  "Atacama": [
    "Copiapó", "Caldera", "Tierra Amarilla", "Vallenar", "Freirina", "Huasco"
  ],
  "Coquimbo": [
    "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Los Vilos", "Salamanca", "Canela", "Combarbalá", "Monte Patria", "Ovalle", "Punitaqui"
  ],
  "Valparaíso": [
    "Valparaíso", "Viña del Mar", "Quillota", "San Antonio", "Villa Alemana", "Los Andes", "La Calera", "La Ligua", "San Felipe", "Algarrobo", "Concón", "Puchuncaví", "Casablanca", "Juan Fernández"
  ],
  "Región Metropolitana de Santiago": [
    "Santiago", "Maipú", "Las Condes", "Providencia", "La Florida", "Vitacura", "Peñalolén", "Ñuñoa", "San Bernardo", "Puente Alto", "La Pintana", "Renca", "Cerrillos", "Cerro Navia", "Estación Central", "Macul", "San Joaquín", "El Bosque", "La Cisterna", "Recoleta", "Lo Espejo", "Pedro Aguirre Cerda", "Lo Prado", "Independencia"
  ],
  "O'Higgins": [
    "Rancagua", "Graneros", "Machalí", "Pichilemu", "San Fernando", "Chimbarongo", "San Vicente de Tagua Tagua", "Pumanque", "Nancagua", "Placilla", "Coltauco", "Doñihue", "Requínoa", "Codegua", "Mostazal", "Peumo", "Chimbarongo"
  ],
  "Maule": [
    "Talca", "Curicó", "Linares", "San Javier", "Cauquenes", "Constitución", "Molina", "Rauco", "Sagrada Familia", "San Clemente", "Villa Alegre", "Pencahue", "Hualañé", "Pelarco", "San Rafael", "Cauquenes", "Empedrado", "Chanco"
  ],
  "Ñuble": [
    "Chillán", "Los Ángeles", "San Carlos", "Quirihue", "Yungay", "Cobquecura", "Ninhue", "El Carmen", "Pinto", "San Fabián", "Pemuco", "Ñiquén", "Ránquil"
  ],
  "Biobío": [
    "Concepción", "Los Ángeles", "Talcahuano", "Chiguayante", "San Pedro de la Paz", "Hualpén", "Penco", "Hualqui", "Tomé", "Arauco", "Curanilahue", "Lota", "Chillán", "San Carlos", "Yungay"
  ],
  "La Araucanía": [
    "Temuco", "Villarrica", "Pucón", "Freire", "Cunco", "Carahue", "Cholchol", "Pitrufquén", "Nueva Imperial", "Imperial", "Gorbea", "Loncoche", "Vilcún", "Melipeuco", "Curacautín", "Ercilla", "Angol", "Collipulli"
  ],
  "Los Ríos": [
    "Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Lanco", "Los Lagos", "Futrono", "Mariquina", "Paillaco", "Corral"
  ],
  "Los Lagos": [
    "Osorno", "Puerto Montt", "Puerto Varas", "Frutillar", "Castro", "Ancud", "Calbuco", "Maullín", "Puyehue", "San Juan de la Costa", "Puerto Octay", "Osorno"
  ],
  "Aysén del General Carlos Ibáñez del Campo": [
    "Coyhaique", "Chile Chico", "Cisnes", "Aisén", "Mañihuales", "Puerto Aysén", "Puerto Cisnes", "El Blanco"
  ],
  "Magallanes y la Antártica Chilena": [
    "Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos", "Antártica"
  ]
};

const PublicarProductoPage: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [region, setRegion] = useState<string>("");
  const [comuna, setComuna] = useState<string>("");
  const [foto, setFoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion || !precio || !region || !comuna || !foto) {
      alert("Por favor completa todos los campos.");
      return;
    }

    console.log("Producto publicado:", { nombre, descripcion, precio, region, comuna, foto });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFoto(file);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publicar Producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Nombre del Producto</IonLabel>
            <IonInput
              value={nombre}
              onIonChange={(e) => setNombre(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonInput
              value={descripcion}
              onIonChange={(e) => setDescripcion(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Precio</IonLabel>
            <IonInput
              type="number"
              value={precio}
              onIonChange={(e) => setPrecio(Number(e.detail.value!))}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Región</IonLabel>
            <IonSelect value={region} onIonChange={(e) => setRegion(e.detail.value!)} placeholder="Selecciona una región">
              {Object.keys(regionsWithCommunes).map((regionName) => (
                <IonSelectOption key={regionName} value={regionName}>
                  {regionName}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Comuna</IonLabel>
            <IonSelect value={comuna} onIonChange={(e) => setComuna(e.detail.value!)} placeholder="Selecciona una comuna">
              {region &&
                regionsWithCommunes[region]?.map((comunaName) => (
                  <IonSelectOption key={comunaName} value={comunaName}>
                    {comunaName}
                  </IonSelectOption>
                ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Foto del Producto</IonLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </IonItem>

          <IonButton expand="full" type="submit">
            Publicar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default PublicarProductoPage;
