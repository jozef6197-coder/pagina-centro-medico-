import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, CatalogItem, Supplier, Requirement, PurchaseOrder, RequirementStatus, Role } from '../types';
import { INITIAL_USERS, INITIAL_CATALOG, INITIAL_SUPPLIERS, INITIAL_REQUIREMENTS } from '../services/mockData';

interface DataContextType {
  users: User[];
  catalog: CatalogItem[];
  suppliers: Supplier[];
  requirements: Requirement[];
  purchaseOrders: PurchaseOrder[];
  addRequirement: (req: Omit<Requirement, 'id' | 'codigo' | 'historial' | 'estado' | 'fechaRegistro'>) => void;
  updateRequirementStatus: (id: string, status: RequirementStatus, note?: string) => void;
  createPurchaseOrder: (reqId: string, supplierId: string, amount: number) => void;
  updateStock: (itemId: string, qty: number) => void;
  addCatalogItem: (item: CatalogItem) => void;
  deleteCatalogItem: (id: string) => void;
  refreshData: () => void; // Dummy function to trigger re-renders if needed
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(INITIAL_USERS);
  const [catalog, setCatalog] = useState<CatalogItem[]>(INITIAL_CATALOG);
  const [suppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [requirements, setRequirements] = useState<Requirement[]>(INITIAL_REQUIREMENTS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  const addRequirement = (reqData: Omit<Requirement, 'id' | 'codigo' | 'historial' | 'estado' | 'fechaRegistro'>) => {
    const newId = `r${requirements.length + 1}`;
    const newCode = `REQ-00${requirements.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    
    const newReq: Requirement = {
      ...reqData,
      id: newId,
      codigo: newCode,
      fechaRegistro: today,
      estado: RequirementStatus.REGISTERED,
      historial: [{ fecha: today, estado: RequirementStatus.REGISTERED }]
    };

    setRequirements([...requirements, newReq]);
    
    // Automation: Send to Review automatically
    setTimeout(() => {
        updateRequirementStatus(newId, RequirementStatus.IN_REVIEW, 'Automático: Enviado a Jefe de Área');
    }, 1000);
  };

  const updateRequirementStatus = (id: string, status: RequirementStatus, note?: string) => {
    setRequirements(prev => prev.map(req => {
      if (req.id === id) {
        const today = new Date().toISOString().split('T')[0];
        return {
          ...req,
          estado: status,
          observaciones: note ? note : req.observaciones,
          historial: [...req.historial, { fecha: today, estado: status, nota: note }]
        };
      }
      return req;
    }));
  };

  const createPurchaseOrder = (reqId: string, supplierId: string, amount: number) => {
    const newId = `oc${purchaseOrders.length + 1}`;
    const newOC = `OC-2023-${purchaseOrders.length + 1}`;
    const today = new Date().toISOString().split('T')[0];

    const newOrder: PurchaseOrder = {
      id: newId,
      numeroOC: newOC,
      requerimientoId: reqId,
      proveedorId: supplierId,
      montoTotal: amount,
      fechaEmision: today,
      estado: 'Enviada' // Simulated email sent
    };

    setPurchaseOrders([...purchaseOrders, newOrder]);
    updateRequirementStatus(reqId, RequirementStatus.IN_PURCHASE, `OC Generada: ${newOC}`);
  };

  const updateStock = (itemId: string, qty: number) => {
    setCatalog(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, stockActual: item.stockActual + qty };
      }
      return item;
    }));
  };

  const addCatalogItem = (item: CatalogItem) => {
    setCatalog([...catalog, item]);
  }

  const deleteCatalogItem = (id: string) => {
    setCatalog(catalog.filter(c => c.id !== id));
  }

  const refreshData = () => {};

  return (
    <DataContext.Provider value={{
      users, catalog, suppliers, requirements, purchaseOrders,
      addRequirement, updateRequirementStatus, createPurchaseOrder, updateStock,
      addCatalogItem, deleteCatalogItem, refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
