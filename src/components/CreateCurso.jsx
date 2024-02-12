import React,{useState}  from 'react'
import { collection, getFirestore,addDoc,setDoc, getDoc, doc } from 'firebase/firestore'
import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import Usuarios from '../components/Usuarios'


const db = getFirestore(appFirebase);

const CreateCurso = ({backFunction}) => {
    const [curso, setCurso] = useState('')
    const auth = getAuth(appFirebase);
    const crearCurso = async (e) => {
        e.preventDefault();
        try {
          // Agregar el curso a la colección de "cursos" en Firestore
          await addDoc(collection(db, 'cursos'), {
            curso: curso // Suponiendo que el campo en Firestore para el nombre del curso es "nombre"
          });
          alert('Curso creado con éxito');
          setCurso('');
        } catch (error) {
          console.error('Error al crear curso:', error);
          alert('Error al crear curso');
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
                    CREAR CURSO
                </div>
                <form onSubmit={crearCurso}>
                    <div className='mb-3'>
                        <label className='form-label'>Curso</label>
                        <input
                            value={curso}
                            onChange={(e)=> setCurso(e.target.value)}
                            className='form-control'
                        
                        />

                    </div>
                    

                    <button type='submit' className='btn btn-secondary mt-2 mb-2' > CREAR</button>
                    
                </form>

            </div>

        </div>

    </div>
    
    
  )
  
}

export default CreateCurso
