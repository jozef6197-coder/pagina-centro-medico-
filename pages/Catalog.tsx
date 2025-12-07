import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Trash2 } from 'lucide-react';

const Catalog: React.FC = () => {
  const { catalog, suppliers, deleteCatalogItem } = useData();
  const [activeTab, setActiveTab] = useState<'items' | 'suppliers'>('items');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Gestión de Maestros</h2>
      
      <div className="flex space-x-4 border-b border-gray-200">
        <button 
            className={`pb-2 px-4 font-medium ${activeTab === 'items' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('items')}
        >
            Catálogo de Bienes
        </button>
        <button 
            className={`pb-2 px-4 font-medium ${activeTab === 'suppliers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('suppliers')}
        >
            Proveedores
        </button>
      </div>

      {activeTab === 'items' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                    <tr>
                        <th className="p-4">Imagen</th>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Categoría</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {catalog.map(item => (
                        <tr key={item.id}>
                            <td className="p-4"><img src={item.imagen} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" /></td>
                            <td className="p-4 font-medium">{item.nombre}</td>
                            <td className="p-4 text-sm text-gray-500">{item.categoria}</td>
                            <td className="p-4">
                                <span className={item.stockActual <= item.stockMinimo ? 'text-red-600 font-bold' : 'text-green-600'}>
                                    {item.stockActual} {item.unidad}
                                </span>
                            </td>
                            <td className="p-4">
                                <button onClick={() => deleteCatalogItem(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      )}

      {activeTab === 'suppliers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.map(sup => (
                  <div key={sup.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800">{sup.razonSocial}</h3>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Rating: {sup.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">RUC: {sup.ruc}</p>
                      <p className="text-sm mt-3 text-gray-600"><strong>Contacto:</strong> {sup.contacto}</p>
                      <p className="text-sm text-gray-600"><strong>Servicios:</strong> {sup.servicios}</p>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default Catalog;
