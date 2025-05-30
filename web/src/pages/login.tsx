import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Importe seus componentes
import LoginScreen from './login';
import RegistroOcorrencias from './ocorrencia'; // Seu novo componente

function App() {
    // Use um estado simples para simular o "estar logado"
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Rota para a tela de login */}
                    <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

                    {/* Rota protegida para Registro de Ocorrências */}
                    {isLoggedIn ? (
                        <Route path="/registro-ocorrencias" element={<RegistroOcorrencias />} />
                    ) : (
                        // Redireciona para o login se não estiver logado ao tentar acessar
                        <Route path="/registro-ocorrencias" element={<Navigate to="/" replace />} />
                    )}

                    {/* Você pode adicionar outras rotas aqui (Ex: /dashboard, /perfil) */}
                </Routes>
            </div>
        </Router>
    );
}

// Componente Wrapper para a tela de Login para passar props e usar useNavigate
function LoginPage({ setIsLoggedIn: }) {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Atualiza o estado de login no App
        navigate('/registro-ocorrencias'); // Redireciona para a página de registro
    };

    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}

export default App;