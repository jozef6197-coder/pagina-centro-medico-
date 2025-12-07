import React from 'react';
import { useData } from '../context/DataContext';

const Admin: React.FC = () => {
  const { users } = useData();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Rol</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Área</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id}>
                <td className="p-4 font-medium text-gray-900">{u.nombre} {u.apellido}</td>
                <td className="p-4 text-gray-600">{u.email}</td>
                <td className="p-4 text-gray-600"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{u.rol}</span></td>
                <td className="p-4 text-gray-600">{u.area}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${u.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
