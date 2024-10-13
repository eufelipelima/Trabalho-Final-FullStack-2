const InscricaoModel = require("../model/entidades/InscricaoModel");

const inscricaoModel = new InscricaoModel();

class InscricaoController {
    async obterTodos(req,res) {
        const inscricao = await inscricaoModel.obterTodos();
        return res.status(200).json(  inscricao );
    }

    async adicionar(req, res) {
        try {
            // Extração segura das variáveis do corpo da requisição
            const { data_inscricao, horario, candidato, vaga } = req.body;
    
    
            // Criação do objeto InscricaoModel com os dados extraídos
            const inscricao = new InscricaoModel(
                data_inscricao,
                horario,
                candidato,
                vaga
            );
    
            // Tentativa de adicionar a inscrição ao banco de dados
            await inscricaoModel.adicionar(inscricao);
    
            // Resposta de sucesso
            return res.status(200).json({ message: "Inscrição adicionada com sucesso!" });
    
        } catch (error) {
            // Tratamento de erro com log e resposta adequada
            console.error("Erro ao cadastrar inscrição:", error);
            return res.status(500).json({ message: "Erro ao cadastrar inscrição", error: error.message });

        }
    }

    // async obterPorId(req,res){
    //     const id =req.params.id;
    //     const cidadao = await cidadaoModel.obterPorId(id);
    //     return res.status(200).json(cidadao); 
    //   }

//     async atualizar(req,res){
//         const id =req.params.id;
//         const { nome, dataNasc, rg, cpf, cep, endereco, numero, bairro, cidade, estado, email, telefone }=req.body;
//         const cidadao = new CidadaoModel(id,nome, dataNasc, rg, cpf, cep, endereco, numero, bairro, cidade, estado, email, telefone)
    
//            try {
//              await cidadao.atualizar(id,cidadao);
//             return res.status(201).json({message:'Atualização com successo'})
//            } catch (error) {
//             console.log('Erro ao cadastrar cidadao:'+error)
//             res.status(500).json({error:'Erro ao atualizar cidadao'})
//            }  
    
// }
    // async excluir(req,res){
    //     const id = req.params.id;
    //     try {
    //     await cidadaoModel.delete(id);
    //     res.status(200).json({message:'Item removido'})
    //     } catch (error) {
    //     console.log('Erro ao tentar excluir cidadao',error)
    //     res.status(500).json({error:'Erro ao tentar excluir cidadao'})
        
    //     }       
    // }
  
    // async filtrar(req,res){
    //     const termoBusca =req.params.termoBusca;
    //     const cidadaos = await cidadaoModel.filtrar(termoBusca);
    //     return res.status(200).json(cidadaos); 
    // }
    
}

module.exports = InscricaoController;