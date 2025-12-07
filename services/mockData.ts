import { Role, User, CatalogItem, Supplier, Requirement, RequirementStatus } from '../types';

export const INITIAL_USERS: User[] = [
  { id: 'u1', nombre: 'Juan', apellido: 'Perez', dni: '12345678', email: 'juan@uni.edu.pe', rol: Role.REQUESTER, area: 'Cardiología', activo: true },
  { id: 'u2', nombre: 'Maria', apellido: 'Gomez', dni: '87654321', email: 'maria@uni.edu.pe', rol: Role.CHIEF, area: 'Cardiología', activo: true },
  { id: 'u3', nombre: 'Carlos', apellido: 'Logis', dni: '11223344', email: 'carlos@uni.edu.pe', rol: Role.LOGISTICS, area: 'Logística', activo: true },
  { id: 'u4', nombre: 'Ana', apellido: 'Almacen', dni: '44332211', email: 'ana@uni.edu.pe', rol: Role.WAREHOUSE, area: 'Almacén Central', activo: true },
  { id: 'u5', nombre: 'Pedro', apellido: 'Admin', dni: '99887766', email: 'admin@uni.edu.pe', rol: Role.ADMIN, area: 'Sistemas', activo: true },
];

export const INITIAL_CATALOG: CatalogItem[] = [
  { id: 'c1', nombre: 'Paracetamol 500mg', categoria: 'Medicamentos', descripcion: 'Caja x 100 tabletas', unidad: 'Caja', precioRef: 15.50, stockActual: 120, stockMinimo: 50, imagen: 'https://picsum.photos/200/200?random=1' },
  { id: 'c2', nombre: 'Guantes de Nitrilo M', categoria: 'EPP', descripcion: 'Caja x 50 pares', unidad: 'Caja', precioRef: 45.00, stockActual: 20, stockMinimo: 30, imagen: 'https://picsum.photos/200/200?random=2' },
  { id: 'c3', nombre: 'Jeringas 5ml', categoria: 'Insumos', descripcion: 'Paquete x 100 unidades', unidad: 'Paquete', precioRef: 25.00, stockActual: 200, stockMinimo: 100, imagen: 'https://picsum.photos/200/200?random=3' },
  { id: 'c4', nombre: 'Papel Bond A4', categoria: 'Oficina', descripcion: 'Millar 80gr', unidad: 'Millar', precioRef: 32.00, stockActual: 5, stockMinimo: 10, imagen: 'https://picsum.photos/200/200?random=4' },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 's1', razonSocial: 'Distribuidora Médica S.A.', ruc: '20100000001', contacto: 'Luis Venta', servicios: 'Medicamentos, Insumos', rating: 4.5 },
  { id: 's2', razonSocial: 'Office Provider SAC', ruc: '20200000002', contacto: 'Carla Venta', servicios: 'Útiles de oficina', rating: 3.8 },
  { id: 's3', razonSocial: 'TecnoSalud Peru', ruc: '20300000003', contacto: 'Jorge Tech', servicios: 'Equipos médicos', rating: 5.0 },
];

export const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: 'r1',
    codigo: 'REQ-001',
    usuarioId: 'u1',
    usuarioNombre: 'Juan Perez',
    fechaRegistro: '2023-10-01',
    itemId: 'c2',
    itemNombre: 'Guantes de Nitrilo M',
    cantidad: 10,
    motivo: 'Reposición mensual',
    estado: RequirementStatus.APPROVED,
    historial: [
      { fecha: '2023-10-01', estado: RequirementStatus.REGISTERED },
      { fecha: '2023-10-02', estado: RequirementStatus.IN_REVIEW },
      { fecha: '2023-10-02', estado: RequirementStatus.APPROVED, nota: 'Ok, procede.' }
    ]
  },
  {
    id: 'r2',
    codigo: 'REQ-002',
    usuarioId: 'u1',
    usuarioNombre: 'Juan Perez',
    fechaRegistro: '2023-10-05',
    itemId: 'c1',
    itemNombre: 'Paracetamol 500mg',
    cantidad: 50,
    motivo: 'Campaña de salud',
    estado: RequirementStatus.IN_REVIEW,
    historial: [
      { fecha: '2023-10-05', estado: RequirementStatus.REGISTERED },
      { fecha: '2023-10-05', estado: RequirementStatus.IN_REVIEW }
    ]
  }
];
