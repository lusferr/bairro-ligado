import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Badge, ListGroup, Image } from 'react-bootstrap';

function AcompanhamentoOcorrencia() {
    const { id } = useParams(); // Pega o ID da URL
    const [ocorrencia, setOcorrencia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOcorrencia = async () => {
            setLoading(true);
            setError('');
            try {
                // Simulação de chamada de API para buscar a ocorrência pelo ID
                // Em um aplicativo real, você faria:
                // const response = await fetch(`/api/posts/${id}`, {
                //   headers: {
                //     'Authorization': `Bearer ${seuTokenDeAutenticacaoAqui}`
                //   }
                // });
                // if (!response.ok) {
                //   throw new Error('Ocorrência não encontrada ou erro do servidor.');
                // }
                // const data = await response.json();
                // setOcorrencia(data);

                // --- Dados simulados para demonstração ---
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da API

                const mockOcorrencias = {
                    '6657954e19574d6b63304e76': { // Exemplo de ID para teste
                        _id: '6657954e19574d6b63304e76',
                        userId: 'user123',
                        title: 'Buraco Grande na Rua das Flores',
                        description: 'Existe um buraco muito grande e perigoso na Rua das Flores, 123, perto da praça. Cuidado ao passar de carro!',
                        picturePath: '/assets/buraco_rua_flores.jpg', // Caminho para a imagem
                        latitude: -23.5045,
                        longitude: -47.4987,
                        type: 'Buraco',
                        status: 'em andamento', // aberto, em andamento, resolvido
                        createdAt: '2025-05-28T10:00:00Z',
                        updatedAt: '2025-05-29T15:30:00Z',
                        adminNotes: 'Equipe de tapa-buracos notificada e em rota.'
                    },
                    '6657954e19574d6b63304e77': {
                        _id: '6657954e19574d6b63304e77',
                        userId: 'user124',
                        title: 'Lâmpada Queimada na Praça Central',
                        description: 'A lâmpada do poste em frente ao coreto na Praça Central está queimada, deixando a área muito escura à noite.',
                        picturePath: '', // Sem imagem para este exemplo
                        latitude: -23.4999,
                        longitude: -47.5010,
                        type: 'Iluminação Precária',
                        status: 'resolvido',
                        createdAt: '2025-05-20T08:00:00Z',
                        updatedAt: '2025-05-25T11:45:00Z',
                        adminNotes: 'Lâmpada substituída. Iluminação restaurada.'
                    }
                    // Adicione mais ocorrências simuladas aqui se precisar
                };

                const foundOcorrencia = mockOcorrencias[id];

                if (foundOcorrencia) {
                    setOcorrencia(foundOcorrencia);
                } else {
                    setError('Ocorrência não encontrada.');
                }

            } catch (err) {
                console.error("Erro ao buscar ocorrência:", err);
                setError(err.message || 'Erro ao carregar os detalhes da ocorrência.');
            } finally {
                setLoading(false);
            }
        };

        fetchOcorrencia();
    }, [id]); // Re-executa o efeito sempre que o ID da URL mudar

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

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!ocorrencia) {
        return (
            <Container className="my-5">
                <Alert variant="info" className="text-center">
                    Nenhuma ocorrência encontrada para este ID.
                </Alert>
            </Container>
        );
  );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5>Detalhes da Ocorrência #{ocorrencia._id}</h5>
                            <Badge bg={getStatusVariant(ocorrencia.status)} className="p-2">
                                Status: {ocorrencia.status.toUpperCase()}
                            </Badge>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Card.Title className="mb-3">{ocorrencia.title}</Card.Title>
                            <Card.Text>
                                <strong>Tipo de Problema:</strong> {ocorrencia.type}
                            </Card.Text>
                            <Card.Text>
                                <strong>Descrição:</strong> {ocorrencia.description}
                            </Card.Text>

                            {ocorrencia.picturePath && (
                                <div className="mb-3">
                                    <strong>Foto:</strong>
                                    <Image src={ocorrencia.picturePath} alt="Foto da ocorrência" fluid rounded />
                                </div>
                            )}

                            <ListGroup variant="flush" className="mb-3">
                                <ListGroup.Item>
                                    <strong>Localização:</strong> Latitude: {ocorrencia.latitude}, Longitude: {ocorrencia.longitude}
                                    {/* Você pode adicionar um link para o Google Maps aqui */}
                                    {/* <a href={`https://www.google.com/maps?q=${ocorrencia.latitude},${ocorrencia.longitude}`} target="_blank" rel="noopener noreferrer" className="ms-2">Ver no Mapa</a> */}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Reportado em:</strong> {new Date(ocorrencia.createdAt).toLocaleString()}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Última Atualização:</strong> {new Date(ocorrencia.updatedAt).toLocaleString()}
                                </ListGroup.Item>
                            </ListGroup>

                            {ocorrencia.adminNotes && (
                                <Card.Footer className="bg-light mt-3">
                                    <strong>Notas da Prefeitura:</strong> {ocorrencia.adminNotes}
                                </Card.Footer>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AcompanhamentoOcorrencia;