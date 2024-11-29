import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';       // Asegúrate de que la ruta de tu archivo Home.tsx sea correcta
import Registro from './pages/resgistro';  // Asegúrate de que la ruta de tu archivo Registro.tsx sea correcta
import login from './pages/login';
import principal from './pages/principal';
import publicar from './pages/publicar';
import ProfilePage from './pages/ProfilePage';
import paneladmin from './pages/paneladmin';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Ruta para la página de inicio */}
        <Route exact path="/home" component={Home} />
        
        {/* Ruta para la página de registro */}
        <Route exact path="/registro" component={Registro} />

        <Route exact path="/login" component={login} />

        <Route exact path="/principal" component={principal} />

        <Route exact path="/publicar" component={publicar} />

        <Route exact path="/ProfilePage" component={ProfilePage} />

        <Route exact path="/paneladmin" component={paneladmin} />

        {/* Redirección para la ruta raíz */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
