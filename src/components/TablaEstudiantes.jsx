import React, { useState, useEffect } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import appFirebase from '../credenciales';
import { getFirestore } from 'firebase/firestore';
import Dashboard from '../components/Dashboard .jsx'

const TablaEstudiantes = ({ nrc }) => {
  const [users, setUsers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('level1'); // Estado para el nivel seleccionado
  const [searchTerm, setSearchTerm] = useState('');
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
  const getPuntaje = (user, selectedLevel) => {
    // Obtener el puntaje del nivel seleccionado
    const levelData = user.scores[selectedLevel] || {};
    return {
      primerTiempo: levelData.primerTiempo || 'N/A',
      mejorTiempo: levelData.mejorTiempo || 'N/A',
      score: levelData.score || 'N/A',
    };
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredUsers = users.filter((user) =>
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className='row'>
      <div className='col col-usuarios'>
        
          <select
            className='select-usuarios'
            required
            onChange={handleLevelChange} // Agregar un controlador de eventos para el cambio de nivel
          >
            <option value=''>SELECCIONA UN NIVEL</option>
            <option value='level1'>NIVEL 1</option>
            <option value='level2'>NIVEL 2</option>
            <option value='level3'>NIVEL 3</option>
            <option value='level4'>NIVEL 4</option>
            <option value='level5'>NIVEL 5</option>
          </select>
          <div className='search-container buscador'>
          {/* <label htmlFor='searchInput'>Buscar por email:</label> */}
          <input
            type='text'
            id='searchInput'
            value={searchTerm}
            onChange={handleSearch}
            placeholder='BUSCAR ESTUDIANTE'
            
          />
                    <span className='search-icon'>🔍</span>

        </div>
        <div className='d-grid gap-2'></div>
        <table className='table table-bordered table-estudiantes'>
          <thead>
            <tr>
              <th>ESTUDIANTE</th>
              <th>PUNTUACIÓN</th>
              <th>PRIMER PUNTAJE</th>
              <th>MEJOR PUNTAJE</th>

            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td className='puntaje'>{getPuntaje(user, selectedLevel).score}</td> {/* Mostrar el puntaje del nivel seleccionado */}
                <td className='puntaje'>{getPuntaje(user, selectedLevel).primerTiempo}</td> 
                <td className='puntaje'>{getPuntaje(user, selectedLevel).mejorTiempo}</td> 

              </tr>
            ))}
          </tbody>
        </table>
        <div className='dasboard-content'>
        <Dashboard nrc={nrc} selectedLevel={selectedLevel} />
        </div>
      </div>
    </div>
  );
};

export default TablaEstudiantes;
