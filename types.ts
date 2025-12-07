export enum Role {
  REQUESTER = 'Solicitante',
  CHIEF = 'Jefe de Área',
  LOGISTICS = 'Logística',
  WAREHOUSE = 'Almacén',
  ADMIN = 'Administrador',
}

export enum RequirementStatus {
  REGISTERED = 'Registrado',
  IN_REVIEW = 'En revisión',
  APPROVED = 'Aprobado',
  REJECTED = 'Rechazado',
  IN_PURCHASE = 'En compra',
  IN_WAREHOUSE = 'En almacén',
  DELIVERED = 'Entregado',
}

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  rol: Role;
  area: string;
  activo: boolean;
}

export interface CatalogItem {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  unidad: string;
  precioRef: number;
  stockActual: number;
  stockMinimo: number;
  imagen: string;
}

export interface Supplier {
  id: string;
  razonSocial: string;
  ruc: string;
  contacto: string;
  servicios: string;
  rating: number;
}

export interface Requirement {
  id: string;
  codigo: string;
  usuarioId: string; // Relacionado con User
  usuarioNombre: string;
  fechaRegistro: string;
  itemId: string; // Relacionado con CatalogItem
  itemNombre: string;
  cantidad: number;
  motivo: string;
  estado: RequirementStatus;
  observaciones?: string;
  historial: { fecha: string; estado: RequirementStatus; nota?: string }[];
}

export interface PurchaseOrder {
  id: string;
  numeroOC: string;
  requerimientoId: string;
  proveedorId: string;
  montoTotal: number;
  fechaEmision: string;
  estado: 'Pendiente' | 'Enviada' | 'Completada';
}
