import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {  getDocs, getDoc,deleteDoc, collection } from 'firebase/firestore'
import appFirebase from '../credenciales'
import { getFirestore } from "firebase/firestore";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Create from '../components/Create';
import Edit from "../components/Edit"
const MySwal = withReactContent(Swal)


const Usuarios = () => {
    //Hooks
    const [ActualPage, setActualPage] = useState('lista')
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [users, setUsers]= useState([])
    const db = getFirestore(appFirebase);
    //Referencia a la Firestore
    const usersCollection = collection(db,"users")
    //Funcion para mostrar todos los docs 
    const getUsers = async()=> {
    const data = await getDocs(usersCollection)
        //console.log("informacions de la coleccion",data.docs)
    setUsers(
        data.docs
        .filter((doc) => doc.data().rol === 'profesor' || doc.data().rol === 'admin')
        .map((doc) => {
          const userData = doc.data()
            return {
                ...userData,
                email: userData.email,
                id: doc.id
            }
        })
        )
        console.log("informacion",users)
    };

    function showList (){
        setActualPage('lista')
        setSelectedUserId(null); 
    }
    
    useEffect(() => {
        getUsers(); // Llamada a getUsers cuando el componente se monta
      }, []);
  return (
    <>
        
    
    {
        ActualPage === 'crear' ? <Create backFunction={showList} /> :
        ActualPage === 'editar' ? <Edit user={users.find(user => user.id === selectedUserId)} backFunction={showList} />:
        ActualPage === 'lista' ? <div className='container'>
        <div className='row'>
          <div className='col col-usuarios'>
          <div className=' title-usuarios'>
                    USUARIOS
                </div>
              <div className="d-grid gap-2">
                
                  <button  className='btn btn-secondary mt-2 mb-2 agregar' onClick={()=> setActualPage('crear')}> AGREGAR </button>
              </div>
              <table className='table table-dark table-hover'>
                  <thead>
                      <tr>
                          <th>Email</th>
                          <th>Rol</th>
                          <th >Acciones</th>
                      </tr>
                  </thead>
  
  
                  <tbody>
                      { users.map((user) => (
                          <tr key={(user.id)}>
                              <td>{user.email}</td>
                              <td>{user.rol}</td>
                              <td>
                                <button className='btn btn-secondary 'onClick={()=>{ setActualPage('editar');  setSelectedUserId(user.id);
                                            console.log('Usuario seleccionado para editar:', user.id);
                                        }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                              
                                </button>
                                   {/* <Link to={`/edit/${user.id}` } className='btn btn-light'>Editar</Link>  */}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
      </div> : null

    }
    </>
  )
}

export default Usuarios
