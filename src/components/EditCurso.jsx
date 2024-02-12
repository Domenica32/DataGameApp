import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc, getFirestore } from 'firebase/firestore';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

const EditCurso = ({ curso, backFunction }) => {
  const [nombreCurso, setNombreCurso] = useState('');

  // Función para actualizar el curso
  const updateCurso = async (e) => {
    e.preventDefault();
    try {
      const cursoRef = doc(db, 'cursos', curso.id);
      await updateDoc(cursoRef, { curso: nombreCurso });
      alert('Curso actualizado con éxito');
      backFunction();
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
      alert('Error al actualizar el curso');
    }
  };

  // Establecer el estado inicial del nombre del curso cuando se monta el componente
  useEffect(() => {
    if (curso) {
      setNombreCurso(curso.curso);
      console.log("Información del curso:", curso);
    }
  }, [curso]);

  return (
    <div className='container'>
      <button className='btn btn-secondary mt-2 mb-2' onClick={backFunction}>
        Back
      </button>
      <div className='row'>
        <div className='col '>
          <div className=' title-usuarios'>
            EDITAR CURSO
          </div>
          <form onSubmit={updateCurso}>
            <div className="mb-3">
              <label className="form-label">Nombre del Curso</label>
              <input
                value={nombreCurso}
                onChange={(e) => setNombreCurso(e.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <button type='submit' className='btn btn-secondary mt-2 mb-2' > ACTUALIZAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCurso;
