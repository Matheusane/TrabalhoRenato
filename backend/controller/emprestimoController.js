const Emprestimo = require("../model/entidades/emprestimo");

const emprestimo = new Emprestimo

class EmprestimoController{


    async getAll(req,res){
        try{ 
            const result = await emprestimo.getAll()
            return res.status(200).json(result)
        }catch (error){
            console.log('Erro ao buscar emprestimo:'+error)
            res.status(500).json({error:'Erro ao buscar emprestimo!'})
        }
        
        

    }

    async getById(req,res){
        const ID = req.params.ID
        try{ 
            const result = await emprestimo.getById(ID)
            if(result){
                return res.status(200).json(result)
            }else{
                res.status(404).json({error:'Emprestimo não encontrado!'})
            } 
        }catch (error){
            console.log('Erro ao buscar emprestimo:'+error)
            res.status(500).json({error:'Erro ao buscar emprestimo!'})
        }
        

    }

    async delete(req,res){
        const ID = req.params.ID
        try{
            await emprestimo.delete(ID)
            res.status(200).json({messege:'Emprestimo deletado com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar o emprestimo', error)
            res.status(500).json({error:'Erro ao deletar o emprestimo'})
        }
    }


    async create(req,res){
        const emprestimoData = req.body;
        try{
            await emprestimo.create(emprestimoData);
            res.status(201).json({messege:'Emprestimo regristrado com sucesso!'})

        }catch{
            console.log('Erro ao inserir o emprestimo', error)
            res.status(500).json({error:'Erro ao inserir o emprestimo'})
        }
    }

    async update(req,res){
        const emprestimoData = req.body;
        const ID = req.params.ID
        try{
            await emprestimo.update(ID,emprestimoData);
            res.status(201).json({messege:'Emprestimo atualizado com sucesso!'})

        }catch{
            console.log('Erro ao atualizar o emprestimo', error)
            res.status(500).json({error:'Erro ao atualizar o emprestimo'})
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await emprestimo.filtrar(filtro);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao filtrar emprestimoes:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
    
}


module.exports = EmprestimoController;