// TablaEstudiantes.js
import React, { useEffect } from 'react';

const TablaEstudiantes = ({ nrc }) => {
  useEffect(() => {
    // Aquí puedes realizar acciones basadas en el NRC, como cargar datos de estudiantes, etc.
    console.log(`NRC seleccionado: ${nrc}`);
  }, [nrc]);

  return (
    <div>
      <h2>Tabla de Estudiantes</h2>
      {/* Resto del código del componente */}
    </div>
  );
};

export default TablaEstudiantes;