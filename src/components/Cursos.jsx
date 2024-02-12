import React, { useState, useEffect } from 'react';
import { getDocs, collection, getDoc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../credenciales';
import { getFirestore,doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CreateCurso from '../components/CreateCurso';
import EditCurso from '../components/EditCurso';

const MySwal = withReactContent(Swal);

const Cursos = () => {
  // Hooks
  const [ActualPage, setActualPage] = useState('listaCurso');
  const [selectedCursoId, setSelectedCursoId] = useState(null);
  const [cursos, setCursos] = useState([]);
  const db = getFirestore(appFirebase);
  const getCursos = async () => {
    try {
      const cursosCollection = collection(db, 'cursos');
      const cursosSnapshot = await getDocs(cursosCollection);
      const cursosData = cursosSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          curso: doc.data().curso
        };
      });
      setCursos(cursosData);
      console.log('Cursos:', cursosData);
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    }
  };

  const handleDelete = async (cursoId) => {
    try {
      await deleteDoc(doc(db, 'cursos', cursoId));
      console.log('Curso eliminado con éxito');
      // Actualizar la lista de cursos después de eliminar
      getCursos();
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
      alert('Error al eliminar el curso');
    }
  };

  // Función para volver a la lista de cursos
  function showList() {
    setActualPage('listaCurso');
    setSelectedCursoId(null);
  }

  // Cargar los cursos cuando el componente se monta
  useEffect(() => {
    getCursos();
  }, []);

  return (
    <>
      {ActualPage === 'crear' ? ( <CreateCurso backFunction={showList} />) :
       ActualPage === 'editar' ? (<EditCurso curso={cursos.find((curso) => curso.id === selectedCursoId)} backFunction={showList}/>) :
       ActualPage === 'listaCurso' ? (
        <div className="container">
          <div className="row">
            <div className="col col-usuarios">
              <div className="title-usuarios">CURSOS</div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-secondary mt-2 mb-2 agregar"
                  onClick={() => setActualPage('crear')}
                >
                  AGREGAR
                </button>
              </div>
              <table className="table table-bordered table-estudiantes table-hover">
                <thead>
                  <tr>
                    <th>Nombre del Curso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {cursos.map((curso) => (
                    <tr key={curso.id}>
                      <td>{curso.curso}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setActualPage('editar');
                            setSelectedCursoId(curso.id);
                            console.log('Curso seleccionado para editar:', curso.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                            />
                          </svg>
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                handleDelete(curso.id);
                                console.log('Curso seleccionado para borrar:', curso.id);

                            }}
                            >
                            Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Cursos;
