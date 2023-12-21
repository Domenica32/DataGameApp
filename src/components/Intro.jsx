import React from 'react'
import appFirebase from '../credenciales'
import {getAuth,signOut} from 'firebase/auth'
import Mago from '../assets/mago.png'
const auth = getAuth(appFirebase)
const Intro = ()=>{

    return (
        <div className='contenedor'>
            <h2>Data Chronicles</h2>
            <h3>Odisea Mágica de los Tiempos</h3>
           <h5>Aqui podrás encontrar el puntaje de tus estudiantes</h5>
           <div className='img-container'> 
           <img className='img-mago' src={Mago}></img>
           </div>
        </div>
    );
}

export default Intro