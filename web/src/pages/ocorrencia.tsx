import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function RegistroOcorrencias() {
    // Aqui você implementaria a lógica para:
    // - Gerenciar estados dos campos (foto, descrição, etc.)
    // - Capturar localização via GPS (usando Geolocation API do navegador)
    // - Enviar os dados para a API
    // Para este exemplo, é apenas uma tela estática.

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert('Funcionalidade de registro de ocorrência a ser implementada!');
        // Lógica real de envio para o backend aqui
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4">Registrar Nova Ocorrência</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="tipoProblema">
                                    <Form.Label>Tipo de Problema</Form.Label>
                                    <Form.Control as="select" defaultValue="">
                                        <option value="" disabled>Selecione o tipo</option>
                                        <option>Buraco</option>
                                        <option>Calçada Danificada</option>
                                        <option>Iluminação Precária</option>
                                        <option>Sinalização Deficiente</option>
                                        <option>Outro</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="descricaoOcorrencia">
                                    <Form.Label>Descrição Detalhada</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Descreva o problema em detalhes..."
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="fotoOcorrencia">
                                    <Form.Label>Adicionar Foto</Form.Label>
                                    <Form.Control type="file" accept="image/*" />
                                    <Form.Text className="text-muted">
                                        Opcional: Uma foto ajuda a identificar melhor o problema.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="localizacao">
                                    <Form.Label>Localização (GPS Automático)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Localização capturada automaticamente..."
                                        readOnly
                                        // Aqui você colocaria o valor do GPS
                                        value="Latitude: -23.XXXX, Longitude: -47.XXXX"
                                    />
                                    <Form.Text className="text-muted">
                                        Sua localização será capturada automaticamente via GPS ao submeter.
                                    </Form.Text>
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100">
                                    Registrar Ocorrência
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegistroOcorrencias;