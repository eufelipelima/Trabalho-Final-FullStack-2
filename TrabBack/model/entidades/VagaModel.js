const DataBase = require("../DataBase");

const database = new DataBase();

class VagaModel {
  constructor(codigo, cargo, salario, cidade, quantidade) {
    this.codigo = codigo;
    this.cargo = cargo;
    this.salario = salario;
    this.cidade = cidade;
    this.quantidade = quantidade;
  }

  // Função toJSON para converter a instância em um formato JSON legível
  toJSON() {
    return {
      codigo: this.codigo,
      cargo: this.cargo,
      salario: this.salario,
      cidade: this.cidade,
      quantidade: this.quantidade,
    };
  }

  async obterTodos() {
    const listaVagas = await database.ExecutaComando(
      "select * from vaga order by codigo;"
    );
    return listaVagas.map(
      (vaga) =>
        new VagaModel(
          vaga.codigo,
          vaga.cargo,
          vaga.salario,
          vaga.cidade,
          vaga.quantidade
        ).toJSON()
    );
  }
}

module.exports = VagaModel;
