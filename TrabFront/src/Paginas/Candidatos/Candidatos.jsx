import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import {
  FaListAlt,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CandidatoService from "../../services/CandidatoService";

const candidatoService = new CandidatoService();

function Candidatos() {
  const [listaCandidatos, setListaCandidatos] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  

  const listarCandidatos = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await candidatoService.filtrar(termoBusca);
      setListaCandidatos(dados);
    } else {
      dados = await candidatoService.obterTodos();
      setListaCandidatos(dados);
    }
  };

  const handleFiltrar = async () => {
    await listarCandidatos(termoBusca);
  };

  useEffect(() => {
    listarCandidatos();
  }, []);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await candidatoService.delete(id);
      await listarCandidatos();
    }
  };

  return (
    <>
      <h2 align="center">
        <FaListAlt /> Cadastro de Candidatos
      </h2>
      <Container className="mt-2">
        <Card>
          <Card.Body>
            <Row>
              <Col lg="2">
                <Button as={Link} to="/cidadaos/novo" variant="primary">
                  <FaPlus /> Adicionar
                </Button>
              </Col>

              <Col lg="6">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={handleBuscaChange}
                    placeholder="Pesquisar..."
                  />
                </Form.Group>
              </Col>

              <Col lg="2">
                <Button onClick={handleFiltrar} variant="secondary">
                  <FaSearch /> Pesquisar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-2">
        <Card>
          <Card.Header as="h5">Candidatos Cadastrados</Card.Header>
          <Card.Body>
            <Table striped bordered hover onChange={handleFiltrar}>
              <thead>
                <tr>
                  <th>CPF</th>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>telefone</th>
                </tr>
              </thead>
              <tbody>
                {listaCandidatos.length <= 0
                  ? "Nenhum candidato para listar"
                  : listaCandidatos.map((candidato) => (
                      <tr>
                        <td>{candidato.cpf}</td>
                        <td>{candidato.nome}</td>
                        <td>{candidato.endereco}</td>
                        <td>{candidato.telefone}</td>
                        <td>
                          <Link
                            to={`/candidatos/${candidato.id}`}
                            className="btn btn-primary m-1"
                          >
                            {" "}
                            <FaEdit></FaEdit>Editar
                          </Link>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleExcluir(candidato.id)}
                          >
                            {" "}
                            <FaTrashAlt></FaTrashAlt>Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Candidatos;
