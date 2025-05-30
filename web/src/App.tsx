import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Importe seus componentes
import LoginScreen from './pages/login';
import RegistroOcorrencias from './pages/ocorrencia';
import AcompanhamentoOcorrencia from './pages/acompanhamento';
import ListaOcorrencias from './pages/listagem'; // Importe o novo componente

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota para a tela de login */}
          <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          {/* Rotas Protegidas (requerem login) */}
          {isLoggedIn ? (
            <>
              <Route path="/registro-ocorrencias" element={<RegistroOcorrencias />} />
              <Route path="/ocorrencias/:id" element={<AcompanhamentoOcorrencia />} />
              <Route path="/ocorrencias" element={<ListaOcorrencias />} /> {/* NOVA ROTA */}
              {/* Você pode definir uma rota padrão após o login, por exemplo: */}
              {/* <Route path="/dashboard" element={<ListaOcorrencias />} /> */}
            </>
          ) : (
            // Se não estiver logado, redireciona qualquer tentativa de acesso para a página inicial
            <>
              <Route path="/registro-ocorrencias" element={<Navigate to="/" replace />} />
              <Route path="/ocorrencias/:id" element={<Navigate to="/" replace />} />
              <Route path="/ocorrencias" element={<Navigate to="/" replace />} /> {/* Redireciona a lista também */}
            </>
          )}

          {/* Rota de fallback para qualquer outra URL não mapeada */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </Router>
  );
}

// Componente Wrapper para a tela de Login para passar props e usar useNavigate
function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Após o login, redirecionar para a página de lista de ocorrências
    navigate('/ocorrencias'); // Redireciona para a nova página de lista
  };

  return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}

export default App;