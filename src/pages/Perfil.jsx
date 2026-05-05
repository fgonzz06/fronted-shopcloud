import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUsuario, updateUsuarioDireccion } from '../services/api';

function Perfil() {
  const { id } = useParams();
  const { user } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [direccion, setDireccion] = useState({ calle: '', ciudad: '', pais: 'Perú' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadUsuario = async () => {
      setLoading(true);
      const data = await getUsuario(id);
      setUsuario(data);
      if (data?.direccion) {
        setDireccion(data.direccion);
      }
      setLoading(false);
    };
    loadUsuario();
  }, [id]);

  const handleUpdateDireccion = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const result = await updateUsuarioDireccion(id, direccion);
    if (result) {
      alert('Dirección actualizada correctamente');
      setUsuario({ ...usuario, direccion });
    } else {
      alert('Error al actualizar dirección');
    }
    setUpdating(false);
  };

  if (loading) return <div className="text-center py-10">Cargando perfil...</div>;
  if (!usuario) return <div className="text-center py-10">Usuario no encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
        <div className="space-y-3">
          <p><span className="font-medium">Nombre:</span> {usuario.nombre} {usuario.apellido}</p>
          <p><span className="font-medium">Email:</span> {usuario.email}</p>
          <p><span className="font-medium">Teléfono:</span> {usuario.telefono || 'No registrado'}</p>
          <p><span className="font-medium">Rol:</span> {usuario.rol || 'user'}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
        <form onSubmit={handleUpdateDireccion}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Calle</label>
            <input
              type="text"
              value={direccion.calle || ''}
              onChange={(e) => setDireccion({ ...direccion, calle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Ciudad</label>
            <input
              type="text"
              value={direccion.ciudad || ''}
              onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">País</label>
            <input
              type="text"
              value={direccion.pais || 'Perú'}
              onChange={(e) => setDireccion({ ...direccion, pais: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={updating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-blue-400"
          >
            {updating ? 'Actualizando...' : 'Actualizar Dirección'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Perfil;