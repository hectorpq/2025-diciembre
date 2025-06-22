// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Ventas from './ventas';
import './App.css';

function AuthForm({ setToken }) {
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8085/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: regUsername, password: regPassword })
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`✅ Usuario creado: ${data.username}`);
        setRegUsername('');
        setRegPassword('');
      } else {
        setMensaje('❌ Error al crear usuario');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setMensaje('⚠️ Error en la conexión con el backend');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8085/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setMensaje(`🔐 Bienvenido, ${data.username}`);
        setLoginUsername('');
        setLoginPassword('');
        navigate('/ventas'); // Redirige después de login exitoso
      } else {
        setMensaje('❌ Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setMensaje('⚠️ Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nombre de usuario" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required /><br />
        <input type="password" placeholder="Contraseña" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required /><br />
        <button type="submit">Registrar</button>
      </form>

      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Nombre de usuario" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required /><br />
        <input type="password" placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required /><br />
        <button type="submit">Login</button>
      </form>

      <p>{mensaje}</p>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  useEffect(() => {
    const validarToken = async () => {
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:8085/auth/validate?token=${token}`, { method: 'POST' });
        if (!response.ok) {
          localStorage.removeItem('token');
          setToken('');
        }
      } catch (error) {
        console.error('Error al validar token:', error);
      }
    };

    validarToken();
  }, [token]);

  return (
    <Router>
      <div className="App">
        {token && (
          <div>
            <p>🔓 Sesión activa</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<AuthForm setToken={setToken} />} />
          <Route path="/ventas" element={<Ventas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
