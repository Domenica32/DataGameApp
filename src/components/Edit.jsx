import React, { useEffect,useState } from 'react'
import  {useParams}  from 'react-router-dom'
import {  getDoc, doc, updateDoc, getFirestore } from 'firebase/firestore'
import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const db = getFirestore(appFirebase);


const Edit = ({user, backFunction}) => {
    const [rolUsuario, setRolUsuario] = useState('')
   

    const update =async (e)=>{
        e.preventDefault()
        const userId=user.id
        const users = doc(db,"users", userId)
        const data = {rol: rolUsuario}
        await updateDoc(users,data)
    }

    // const getUserId = async (id)=>{
    //     try {
    //         const userDoc = await getDoc(doc(db, "users", id));
    
    //         if (userDoc.exists()) {
    //             const userData = userDoc.data();
    //             console.log(userData);
    //         } else {
    //             console.log("El usuario no existe");
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener el usuario:", error);
    //     }
    // }
    
    useEffect(() => {
        if (user) {
            // Establece el estado inicial basado en la información del usuario
            setRolUsuario(user.rol);
            console.log("Información del usuario:", user);
        }
    }, [user]);


  return (
    <div className='container'>
    <button className='btn btn-secondary mt-2 mb-2' onClick={backFunction}>
        Back
    </button>
    <div className='row'>
        <div className='col '>
        <div className=' title-usuarios'>
                EDITAR ROL USUARIO
            </div>
            <form onSubmit={update} >
            <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div>{user.email}</div>
                    </div>
                <div className="mb-3">
                <label className="form-label">Rol</label>
                <select 
                   value={rolUsuario}
                   onChange={(e) => setRolUsuario(e.target.value)}
                   className="form-control"
                   required
               >
                   <option value="" disabled hidden>Selecciona un rol</option>
                   <option value="profesor">Profesor</option>
                   <option value="admin">Admin</option>
               </select>
                </div>

                <button type='submit' className='btn btn-secondary mt-2 mb-2' > ACTUALIZAR</button>
                
            </form>

        </div>

    </div>
  
</div>

  )
}

export default Edit
