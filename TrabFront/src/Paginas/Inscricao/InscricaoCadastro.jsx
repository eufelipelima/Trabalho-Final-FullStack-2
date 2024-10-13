import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Button,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft, FaCheckCircle, FaRegSave } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import InscricaoService from "../../services/InscricaoService";
import CaixaSelecao from '../../Componentes/busca/CaixaSelecao';
import BarraBusca from "../../Componentes/busca/BarraBusca";
import CandidatoService from "../../services/CandidatoService";

const inscricaoService = new InscricaoService();
const candidatoService = new CandidatoService();

function SolicitacaoCadastro() {
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [sucessoMensagem, setSucessoMensagem] = useState("");
  const [erroMensagem, setErroMensagem] = useState(""); // Novo estado para mensagens de erro
  const { codigo } = useParams();
  const [candidatos, setCandidatos] = useState([]);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
  const [vagaSelecionada, setVagaSelecionada] = useState({
    codigo: 0,
    descricao: "Selecione uma vaga",
  });

  useEffect(() => {
    const fetchCandidatos = async () => {
      const response = await candidatoService.obterTodos();
      if (response) {
        setCandidatos(response); // Armazena os dados diretamente no estado
      }
    };

    fetchCandidatos();
  }, []);

  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  const handleHorarioChange = (e) => {
    setHorario(e.target.value);
  };

  async function handleSalvar(e) {
    e.preventDefault(); // Evita que o formulário seja enviado antes da execução da função
    setSucessoMensagem(""); // Limpa mensagem de sucesso antes de novas tentativas
    setErroMensagem(""); // Limpa mensagem de erro antes de novas tentativas

    if (!candidatoSelecionado || !vagaSelecionada) {
      setErroMensagem("Selecione um candidato e uma vaga."); // Define mensagem de erro
      return;
    }

    const inscricao = {
      data_inscricao: data,
      horario: horario,
      candidato: candidatoSelecionado.cpf,
      vaga: vagaSelecionada.codigo,
    };

    try {
      // Cadastrar nova solicitação
      await inscricaoService.adicionar(inscricao);
      setSucessoMensagem("Inscrição cadastrada com sucesso!"); // Define mensagem de sucesso
    } catch (error) {
      setErroMensagem("Erro ao cadastrar inscrição: "); // Define mensagem de erro
    }
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <Row className="align-items-center">
            <Col className="text-center">
              <h2>Cadastro de Inscrições</h2>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSalvar}>
            <Row>
              <Form.Group as={Col} md="6" controlId="data">
                <Form.Label>Data da Inscrição:</Form.Label>
                <Form.Control
                  required
                  type="date"
                  value={data}
                  onChange={handleDataChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="horario">
                <Form.Label>Horário</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={horario}
                  onChange={handleHorarioChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Col md={8}>
                <Form.Label>Vagas:</Form.Label>
                <CaixaSelecao
                  enderecoFonteDados={"http://localhost:4000/vagas"}
                  campoChave={"codigo"}
                  campoExibicao={"cargo"}
                  funcaoSelecao={setVagaSelecionada}
                />
              </Col>
            </Row>
            <Row>
              <Form.Group as={Col} md="12" controlId="valorTotalTributos">
                <Form.Label>Candidato:</Form.Label>
                <BarraBusca
                  campoBusca={"nome"}
                  campoChave={"cpf"}
                  dados={candidatos}
                  funcaoSelecao={setCandidatoSelecionado}
                  placeHolder={"Selecione um candidato"}
                  valor={""}
                />
              </Form.Group>
            </Row>
            {sucessoMensagem && (
              <Alert variant="success">
                <b>
                  <FaCheckCircle />
                </b>{" "}
                {sucessoMensagem}
              </Alert>
            )}
            {erroMensagem && (
              <Alert variant="danger">
                <b>
                  <FaCheckCircle />
                </b>{" "}
                {erroMensagem}
              </Alert>
            )}
            <Button type="submit" variant="success m-1">
              <FaRegSave /> Salvar
            </Button>
            <Button variant="secondary" as={Link} to="/solicitacao">
              <FaArrowLeft /> Voltar
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          <small className="text-muted">GabiNet © 2024</small>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default SolicitacaoCadastro;
