import React,{useState}  from 'react'
import { collection, getFirestore,addDoc,setDoc, getDoc, doc } from 'firebase/firestore'
import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import Usuarios from '../components/Usuarios'


const db = getFirestore(appFirebase);

const Create = ({backFunction}) => {
    // const [ActualPage, setActualPage] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('') 
    const [rolUsuario, setRolUsuario] = useState('')
    const auth = getAuth(appFirebase);
    const crearUsuario = async (e) => {
        e.preventDefault();
        try{
            
            const userCredential=  await createUserWithEmailAndPassword(auth, email, pass)
            const user = userCredential.user;
            console.log(user);
            await setDoc(doc(db, 'users',user.uid), {
             email: email,
             rol: rolUsuario,
             });
             alert("Usuario creado con éxito")
            
         }catch(error){
             console.error("Error al crear usuario: ", error);
             alert(error)
         }
    };
    



  return (
    
    <div className='container'>
        <button className='btn btn-secondary mt-2 mb-2' onClick={backFunction}>
            Back
        </button>
        <div className='row'>
            <div className='col '>
            <div className=' title-usuarios'>
                    CREAR USUARIO
                </div>
                <form onSubmit={crearUsuario}>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            type="email"
                            className='form-control'
                        
                        />

                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Contraseña</label>
                        <input
                            value={pass}
                            onChange={(e)=> setPass(e.target.value)}
                            type="password"
                            className='form-control'
                        
                        />

                    </div>

                    <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                        value={rolUsuario}
                        onChange={(e) => setRolUsuario(e.target.value)}
                        className="form-control"
                        required >
                        <option value="" disabled hidden>Selecciona un rol</option>
                        <option value="profesor">Profesor</option>
                        <option value="admin">Admin</option>
                    </select>
                    </div>

                    <button type='submit' className='btn btn-secondary mt-2 mb-2'onClick={()=> signOut(auth)} > CREAR</button>
                    
                </form>

            </div>

        </div>
        {/* {
                ActualPage === 'usuarios' ? <Usuarios /> :null
        } */}
    </div>
    
    
  )
  
}

export default Create
