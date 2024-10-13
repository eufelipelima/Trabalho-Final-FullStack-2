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
import InscricaoService from "../../services/InscricaoService";

const inscricaoService = new InscricaoService();

function Inscricao() {
  const [listaInscricao, setListaInscricao] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const handleBuscaChange = (event) => {
    setTermoBusca(event.target.value);
  };

  

  const listarInscricao = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await inscricaoService.filtrar(termoBusca);
      setListaInscricao(dados);
    } else {
      dados = await inscricaoService.obterTodos();
      setListaInscricao(dados);
    }
  };

  const handleFiltrar = async () => {
    await listarInscricao(termoBusca);
  };

  useEffect(() => {
    listarInscricao();
  }, []);

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await inscricaoService.delete(id);
      await listarInscricao();
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
                <Button as={Link} to="/inscricao/novo" variant="primary">
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
                  <th>Data da Inscrição</th>
                  <th>Horario</th>
                  <th>Candidato</th>
                  <th>Vaga</th>
                </tr>
              </thead>
              <tbody>
                {listaInscricao.length <= 0
                  ? "Nenhum candidato para listar"
                  : listaInscricao.map((inscricao) => (
                      <tr>
                        <td>{new Date(inscricao.data).toLocaleDateString("pt-BR")}</td>
                        <td>{inscricao.horario}</td>
                        <td>{inscricao.candidato.nome}</td>
                        <td>{inscricao.vaga.cargo}</td>
                        <td>
                          {/* <Link
                            to={`/candidatos/${vaga.codigo}`}
                            className="btn btn-primary m-1"
                          >
                            {" "}
                            <FaEdit></FaEdit>Editar
                          </Link> */}
                          {/* <Button
                            className="btn btn-danger"
                            onClick={() => handleExcluir(vaga.codigo)}
                          >
                            {" "}
                            <FaTrashAlt></FaTrashAlt>Excluir
                          </Button> */}
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

export default Inscricao;
