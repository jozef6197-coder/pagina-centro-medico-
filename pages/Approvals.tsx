import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { RequirementStatus } from '../types';
import { Check, X, CornerUpLeft } from 'lucide-react';

const Approvals: React.FC = () => {
  const { requirements, updateRequirementStatus } = useData();
  const [observation, setObservation] = useState('');
  const [activeReqId, setActiveReqId] = useState<string | null>(null);

  // Filter for requirements needing review (In Review status)
  const pendingReqs = requirements.filter(r => r.estado === RequirementStatus.IN_REVIEW);

  const handleAction = (reqId: string, status: RequirementStatus) => {
    updateRequirementStatus(reqId, status, observation);
    setObservation('');
    setActiveReqId(null);
    alert(`Requerimiento ${status === RequirementStatus.APPROVED ? 'Aprobado' : 'Rechazado'}. Notificación enviada.`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Bandeja de Aprobaciones</h2>
      <p className="text-gray-500">Gestione los requerimientos pendientes de su área.</p>

      <div className="grid gap-6">
        {pendingReqs.map(req => (
          <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md">{req.codigo}</span>
                <span className="text-sm text-gray-500">{req.fechaRegistro}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">{req.itemNombre}</h3>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold">Cantidad:</span> {req.cantidad}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Solicitante:</span> {req.usuarioNombre}
              </p>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 italic border border-gray-200">
                "{req.motivo}"
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-3 justify-center border-l border-gray-100 pl-6">
              <textarea
                placeholder="Añadir observación (opcional)..."
                className="w-full text-sm border border-gray-300 rounded-lg p-2 outline-none focus:ring-1 focus:ring-blue-500"
                rows={2}
                value={activeReqId === req.id ? observation : ''}
                onChange={e => {
                    setActiveReqId(req.id);
                    setObservation(e.target.value);
                }}
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction(req.id, RequirementStatus.APPROVED)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                >
                  <Check size={16} /> Aprobar
                </button>
                <button 
                  onClick={() => handleAction(req.id, RequirementStatus.REJECTED)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                >
                  <X size={16} /> Rechazar
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendingReqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <Check size={48} className="mx-auto text-green-200 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">Todo al día</h3>
            <p className="text-gray-400">No hay requerimientos pendientes de revisión.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;
