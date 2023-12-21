import React, { useState, useEffect } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import appFirebase from '../credenciales';
import { getFirestore } from 'firebase/firestore';

const TablaEstudiantes = ({ nrc }) => {
  const [users, setUsers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('level1'); // Estado para el nivel seleccionado
  const db = getFirestore(appFirebase);
  const usersCollection = collection(db, 'users');

  const getUsers = async () => {
    const q = query(usersCollection, where('NRC', '==', nrc));
    const data = await getDocs(q);

    setUsers(
      data.docs
        .filter((doc) => doc.data().rol === 'estudiante')
        .map((doc) => {
          const userData = doc.data();
          return {
            ...userData,
            email: userData.email,
            id: doc.id,
            scores: userData.scores || {} // Manejar el caso en que 'scores' no exista en el documento
          };
        })
    );
  };

  useEffect(() => {
    getUsers();
    console.log(`NRC seleccionado: ${nrc}`);
  }, [nrc]);

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  return (
    <div className='row'>
      <div className='col col-usuarios'>
        <div className=' title-usuarios'>
          <select
            className='form-control'
            required
            onChange={handleLevelChange} // Agregar un controlador de eventos para el cambio de nivel
          >
            <option value='level1'>NIVEL 1</option>
            <option value='level2'>NIVEL 2</option>
            <option value='level3'>NIVEL 3</option>
            <option value='level4'>NIVEL 4</option>
            <option value='level5'>NIVEL 5</option>
          </select>
        </div>
        <div className='d-grid gap-2'></div>
        <table className='table table-dark table-hover'>
          <thead>
            <tr>
              <th>ESTUDIANTE</th>
              <th>Rol</th>
              <th>PUNTAJE</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.rol}</td>
                <td>{user.scores[selectedLevel]}</td> {/* Mostrar el puntaje del nivel seleccionado */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaEstudiantes;
