import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import perfil from '../assets/perfil.png'
import appFirebase from '../credenciales'

const configuraciones = () => {
    const [userEmail, setUserEmail] = useState('');
    const auth = getAuth(appFirebase);

    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
              setUserEmail(usuarioFirebase.email)
            }})
            })

            const handleSolicitarCambioContraseña = () => {
                // Enviar un correo electrónico para restablecer la contraseña
                sendPasswordResetEmail(auth, userEmail)
                  .then(() => {
                    alert('Se ha enviado un correo electrónico para restablecer la contraseña.');
                  })
                  .catch((error) => {
                    console.error('Error al enviar el correo electrónico para restablecer la contraseña:', error.message);
                  });
              };
  return (
    <div className='row'>
      <div className='col col-usuarios'>
        
      <div className=' title-usuarios'>
                    PERFIL
            </div>
            <img src={perfil}></img>
          <div className='search-container buscador'>
          

        </div>
        <div className='d-grid gap-2'></div>
        <table className='table table-bordered table-estudiantes'>
          <thead>
            <tr>
              <th>EMAIL</th>
              <th>PASSWORD</th>
            </tr>
          </thead>

          <tbody>
           
                <td>{userEmail}</td>
                <td className='password-perfil'>*********</td>   
          </tbody>
        </table>
        <button className='changepass' onClick={handleSolicitarCambioContraseña}>Solicitar Cambio de Contraseña</button>
      </div>
    </div>
        
  )
}

export default configuraciones
