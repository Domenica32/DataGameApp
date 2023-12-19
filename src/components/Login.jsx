import React, { useState } from 'react';
import Imagen from '../assets/logoApp.png';
import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { collection, addDoc,setDoc, getDoc, doc} from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";



const auth = getAuth (appFirebase)
const Login = ()=>{

    const [registrando, setRegistrando] = useState (false)
    const db = getFirestore(appFirebase);
    const funcAutenticacion = async (e)=>{
        e.preventDefault();
        const correo = e.target.email.value;
        const pass = e.target.password.value;
        if (registrando){
            try{
               const userCredential=  await createUserWithEmailAndPassword(auth, correo, pass)
               const user = userCredential.user;
               console.log(user);
               await setDoc(doc(db, 'users',user.uid), {
                email: user.email,
                rol: 'profesor',
                });
               
            }catch(error){
                console.error("Error al iniciar sesión: ", error);
                alert(error)
            }
        }else{
            try{


                const userCre= await signInWithEmailAndPassword(auth, correo,pass)
                const user = userCre.user;
                let userDoc;
                try {
                    userDoc = await getDoc(doc(db, 'users', user.uid));
                    console.log("Documento del usuario:", userDoc.exists() ? userDoc.data() : "No existe el documento");
                    // Continúa con la lógica de validación aquí
                } catch (error) {
                    console.error("Error al obtener el documento del usuario:", error);
                    alert("Error al obtener el documento del usuario");
                }

                const userRol = userDoc.data().rol;
                //console.log("este es el rol del usuario:",userRol);

                if (userRol === 'profesor' || userRol === 'admin') {
                    
                    
                }else{
                    alert('No tienes permisos para acceder a esta aplicación')
                    window.location.reload();
                    //await signOut(auth);
                }

            
            }catch(error){
                console.error("Error al iniciar sesión: ", error);
                alert(error)
                await signOut(auth);
            }
        }
    }

    return (
        <div className='container'>
            <div className='col'>
                <div className='row row-style'>
                    <img src={Imagen} alt="logo" className='image-size'/>
                </div>
                <div className='row row-style'>
                    <div className="padre">
                    <div className="card card-body">
                        <form onSubmit={funcAutenticacion}>
                            <h5 className='textform'>Email</h5>
                            <input className='cajaTexto' type="text" placeholder='Ingrese su email' id='email' />
                            <h5 className='textform'>Contraseña</h5>
                            <input className='cajaTexto' type="password" placeholder='Ingrese su contraseña' id='password' />
                            <div className='btn-container'>
                            <button className='btnform'>{registrando ? "Registrate" : "Inicia sesion"}</button>
                            </div>
                        </form>
                        {/* <h4>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}<button onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia sesion" : "Registrate"}</button></h4>   */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login