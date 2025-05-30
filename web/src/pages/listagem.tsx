import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Para criar links para a página de detalhes

function ListaOcorrencias() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Estados para os filtros
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterLatitude, setFilterLatitude] = useState('');
    const [filterLongitude, setFilterLongitude] = useState('');
    const [filterRadius, setFilterRadius] = useState(''); // Raio em metros, por exemplo

    // --- Mock data para simulação ---
    const mockAllOcorrencias = [
        {
            _id: '6657954e19574d6b63304e76',
            userId: 'user123',
            title: 'Buraco Grande na Rua das Flores',
            description: 'Existe um buraco muito grande e perigoso na Rua das Flores, 123, perto da praça. Cuidado ao passar de carro!',
            picturePath: '',
            latitude: -23.5045,
            longitude: -47.4987,
            type: 'Buraco',
            status: 'em andamento',
            createdAt: '2025-05-28T10:00:00Z',
            updatedAt: '2025-05-29T15:30:00Z',
            adminNotes: 'Equipe de tapa-buracos notificada e em rota.'
        },
        {
            _id: '6657954e19574d6b63304e77',
            userId: 'user124',
            title: 'Lâmpada Queimada na Praça Central',
            description: 'A lâmpada do poste em frente ao coreto na Praça Central está queimada, deixando a área muito escura à noite.',
            picturePath: '',
            latitude: -23.4999,
            longitude: -47.5010,
            type: 'Iluminação Precária',
            status: 'resolvido',
            createdAt: '2025-05-20T08:00:00Z',
            updatedAt: '2025-05-25T11:45:00Z',
            adminNotes: 'Lâmpada substituída. Iluminação restaurada.'
        },
        {
            _id: '6657954e19574d6b63304e78',
            userId: 'user125',
            title: 'Calçada Irregular na Av. Brasil',
            description: 'Trecho da calçada em frente ao número 500 está muito irregular, causando tropeços.',
            picturePath: '',
            latitude: -23.5010,
            longitude: -47.5050,
            type: 'Calçada Danificada',
            status: 'aberto',
            createdAt: '2025-05-27T14:10:00Z',
            updatedAt: '2025-05-27T14:10:00Z',
        },
        {
            _id: '6657954e19574d6b63304e79',
            userId: 'user126',
            title: 'Placa de Sinalização Caída',
            description: 'A placa de "Pare" na esquina da Rua C com Rua D está caída no chão.',
            picturePath: '',
            latitude: -23.4970,
            longitude: -47.5030,
            type: 'Sinalização Deficiente',
            status: 'aberto',
            createdAt: '2025-05-29T09:20:00Z',
            updatedAt: '2025-05-29T09:20:00Z',
        },
        {
            _id: '6657954e19574d6b63304e7a',
            userId: 'user127',
            title: 'Ponto de Ônibus sem Iluminação',
            description: 'O poste do ponto de ônibus na Rua Principal, próximo ao mercado, está sem luz.',
            picturePath: '',
            latitude: -23.5020,
            longitude: -47.5000,
            type: 'Iluminação Precária',
            status: 'em andamento',
            createdAt: '2025-05-26T18:00:00Z',
            updatedAt: '2025-05-27T10:00:00Z',
            adminNotes: 'Serviço programado para a próxima semana.'
        },
    ];
    // --- Fim do Mock data ---


    const fetchOcorrencias = async () => {
        setLoading(true);
        setError('');
        try {
            // Construa a URL da API com os parâmetros de filtro
            const queryParams = new URLSearchParams();
            if (filterType) queryParams.append('type', filterType);
            if (filterStatus) queryParams.append('status', filterStatus);
            if (filterLatitude && filterLongitude && filterRadius) {
                queryParams.append('latitude', filterLatitude);
                queryParams.append('longitude', filterLongitude);
                queryParams.append('radius', filterRadius);
            }

            // Em um aplicativo real, você faria:
            // const response = await fetch(`/api/posts?${queryParams.toString()}`, {
            //   headers: {
            //     'Authorization': `Bearer ${seuTokenDeAutenticacaoAqui}`
            //   }
            // });
            // if (!response.ok) {
            //   throw new Error('Erro ao carregar ocorrências.');
            // }
            // const data = await response.json();
            // setOcorrencias(data);

            // --- Lógica de filtragem manual para o Mock data ---
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da API

            let filtered = mockAllOcorrencias;

            if (filterType) {
                filtered = filtered.filter(occ => occ.type === filterType);
            }
            if (filterStatus) {
                filtered = filtered.filter(occ => occ.status === filterStatus);
            }
            // Simulação de filtro por localização (muito simplificado, apenas para demonstração)
            // Em uma API real, o backend faria a busca geográfica.
            if (filterLatitude && filterLongitude && filterRadius) {
                // Isso seria mais complexo com cálculos de distância reais (haversine)
                // Aqui, apenas um filtro de exemplo baseado em proximidade "manual"
                const targetLat = parseFloat(filterLatitude);
                const targetLon = parseFloat(filterLongitude);
                const radiusKm = parseFloat(filterRadius) / 1000; // Converte metros para km para nossa simulação simples

                filtered = filtered.filter(occ => {
                    const distanceLat = Math.abs(occ.latitude - targetLat);
                    const distanceLon = Math.abs(occ.longitude - targetLon);
                    // Uma simulação muito rudimentar de proximidade.
                    // Distâncias em graus não são lineares em km.
                    // Para uma solução real, use bibliotecas geoespaciais.
                    return distanceLat < 0.005 * radiusKm && distanceLon < 0.005 * radiusKm;
                });
            }

            setOcorrencias(filtered);

        } catch (err) {
            console.error("Erro ao buscar ocorrências:", err);
            setError(err.message || 'Erro ao carregar a lista de ocorrências.');
        } finally {
            setLoading(false);
        }
    };

    // Executa a busca de ocorrências quando o componente é montado
    // ou quando os filtros mudam
    useEffect(() => {
        fetchOcorrencias();
    }, [filterType, filterStatus, filterLatitude, filterLongitude, filterRadius]); // Dependências dos filtros

    const handleClearFilters = () => {
        setFilterType('');
        setFilterStatus('');
        setFilterLatitude('');
        setFilterLongitude('');
        setFilterRadius('');
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'aberto':
                return 'danger';
            case 'em andamento':
                return 'warning';
            case 'resolvido':
                return 'success';
            default:
                return 'secondary';
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Ocorrências na Vila Hortência</h2>

            {/* Seção de Filtros */}
            <Card className="shadow-sm mb-4 p-3">
                <Card.Title className="mb-3">Filtros</Card.Title>
                <Form>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="filterType">
                                <Form.Label>Tipo de Problema</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    <option>Buraco</option>
                                    <option>Calçada Danificada</option>
                                    <option>Iluminação Precária</option>
                                    <option>Sinalização Deficiente</option>
                                    <option>Outro</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="filterStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    <option>aberto</option>
                                    <option>em andamento</option>
                                    <option>resolvido</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="filterRadius">
                                <Form.Label>Raio de Busca (metros)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ex: 1000"
                                    value={filterRadius}
                                    onChange={(e) => setFilterRadius(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="filterLatitude">
                                <Form.Label>Latitude (para busca)</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    placeholder="Ex: -23.5000"
                                    value={filterLatitude}
                                    onChange={(e) => setFilterLatitude(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="filterLongitude">
                                <Form.Label>Longitude (para busca)</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    placeholder="Ex: -47.5000"
                                    value={filterLongitude}
                                    onChange={(e) => setFilterLongitude(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleClearFilters} className="me-2">
                                Limpar Filtros
                            </Button>
                            {/* O fetchOcorrencias já é disparado pelo useEffect, mas um botão 'Aplicar' poderia ser útil para controle manual */}
                            {/* <Button variant="primary" onClick={fetchOcorrencias}>
                Aplicar Filtros
              </Button> */}
                        </Col>
                    </Row>
                </Form>
            </Card>

            {/* Seção de Resultados */}
            {loading && (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Carregando ocorrências...</span>
                    </Spinner>
                </div>
            )}

            {error && <Alert variant="danger" className="text-center mt-4">{error}</Alert>}

            {!loading && !error && ocorrencias.length === 0 && (
                <Alert variant="info" className="text-center mt-4">
                    Nenhuma ocorrência encontrada com os filtros aplicados.
                </Alert>
            )}

            {!loading && !error && ocorrencias.length > 0 && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {ocorrencias.map((ocorrencia) => (
                        <Col key={ocorrencia._id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">{ocorrencia.title}</h6>
                                    <Badge bg={getStatusVariant(ocorrencia.status)}>
                                        {ocorrencia.status.toUpperCase()}
                                    </Badge>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Tipo:</strong> {ocorrencia.type}
                                    </Card.Text>
                                    <Card.Text className="text-truncate">
                                        <strong>Descrição:</strong> {ocorrencia.description}
                                    </Card.Text>
                                    <Card.Text className="text-muted small">
                                        Reportado em: {new Date(ocorrencia.createdAt).toLocaleDateString()}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Link to={`/ocorrencias/${ocorrencia._id}`} className="btn btn-outline-primary btn-sm w-75">
                                        Ver Detalhes
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default ListaOcorrencias;