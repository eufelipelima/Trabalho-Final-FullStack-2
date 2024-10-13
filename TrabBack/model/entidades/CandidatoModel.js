const DataBase = require("../DataBase");

const database = new DataBase();

class CandidatoModel {
  constructor(cpf, nome, endereco, telefone) {
    this.cpf = cpf;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
  }

  // Função toJSON para converter a instância em um formato JSON legível
  toJSON() {
    return {
      cpf: this.cpf,
      nome: this.nome,
      endereco: this.endereco,
      telefone: this.telefone,
    };
  }

  async obterTodos() {
    const listaCandidatos = await database.ExecutaComando(
      "select * from candidato order by nome;"
    );
    return listaCandidatos.map(
      (candidato) =>
        new CandidatoModel(
          candidato.cpf,
          candidato.nome,
          candidato.endereco,
          candidato.telefone
        ).toJSON()
    );
  }
}

module.exports = CandidatoModel;
