import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FilePlus, 
  CheckSquare, 
  ShoppingCart, 
  Package, 
  Users, 
  LogOut,
  PackageSearch
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  if (!currentUser) return <>{children}</>;

  const isActive = (path: string) => location.pathname === path ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-600';

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <Link to={to} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive(to)}`}>
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-xl font-bold tracking-wide">SIGC - UNI</h1>
          <p className="text-xs text-blue-300 mt-1">Gestión de Compras</p>
        </div>

        <div className="p-6 border-b border-blue-700 bg-blue-900/30">
          <p className="text-sm font-medium">{currentUser.nombre} {currentUser.apellido}</p>
          <p className="text-xs text-blue-300 mt-0.5">{currentUser.rol}</p>
          <p className="text-xs text-blue-300">{currentUser.area}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          
          {(currentUser.rol === Role.REQUESTER || currentUser.rol === Role.ADMIN) && (
             <NavItem to="/requirements" icon={FilePlus} label="Mis Requerimientos" />
          )}
          
          {(currentUser.rol === Role.CHIEF || currentUser.rol === Role.ADMIN) && (
            <NavItem to="/approvals" icon={CheckSquare} label="Aprobaciones" />
          )}

          {(currentUser.rol === Role.LOGISTICS || currentUser.rol === Role.ADMIN) && (
            <NavItem to="/logistics" icon={ShoppingCart} label="Logística y Compras" />
          )}

          {(currentUser.rol === Role.WAREHOUSE || currentUser.rol === Role.ADMIN) && (
            <NavItem to="/warehouse" icon={Package} label="Almacén y Recepción" />
          )}

          {(currentUser.rol === Role.ADMIN || currentUser.rol === Role.LOGISTICS) && (
             <NavItem to="/catalog" icon={PackageSearch} label="Catálogo / Prov." />
          )}
          
          {(currentUser.rol === Role.ADMIN) && (
            <NavItem to="/admin" icon={Users} label="Usuarios" />
          )}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button 
            onClick={logout}
            className="flex items-center space-x-3 p-3 w-full rounded-lg text-blue-100 hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-10">
          <h2 className="text-lg font-semibold text-gray-700">
             {currentUser.area} &mdash; Panel de Control
          </h2>
          <div className="flex items-center space-x-4">
             {/* Notification Bell mock */}
             <div className="relative p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
