import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { User, ShieldCheck, Truck, Package, Activity } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();

  const roles = [
    { role: Role.REQUESTER, label: 'Solicitante (Médico)', icon: User, color: 'bg-[#7B0000]' },
    { role: Role.CHIEF, label: 'Jefe de Área', icon: ShieldCheck, color: 'bg-gray-700' },
    { role: Role.LOGISTICS, label: 'Logística', icon: Truck, color: 'bg-orange-600' },
    { role: Role.WAREHOUSE, label: 'Almacén', icon: Package, color: 'bg-teal-600' },
    { role: Role.ADMIN, label: 'Admin Sistema', icon: Activity, color: 'bg-slate-800' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden min-h-[600px]">
        
        {/* Left Side: Brand & Image (UNI Guinda Theme) */}
        <div className="w-1/2 relative hidden md:flex flex-col justify-center p-12 text-white">
          
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1587351021759-3e566b9af953?q=80&w=2568&auto=format&fit=crop')`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          {/* Red/Guinda Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7B0000]/90 to-[#3a0000]/95 z-10"></div>

          {/* Content */}
          <div className="relative z-20">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">SIGC - UNI</h1>
            <p className="text-red-100 text-xl mb-8 font-light leading-relaxed">
              Sistema Integrado de Gestión de Compras del Centro Médico UNI.
            </p>
            <div className="space-y-5 text-sm font-medium text-white">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 p-1.5 rounded-full"><ShieldCheck size={16} /></span>
                <span>Gestión de Requerimientos</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 p-1.5 rounded-full"><Activity size={16} /></span>
                <span>Flujos de Aprobación</span>
              </div>
              <div className="flex items-center gap-3">
                 <span className="bg-white/20 p-1.5 rounded-full"><Truck size={16} /></span>
                <span>Control Logístico</span>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-red-800/50">
                <p className="text-xs text-red-200 opacity-70">Universidad Nacional de Ingeniería &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Role Select */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white">
          <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h2>
              <p className="text-gray-500">Seleccione su perfil para acceder al sistema.</p>
          </div>

          <div className="space-y-4">
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => login(r.role)}
                className="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-[#7B0000] hover:shadow-lg transition-all group bg-white hover:bg-red-50/30"
              >
                <div className={`p-3 rounded-full ${r.color} text-white mr-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <r.icon size={20} />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-gray-700 group-hover:text-[#7B0000] transition-colors">{r.label}</span>
                  <span className="text-xs text-gray-400">Acceder como {r.role}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-auto pt-8 text-center">
             <p className="text-xs text-gray-400">
               Acceso seguro al panel administrativo
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;