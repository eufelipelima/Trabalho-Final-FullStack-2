const DataBase = require("../DataBase");
const vagaModel = require("./VagaModel");
const candidatoModel = require("./CandidatoModel");

const database = new DataBase();

class InscricaoModel {
  // Declaração das variáveis privadas
  #data;
  #horario;
  #candidato;
  #vaga;

  constructor(data, horario, candidato, vaga) {
    this.#data = data;
    this.#horario = horario;
    this.#candidato = candidato;
    this.#vaga = vaga;
  }

  // Getters e Setters para as variáveis privadas
  get data() {
    return this.#data;
  }

  set data(novaData) {
    this.#data = novaData;
  }

  get horario() {
    return this.#horario;
  }

  set horario(novoHorario) {
    this.#horario = novoHorario;
  }

  get candidato() {
    return this.#candidato;
  }

  set candidato(novoCandidato) {
    if (novoCandidato instanceof candidatoModel) {
      this.#candidato = novoCandidato;
    }
  }

  get vaga() {
    return this.#vaga;
  }

  set vaga(novaVaga) {
    if (novaVaga instanceof vagaModel) {
      this.#vaga = novaVaga;
    }
  }

  // Função toJSON para converter a instância em um formato JSON legível
  toJSON() {
    return {
      data: this.#data,
      horario: this.#horario,
      candidato: this.#candidato ? this.#candidato.toJSON() : null,
      vaga: this.#vaga ? this.#vaga.toJSON() : null,
    };
  }

  async obterTodos() {
    try {
      const sql = `
        SELECT cv.data_inscricao, cv.horario, 
               c.cpf, c.nome AS candidato_nome, c.endereco, c.telefone, 
               v.codigo AS vaga_codigo, v.cargo, v.salario, v.cidade, v.quantidade
        FROM candidato_vaga cv
        INNER JOIN candidato c ON cv.pk_cand_cpf = c.cpf
        INNER JOIN vaga v ON cv.pk_vaga_codigo = v.codigo
        ORDER BY cv.data_inscricao, cv.horario;
      `;

      const registros = await database.ExecutaComando(sql);
      
      // Verifique se registros é um array
      if (!Array.isArray(registros)) {
        throw new Error("O resultado da consulta não é um array.");
      }

      const listaInscricoes = [];

      for (const registro of registros) {
        const candidato = new candidatoModel(
          registro.cpf,
          registro.candidato_nome,
          registro.endereco,
          registro.telefone
        );

        const vaga = new vagaModel(
          registro.vaga_codigo,
          registro.cargo,
          registro.salario,
          registro.cidade,
          registro.quantidade
        );

        const inscricao = new InscricaoModel(
          registro.data_inscricao,
          registro.horario,
          candidato,
          vaga
        );

        listaInscricoes.push(inscricao);
      }

      return listaInscricoes.map((inscricao) => inscricao.toJSON());
    } catch (error) {
      console.error("Erro ao obter inscrições:", error);
      throw error;
    }
  }
  
  async verificarInscricaoExistente(cpfCandidato, codigoVaga) {
    const sql = `
        SELECT COUNT(*) AS total
        FROM candidato_vaga
        WHERE pk_cand_cpf = ? AND pk_vaga_codigo = ?
    `;

    const valores = [cpfCandidato, codigoVaga];

    try {
        const resultado = await database.ExecutaComando(sql, valores);
        return resultado[0].total > 0; // Retorna verdadeiro se já houver uma inscrição
    } catch (error) {
        console.error("Erro ao verificar inscrição existente:", error);
        throw error;
    }
}

  async adicionar(dadosInscricao) {

    const inscricaoExistente = await this.verificarInscricaoExistente(dadosInscricao.candidato, dadosInscricao.vaga);
    
    if (inscricaoExistente) {
        throw new Error("O candidato já está inscrito para esta vaga.");
    }
    // Monta a query SQL com parâmetros nomeados
    const sql = `
        INSERT INTO candidato_vaga (data_inscricao, horario, pk_cand_cpf, pk_vaga_codigo)
        VALUES (?, ?, ?, ?)
    `;

    // Extrai os valores do objeto dadosInscricao
    const valores = [
        dadosInscricao.data,
        dadosInscricao.horario,
        dadosInscricao.candidato,
        dadosInscricao.vaga,
    ];

    try {
        // Executa a query com os valores
        await database.ExecutaComandoNonQuery(sql, valores);
    } catch (error) {
        console.error("Erro ao executar a query de inserção:", error);
        throw error;
    }
}


}

module.exports = InscricaoModel;
