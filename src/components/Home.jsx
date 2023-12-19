import React, { useState, useContext } from 'react';
import appFirebase from '../credenciales'
import {getAuth,signOut} from 'firebase/auth'
import Usuarios from '../components/Usuarios'
import Intro from '../components/Intro'
import SingOut from '../assets/singout.png'
import Create from '../components/Create'
import TablaEstudiantes from '../components/TablaEstudiantes';

const auth = getAuth(appFirebase)
const Home = ({rol})=>{

    const [ActualPage, setActualPage] = useState('intro')
    console.log("este es el user del context ", rol)
    const [selectedNRC, setSelectedNRC] = useState(null);
    const handleCursoClick = (nrc) => {
        // Función para manejar clics en cursos
        setSelectedNRC(nrc);
        setActualPage('tablaEstudiantes');  // Cambia la página a la TablaEstudiantes
      };
    return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-global-color">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <span className="fs-5 d-none d-sm-inline">Magic Madness App</span>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {rol === 'profesor' && (
                          <>
                    {/* <li className="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                        </svg>
                        <button className='btn btn-menu' onClick={()=> setActualPage('intro')}>
                            HOME
                        </button>
                    </li> */}
                    <li className="nav-item">
                        
                        <button className='btn btn-menu' onClick={()=> handleCursoClick('ISO345-PROGRAMACION lll')}>
                            ISO345-PROGRAMACION lll
                        </button>
                    </li>
                    <li className="nav-item">
                        
                        <button className='btn btn-menu' onClick={()=> handleCursoClick('ISO656-PROGRAMACION lll')}>
                            ISO656-PROGRAMACION lll
                        </button>
                    </li>
                    <li className="nav-item">
                        
                        <button className='btn btn-menu' onClick={()=> handleCursoClick('ISO888-PROGRAMACION lll')}>
                            ISO888-PROGRAMACION lll
                        </button>
                    </li>
                    <li className="nav-item">
                        
                        <button className='btn btn-menu' onClick={()=> handleCursoClick('ISO566-PROGRAMACION lll')}>
                            ISO566-PROGRAMACION lll
                        </button>
                    </li>
                    </>
                    )}
                    {rol === 'admin' && (
                        <li className="nav-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                            </svg>
                            <button className='btn btn-menu' onClick={()=> setActualPage('usuarios')}>
                                USUARIOS
                            </button>
                        </li>
                    )}
                </ul>
                <hr/>
                <div className="dropdown pb-4">
                        
                           <img src={SingOut} onClick={()=> signOut(auth)}>
                            </img>
                            
                        
                </div>
            </div>
        </div>

        <div className="col py-3">
            {/* <h3>Bienvenid@ {correoUsuario}</h3> */}
            {
                ActualPage === 'usuarios' ? <Usuarios /> :
                ActualPage === 'intro' ? <Intro />:
                ActualPage === 'tablaEstudiantes' ? <TablaEstudiantes nrc={selectedNRC} />:null
            }
        </div>
        
    </div>
</div>
    );

}

export default Home