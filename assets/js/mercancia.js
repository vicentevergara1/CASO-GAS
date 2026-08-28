export const productosGas = [
  { codigo: 'CL001', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 5 kg', desc: 'Uso residencial (cocina, calefacción).', unidad: 'Unidad', precioRes: 6500, precioCom: 6000, stock: 80 },
  { codigo: 'CL002', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 11 kg', desc: 'Estándar doméstico. El más utilizado.', unidad: 'Unidad', precioRes: 12000, precioCom: 11000, stock: 200 },
  { codigo: 'CL003', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 15 kg', desc: 'Mayor capacidad, alto consumo.', unidad: 'Unidad', precioRes: 16000, precioCom: 14500, stock: 90 },
  { codigo: 'CL004', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 45 kg', desc: 'Cilindro industrial (restaurantes).', unidad: 'Unidad', precioRes: 45000, precioCom: 40000, stock: 30 },
  { codigo: 'RG001', categoria: 'Reguladores', nombre: 'Regulador doméstico estándar', desc: 'Para cilindros 5, 11 y 15 kg.', unidad: 'Unidad', precioRes: 8990, precioCom: 8200, stock: 45 },
  { codigo: 'RG002', categoria: 'Reguladores', nombre: 'Regulador de alta presión', desc: 'Para cocinas industriales.', unidad: 'Unidad', precioRes: 18990, precioCom: 17000, stock: 12 },
  { codigo: 'MG001', categoria: 'Mangueras', nombre: 'Manguera gas 1.5 m', desc: 'Manguera flexible homologada.', unidad: 'Unidad', precioRes: 3990, precioCom: 3500, stock: 80 },
  { codigo: 'MG004', categoria: 'Mangueras', nombre: 'Kit conexión completo', desc: 'Regulador + manguera 1.5m + abrazaderas.', unidad: 'Kit', precioRes: 12990, precioCom: 11500, stock: 25 },
  { codigo: 'AC001', categoria: 'Accesorios', nombre: 'Carro porta cilindro', desc: 'Carro metálico con ruedas.', unidad: 'Unidad', precioRes: 12990, precioCom: 11000, stock: 20 },
  { codigo: 'AC003', categoria: 'Accesorios', nombre: 'Detector de gas a batería', desc: 'Alarma sonora ante fuga.', unidad: 'Unidad', precioRes: 19990, precioCom: 17000, stock: 8 }
];
export const zonasDespacho = [
  { zona: 'Zona Centro', comunas: 'Chillán (centro, norte, sur)', dias: 'Lunes a Sábado', horario: '08:00 – 20:00', tiempo: '1 – 3 horas' },
  { zona: 'Zona Oriente', comunas: 'Chillán (oriente), Chillán Viejo', dias: 'Lunes a Viernes', horario: '08:00 – 18:00', tiempo: '2 – 4 horas' },
  { zona: 'Zona Rural', comunas: 'El Carmen, Pinto, San Ignacio', dias: 'Martes y Jueves', horario: '08:00 – 16:00', tiempo: '3 – 6 horas' },
  { zona: 'Zona Sur', comunas: 'Bulnes, Quillón', dias: 'Miércoles', horario: '08:00 – 16:00', tiempo: '4 – 6 horas' },
  { zona: 'Zona Comercial', comunas: 'Parques industriales', dias: 'Lunes a Viernes', horario: '07:00 – 17:00', tiempo: 'Según agenda' }
];