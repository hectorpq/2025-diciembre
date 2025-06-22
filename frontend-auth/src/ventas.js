import React, { useEffect, useState, useCallback } from 'react';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    cliente: '',
    total: ''
  });
  const [ventaId, setVentaId] = useState('');
  const [ventaEncontrada, setVentaEncontrada] = useState(null);

  const token = localStorage.getItem('token');

  // 🟢 Función para obtener todas las ventas
  const fetchVentas = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8085/api/ventas', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setVentas(data);
      } else {
        console.error('❌ Error al obtener ventas');
      }
    } catch (error) {
      console.error('⚠️ Error:', error);
    }
  }, [token]);

  // 🟢 Cargar ventas al iniciar
  useEffect(() => {
    fetchVentas();
  }, [fetchVentas]);

  // 🟢 Registrar nueva venta
  const handleRegistrarVenta = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8085/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nuevaVenta)
      });

      if (response.ok) {
        const data = await response.json();
        alert('✅ Venta registrada con ID: ' + data.id);
        setNuevaVenta({ cliente: '', total: '' });
        fetchVentas(); // Refresca la lista
      } else {
        alert('❌ Error al registrar la venta');
      }
    } catch (error) {
      console.error('⚠️ Error al registrar:', error);
    }
  };

  // 🟢 Buscar venta por ID
  const handleBuscarVenta = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/ventas/${ventaId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setVentaEncontrada(data);
      } else {
        alert('❌ Venta no encontrada');
        setVentaEncontrada(null);
      }
    } catch (error) {
      console.error('⚠️ Error al buscar venta:', error);
    }
  };

  return (
    <div>
      <h2>📦 Ventas Registradas</h2>
      <ul>
        {ventas.map((venta) => (
          <li key={venta.id}>
            ID: {venta.id}, Cliente: {venta.cliente}, Total: {venta.total}
          </li>
        ))}
      </ul>

      <hr />

      <h3>📝 Registrar Nueva Venta</h3>
      <form onSubmit={handleRegistrarVenta}>
        <input
          type="text"
          placeholder="Cliente"
          value={nuevaVenta.cliente}
          onChange={(e) => setNuevaVenta({ ...nuevaVenta, cliente: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Total"
          value={nuevaVenta.total}
          onChange={(e) => setNuevaVenta({ ...nuevaVenta, total: e.target.value })}
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <hr />

      <h3>🔍 Buscar Venta por ID</h3>
      <input
        type="text"
        placeholder="ID de la venta"
        value={ventaId}
        onChange={(e) => setVentaId(e.target.value)}
      />
      <button onClick={handleBuscarVenta}>Buscar</button>

      {ventaEncontrada && (
        <div>
          <h4>Resultado:</h4>
          <p>ID: {ventaEncontrada.id}</p>
          <p>Cliente: {ventaEncontrada.cliente}</p>
          <p>Total: {ventaEncontrada.total}</p>
        </div>
      )}
    </div>
  );
}

export default Ventas;
