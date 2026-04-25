//20 productos falsos por ahora.
export const mockProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  nombre: `Producto ${i + 1}`,
  precio: (Math.random() * 500 + 5).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  categoria: `Categoría ${(i % 5) + 1}`,
  imagen: `https://picsum.photos/id/${i + 66}/200/300`
}))

export const mockProductDetail = (id) => ({
  id: parseInt(id),
  nombre: `Producto ${id}`,
  precio: (Math.random() * 500 + 5).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  descripcion: 'Un producto muy interesante que claramente vas a comprar.',
  categoria: `Categoría ${(id % 5) + 1}`
})

export const mockPedidos = [
  { id: 1, fecha: '2025-04-20', total: 150.00, estado: 'entregado', items: [{ producto_id: 1, cantidad: 2, precio: 75.00 }] },
  { id: 2, fecha: '2025-04-18', total: 89.99, estado: 'enviado', items: [{ producto_id: 2, cantidad: 1, precio: 89.99 }] }
]

export const mockUsuario = {
  id: 1,
  nombre: 'Linus Torvalds',
  email: 'Ubuntu@example.com',
  telefono: '+51 941 666 670',
  direccion: {
    calle: 'Av. Javier Prado 67',
    ciudad: 'Lima',
    pais: 'Perú'
  }
}

export const mockHistorial = {
  usuario: { nombre: 'Linus Torvalds', email: 'Ubuntu@example.com' },
  pedidos: [
    { id: 1, fecha: '2025-04-20', total: 150.00, productos: ['Producto 1', 'Producto 2'] },
    { id: 2, fecha: '2025-04-18', total: 89.99, productos: ['Producto 3'] }
  ],
  resumen: { total_gastado: 239.99, nro_pedidos: 2 }
}

export const mockVentasCategoria = [
  { categoria: 'Electrónica', ingresos: 15000, total_items: 45 },
  { categoria: 'Ropa', ingresos: 8900, total_items: 120 },
  { categoria: 'Hogar', ingresos: 5600, total_items: 30 }
]

export const mockTopProductos = [
  { nombre: 'Producto A', unidades_vendidas: 150 },
  { nombre: 'Producto B', unidades_vendidas: 120 },
  { nombre: 'Producto C', unidades_vendidas: 98 }
]