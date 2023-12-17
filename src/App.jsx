import { useEffect, useState } from 'react'
//importando lo modulos de firebase 
import appFirebase from '../src/credenciales'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
const auth = getAuth(appFirebase)


//importar los componentes
import Login from '../src/components/login'
import Home from '../src/components/Home'
import obtenerRolUsuario from '../src/RolUsuario'

import '../src/Styles/App.scss'



function App() {

  const [usuario, setUsuario] = useState(null)
  const [ruta, setRuta] = useState(null)

  useEffect(() =>{
   const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase)=>{

      if (usuarioFirebase){
        setUsuario(usuarioFirebase)
      }
      else{
        setUsuario(null)
      }
    });
    return () => {
    // Desinscribirse del listener al desmontar el componente
    unsubscribe();
    };
  }, []);
  useEffect(() => {
    const determinarRutaRedireccion = async () => {
      if (usuario) {
        const rolUsuario = await obtenerRolUsuario(usuario.uid);
        if (rolUsuario === 'profesor' || rolUsuario === 'admin') {
          setRuta(<Home correoUsuario={usuario.email} />);
        } else {
          setRuta(<Login />);
        }
      } else {
        setRuta(<Login />);
      }
    };
    determinarRutaRedireccion();
  }, [usuario]);

  return (
    <div>
      {ruta}
      {/* <BrowserRouter>
      <Routes>
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit:id" element={<Edit />} />
        


                    
      </Routes>
      </BrowserRouter> */}

    </div>
  ) 
}


export default App