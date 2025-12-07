import React from 'react';
import { useData } from '../context/DataContext';
import { RequirementStatus } from '../types';
import { PackageCheck, Archive } from 'lucide-react';

const Warehouse: React.FC = () => {
  const { requirements, updateRequirementStatus, updateStock, purchaseOrders } = useData();

  // Incoming: In Purchase status
  const incomingReqs = requirements.filter(r => r.estado === RequirementStatus.IN_PURCHASE);

  const handleReception = (reqId: string, itemId: string, qty: number) => {
    // 1. Mark as Delivered
    updateRequirementStatus(reqId, RequirementStatus.DELIVERED, 'Recepción conforme en Almacén');
    
    // 2. Update Stock
    updateStock(itemId, qty);

    alert(`Bienes recibidos. Stock actualizado (+${qty} unidades). Solicitante notificado.`);
  };

  const getOCNumber = (reqId: string) => {
      const oc = purchaseOrders.find(p => p.requerimientoId === reqId);
      return oc ? oc.numeroOC : 'N/A';
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Almacén Central - Recepción</h2>

      <div className="grid gap-6">
        {incomingReqs.map(req => (
          <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                        Entrante
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-2">{req.itemNombre}</h3>
                    <p className="text-gray-500 text-sm">OC Asociada: <span className="font-mono text-gray-700">{getOCNumber(req.id)}</span></p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Cantidad Esperada</p>
                    <p className="text-2xl font-bold text-gray-800">{req.cantidad} <span className="text-sm font-normal">unid.</span></p>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <p className="text-sm text-gray-600 mb-2 font-semibold">Checklist de Conformidad:</p>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600" /> Cantidad completa
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600" /> Buen estado
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600" /> Guía de remisión
                    </label>
                </div>
            </div>

            <button 
                onClick={() => handleReception(req.id, req.itemId, req.cantidad)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
            >
                <PackageCheck size={20} /> Confirmar Recepción e Ingreso a Stock
            </button>
          </div>
        ))}

        {incomingReqs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
             <Archive size={48} className="mx-auto text-gray-300 mb-4" />
             <h3 className="text-gray-500 font-medium">Sin recepciones pendientes</h3>
             <p className="text-gray-400 text-sm">No hay órdenes de compra en tránsito.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Warehouse;
