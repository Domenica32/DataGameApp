import React,{useState}  from 'react'
import { collection, getFirestore,addDoc,setDoc, getDoc, doc } from 'firebase/firestore'
import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

//FIREBASE ADMIN 
// import admin from 'firebase-admin';
// import serviceAccount from '../firebase-adminsdk.json';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://gameproject-ac623-default-rtdb.firebaseio.com"
// });



//FIN FIREBASE ADMIN
const db = getFirestore(appFirebase);

const Create = ({backFunction}) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('') 
    const [rolUsuario, setRolUsuario] = useState('')
    const auth = getAuth(appFirebase);
    const crearUsuario = async (e) => {
        e.preventDefault();
        try{
            // const user = await admin.auth().createUser({
            //     email: email,
            //     password: pass,
            //   });

            // await setDoc(doc(db, 'users',user.uid), {
            //  email: email,
            //  rol: rolUsuario,
            //  });
            const userCredential=  await createUserWithEmailAndPassword(auth, email, pass)
            const user = userCredential.user;
            console.log(user);
            await setDoc(doc(db, 'users',user.uid), {
             email: email,
             rol: rolUsuario,
             });
            
            
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

                    <button type='submit' className='btn btn-secondary mt-2 mb-2' > CREAR</button>
                    
                </form>

            </div>

        </div>
      
    </div>

    
  )
  
}

export default Create
