import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { RequirementStatus } from '../types';
import { Search, Plus } from 'lucide-react';

const Requirements: React.FC = () => {
  const { catalog, requirements, addRequirement } = useData();
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');

  const myRequirements = requirements.filter(r => r.usuarioId === currentUser?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = catalog.find(c => c.id === selectedItem);
    if (!item || !currentUser) return;

    addRequirement({
      usuarioId: currentUser.id,
      usuarioNombre: `${currentUser.nombre} ${currentUser.apellido}`,
      itemId: item.id,
      itemNombre: item.nombre,
      cantidad: quantity,
      motivo: reason,
      observaciones: ''
    });

    setIsModalOpen(false);
    setSelectedItem('');
    setQuantity(1);
    setReason('');
  };

  const getStatusColor = (status: RequirementStatus) => {
    switch (status) {
      case RequirementStatus.APPROVED: return 'bg-green-100 text-green-800';
      case RequirementStatus.REJECTED: return 'bg-red-100 text-red-800';
      case RequirementStatus.DELIVERED: return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mis Requerimientos</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
        >
          <Plus size={20} />
          Nuevo Requerimiento
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Código</th>
              <th className="p-4 font-semibold text-gray-600">Ítem</th>
              <th className="p-4 font-semibold text-gray-600">Cantidad</th>
              <th className="p-4 font-semibold text-gray-600">Fecha</th>
              <th className="p-4 font-semibold text-gray-600">Estado</th>
              <th className="p-4 font-semibold text-gray-600">Observaciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {myRequirements.map(req => (
              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{req.codigo}</td>
                <td className="p-4">{req.itemNombre}</td>
                <td className="p-4">{req.cantidad}</td>
                <td className="p-4 text-gray-500">{req.fechaRegistro}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.estado)}`}>
                    {req.estado}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500 italic">
                  {req.observaciones || '-'}
                </td>
              </tr>
            ))}
            {myRequirements.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  No has registrado requerimientos aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Nuevo Requerimiento</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar en Catálogo</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedItem}
                  onChange={e => setSelectedItem(e.target.value)}
                  required
                >
                  <option value="">Selecciona un ítem...</option>
                  {catalog.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.nombre} (Stock: {item.stockActual})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Ej: Reposición mensual para área de emergencia..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
                >
                  Registrar Solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requirements;
