const CandidatoModel = require("../model/entidades/CandidatoModel");

const candidatoModel = new CandidatoModel();

class CandidatoController {
    async obterTodos(req,res) {
        const candidatos = await candidatoModel.obterTodos();
        return res.status(200).json(  candidatos );
    }

    // async obterPorId(req,res){
    //     const id =req.params.id;
    //     const cidadao = await cidadaoModel.obterPorId(id);
    //     return res.status(200).json(cidadao); 
    //   }

    // async adicionar(req, res){
    //     const {nome, dataNasc, rg, cpf, cep, endereco, numero, bairro, cidade, estado, email, telefone} = req.body;
    //     const cidadao = new CidadaoModel(0, nome, dataNasc, rg, cpf, cep, endereco, numero, bairro, cidade, estado, email, telefone);

    //     try {
    //         await cidadaoModel.adicionar(cidadao);
    //         return res.status(200).json({message: 'Cidadao adicionado com sucesso!'});
    //     } catch (error) {
    //         console.log('Erro ao cadastrar cidadao:'+error);
    //         res.status(500).json('Erro ao cadastrar cidadao');
    //     }
    // console.log(cidadao)   
    // return res.status(201).json({message: 'Cidadao adicionado com sucesso!'});

    // }
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

module.exports = CandidatoController;