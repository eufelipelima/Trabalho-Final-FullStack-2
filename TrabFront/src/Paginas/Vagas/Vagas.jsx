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
import VagaService from "../../services/VagaService";

const vagaService = new VagaService();

function Vagas() {
  const [listaVagas, setListaVagas] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  

  const listarVagas = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await vagaService.filtrar(termoBusca);
      setListaVagas(dados);
    } else {
      dados = await vagaService.obterTodos();
      setListaVagas(dados);
    }
  };

  const handleFiltrar = async () => {
    await listarVagas(termoBusca);
  };

  useEffect(() => {
    listarVagas();
  }, []);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await vagaService.delete(id);
      await listarVagas();
    }
  };

  return (
    <>
      <h2 align="center">
        <FaListAlt /> Cadastro de Vagas
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
                  <th>Codigo</th>
                  <th>Cargo</th>
                  <th>Salario</th>
                  <th>Cidade</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {listaVagas.length <= 0
                  ? "Nenhum candidato para listar"
                  : listaVagas.map((vaga) => (
                      <tr>
                        <td>{vaga.codigo}</td>
                        <td>{vaga.cargo}</td>
                        <td>{vaga.salario}</td>
                        <td>{vaga.cidade}</td>
                        <td>{vaga.quantidade}</td>
                        <td>
                          <Link
                            to={`/candidatos/${vaga.codigo}`}
                            className="btn btn-primary m-1"
                          >
                            {" "}
                            <FaEdit></FaEdit>Editar
                          </Link>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleExcluir(vaga.codigo)}
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

export default Vagas;
