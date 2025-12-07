import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { RequirementStatus, Supplier } from '../types';
import { FileText, Send, DollarSign } from 'lucide-react';

const Logistics: React.FC = () => {
  const { requirements, suppliers, createPurchaseOrder } = useData();
  const [selectedReq, setSelectedReq] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [quoteAmount, setQuoteAmount] = useState<number>(0);

  // Needs Purchasing: Approved items not yet in purchase
  const approvedReqs = requirements.filter(r => r.estado === RequirementStatus.APPROVED);

  const handleCreateOC = () => {
    if (!selectedReq || !selectedSupplier || quoteAmount <= 0) return;
    
    createPurchaseOrder(selectedReq, selectedSupplier, quoteAmount);
    
    alert('Orden de Compra generada y enviada al proveedor exitosamente.');
    setSelectedReq(null);
    setSelectedSupplier('');
    setQuoteAmount(0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Módulo de Logística y Compras</h2>

      {/* List of Approved Requirements ready for purchasing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-blue-600"/> Requerimientos Aprobados
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Ítem</th>
                <th className="p-3">Cant.</th>
                <th className="p-3">Solicitante</th>
                <th className="p-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {approvedReqs.map(req => (
                <tr key={req.id} className={selectedReq === req.id ? 'bg-blue-50' : ''}>
                  <td className="p-3 font-medium">{req.codigo}</td>
                  <td className="p-3">{req.itemNombre}</td>
                  <td className="p-3">{req.cantidad}</td>
                  <td className="p-3">{req.usuarioNombre}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => setSelectedReq(req.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 bg-white px-3 py-1 rounded shadow-sm hover:shadow"
                    >
                      Gestionar Compra
                    </button>
                  </td>
                </tr>
              ))}
              {approvedReqs.length === 0 && (
                  <tr><td colSpan={5} className="p-4 text-center text-gray-400">No hay requerimientos pendientes de compra.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote/PO Panel (Visible only when a req is selected) */}
      {selectedReq && (
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 animate-fade-in">
           <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">
               Generar Orden de Compra: <span className="text-blue-600">{requirements.find(r => r.id === selectedReq)?.codigo}</span>
           </h3>

           <div className="grid md:grid-cols-2 gap-8">
               <div>
                   <h4 className="font-semibold text-gray-700 mb-2">1. Seleccionar Proveedor</h4>
                   <div className="space-y-2 max-h-48 overflow-y-auto">
                       {suppliers.map(sup => (
                           <div 
                            key={sup.id} 
                            onClick={() => setSelectedSupplier(sup.id)}
                            className={`p-3 border rounded-lg cursor-pointer transition-all flex justify-between items-center ${selectedSupplier === sup.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'hover:bg-gray-50 border-gray-200'}`}
                           >
                               <div>
                                   <p className="font-bold text-sm text-gray-800">{sup.razonSocial}</p>
                                   <p className="text-xs text-gray-500">RUC: {sup.ruc}</p>
                               </div>
                               <div className="flex items-center gap-1">
                                   <span className="text-yellow-500 text-sm">★</span>
                                   <span className="text-sm font-medium">{sup.rating}</span>
                               </div>
                           </div>
                       ))}
                   </div>
               </div>

               <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">2. Detalle de Cotización</h4>
                        <label className="block text-sm text-gray-500 mb-1">Monto Total Cotizado (S/.)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-400">$</span>
                            <input 
                                type="number"
                                value={quoteAmount}
                                onChange={e => setQuoteAmount(parseFloat(e.target.value))}
                                className="w-full pl-8 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                        <p>ℹ️ Al generar la OC, el sistema enviará automáticamente un correo al proveedor seleccionado con el PDF adjunto.</p>
                    </div>

                    <button 
                        onClick={handleCreateOC}
                        disabled={!selectedSupplier || quoteAmount <= 0}
                        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold shadow-md flex justify-center items-center gap-2"
                    >
                        <Send size={18} /> Generar Orden de Compra
                    </button>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Logistics;
