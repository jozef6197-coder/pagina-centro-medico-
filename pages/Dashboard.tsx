import React from 'react';
import { useData } from '../context/DataContext';
import { RequirementStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { requirements, catalog, suppliers } = useData();

  // KPIs
  const totalReq = requirements.length;
  const approvedReq = requirements.filter(r => r.estado === RequirementStatus.APPROVED || r.estado === RequirementStatus.IN_PURCHASE || r.estado === RequirementStatus.DELIVERED).length;
  const rejectedReq = requirements.filter(r => r.estado === RequirementStatus.REJECTED).length;
  const deliveredReq = requirements.filter(r => r.estado === RequirementStatus.DELIVERED).length;
  
  const approvalRate = totalReq > 0 ? ((approvedReq / totalReq) * 100).toFixed(1) : 0;
  const rejectionRate = totalReq > 0 ? ((rejectedReq / totalReq) * 100).toFixed(1) : 0;
  
  const criticalStockItems = catalog.filter(c => c.stockActual <= c.stockMinimo).length;

  // Chart Data
  const statusData = [
    { name: 'Aprobados', value: approvedReq },
    { name: 'Rechazados', value: rejectedReq },
    { name: 'En Proceso', value: totalReq - approvedReq - rejectedReq },
  ];

  const supplierData = suppliers.map(s => ({
    name: s.razonSocial.split(' ')[0], // Shorten name
    rating: s.rating,
  }));

  const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

  const CardKPI = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className={`p-4 rounded-full ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={28} />
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{sub}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Panel de Control (Dashboard)</h2>
      
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardKPI 
          title="Tasa de Aprobación" 
          value={`${approvalRate}%`} 
          sub="Sobre total de requerimientos" 
          icon={CheckCircle} 
          color="bg-green-500" 
        />
        <CardKPI 
          title="Tasa de Rechazo" 
          value={`${rejectionRate}%`} 
          sub="Requerimientos observados" 
          icon={XCircle} 
          color="bg-red-500" 
        />
        <CardKPI 
          title="Stock Crítico" 
          value={criticalStockItems} 
          sub="Items por debajo del mínimo" 
          icon={AlertTriangle} 
          color="bg-orange-500" 
        />
        <CardKPI 
          title="Tiempo Promedio" 
          value="3.2 Días" 
          sub="Ciclo de compra estimado" 
          icon={Clock} 
          color="bg-blue-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Estado de Requerimientos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Supplier Rating Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Rating de Proveedores</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="rating" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
