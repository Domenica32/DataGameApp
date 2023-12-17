import { getDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import appFirebase from '../src/credenciales';

const db = getFirestore(appFirebase);

const obtenerRolUsuario = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().rol;
    } else {
      // Manejo si el documento del usuario no existe
      console.error('El documento del usuario no existe');
      return null;
    }
  } catch (error) {
    // Manejo de errores al obtener el documento del usuario
    console.error('Error al obtener el documento del usuario:', error);
    return null;
  }
};

export default obtenerRolUsuario;
