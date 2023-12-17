import React from 'react'
import appFirebase from '../credenciales'
import {getAuth,signOut} from 'firebase/auth'
import Mago from '../assets/mago.png'
const auth = getAuth(appFirebase)
const Intro = ()=>{

    return (
        <div className='contenedor'>
            <h2>Magic Madness App Web</h2>
           <p>Aqui podrás encontrar el puntaje de cada nivel de tus estudiantes</p>
           <div className='img-container'> 
           <img className='img-mago' src={Mago}></img>
           </div>
        </div>
    );
}

export default Intro